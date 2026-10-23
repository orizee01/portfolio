import { Router } from "express";
import { adminConfigured, authorized } from "../lib/auth.js";
import { latestImageUrl, removeImages, storageDriver } from "../lib/storage.js";
import { isValidProjectId, projectFolder } from "../lib/projects.js";

const MAX_IDS = 20;
const router = Router();
const baseUrlOf = (req) => `${req.protocol}://${req.get("host")}`;

// Public: GET /api/project-images?ids=a,b,c → { images: { a: url, c: url } } (projects without
// an uploaded picture are left out, so the frontend falls back to its default image).
router.get("/", async (req, res) => {
  const ids = String(req.query.ids || "")
    .split(",")
    .filter(isValidProjectId)
    .slice(0, MAX_IDS);
  if (!storageDriver() || ids.length === 0) return res.json({ images: {} });

  try {
    const urls = await Promise.all(ids.map((id) => latestImageUrl(projectFolder(id), baseUrlOf(req))));
    const images = Object.fromEntries(ids.map((id, i) => [id, urls[i]]).filter(([, url]) => url));
    res.set("Cache-Control", "public, max-age=30");
    res.json({ images });
  } catch (error) {
    console.error("Project image lookup failed:", error);
    res.status(500).json({ error: "Could not load project images." });
  }
});

// Admin only: back to the default picture.
router.delete("/:id", async (req, res) => {
  if (!adminConfigured() || !storageDriver()) return res.status(503).json({ error: "Upload service is not configured." });
  if (!authorized(req)) return res.status(401).json({ error: "Unauthorized" });
  if (!isValidProjectId(req.params.id)) return res.status(400).json({ error: "Invalid project id." });
  try {
    await removeImages(projectFolder(req.params.id), baseUrlOf(req));
    res.json({ ok: true });
  } catch (error) {
    console.error("Project image delete failed:", error);
    res.status(500).json({ error: "Could not remove the picture." });
  }
});

export default router;
