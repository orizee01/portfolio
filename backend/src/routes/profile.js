import { Router } from "express";
import { adminConfigured, authorized } from "../lib/auth.js";
import { latestImageUrl, removeImages, storageDriver } from "../lib/storage.js";

const router = Router();
const baseUrlOf = (req) => `${req.protocol}://${req.get("host")}`;

// Public: the current profile photo URL (or null).
router.get("/", async (req, res) => {
  if (!storageDriver()) return res.json({ url: null });
  try {
    const url = await latestImageUrl("profile", baseUrlOf(req));
    res.set("Cache-Control", "public, max-age=30");
    res.json({ url });
  } catch (error) {
    console.error("Profile lookup failed:", error);
    res.status(500).json({ error: "Could not load the profile image." });
  }
});

// Owner only: remove the profile photo.
router.delete("/", async (req, res) => {
  if (!adminConfigured() || !storageDriver()) return res.status(503).json({ error: "Upload service is not configured." });
  if (!authorized(req)) return res.status(401).json({ error: "Unauthorized" });
  try {
    await removeImages("profile", baseUrlOf(req));
    res.json({ ok: true });
  } catch (error) {
    console.error("Profile delete failed:", error);
    res.status(500).json({ error: "Could not remove the image." });
  }
});

export default router;
