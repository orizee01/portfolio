import { Router } from "express";
import multer from "multer";
import { randomUUID } from "node:crypto";
import { createRateLimiter } from "../lib/rateLimit.js";
import { detectImageType } from "../lib/imageType.js";
import { adminConfigured, authorized } from "../lib/auth.js";
import { saveImage, removeImages, storageDriver } from "../lib/storage.js";

const MAX_BYTES = 5 * 1024 * 1024;
const isLimited = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 20 });

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_BYTES, files: 1 },
}).single("image");

const router = Router();

router.post("/", (req, res) => {
  if (!adminConfigured() || !storageDriver()) {
    console.error("Upload service misconfigured: set the ADMIN_* settings and a storage backend");
    return res.status(503).json({ error: "Upload service is not configured." });
  }
  if (!authorized(req)) return res.status(401).json({ error: "Unauthorized" });
  if (isLimited(req.ip)) return res.status(429).json({ error: "Too many uploads. Please try again later." });

  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      const status = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;
      const error = err.code === "LIMIT_FILE_SIZE" ? "Image must be 5MB or smaller." : "Invalid upload.";
      return res.status(status).json({ error });
    }
    if (err) {
      console.error(err);
      return res.status(400).json({ error: "Invalid upload." });
    }
    if (!req.file) return res.status(400).json({ error: 'Send the file as multipart field "image".' });

    const type = detectImageType(req.file.buffer);
    if (!type) return res.status(415).json({ error: "Only JPEG, PNG, GIF or WebP images are allowed." });

    try {
      const filename = `${randomUUID()}.${type.ext}`;
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      // ?folder=profile marks the site's profile photo; anything else is a general upload.
      const folder = req.query.folder === "profile" ? "profile" : "images";
      const url = await saveImage(folder, filename, req.file.buffer, type.mime, baseUrl);
      if (folder === "profile") {
        // Only the newest profile photo is kept; cleanup failure must not fail the upload.
        await removeImages("profile", baseUrl, url).catch((e) => console.error("Profile cleanup failed:", e));
      }
      res.status(201).json({ ok: true, url, type: type.mime, size: req.file.size });
    } catch (error) {
      console.error("Upload failed:", error);
      res.status(500).json({ error: "Could not store the image." });
    }
  });
});

export default router;
