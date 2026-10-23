import { Router } from "express";
import { adminConfigured, authorized } from "../lib/auth.js";
import { listMessages, deleteMessage, isValidMessageId, messageDriver } from "../lib/messages.js";

const router = Router();

// Admin only.
router.use((req, res, next) => {
  if (!adminConfigured() || !messageDriver()) {
    return res.status(503).json({ error: "Message inbox is not configured." });
  }
  if (!authorized(req)) return res.status(401).json({ error: "Unauthorized" });
  res.set("Cache-Control", "no-store");
  next();
});

router.get("/", async (_req, res) => {
  try {
    res.json({ messages: await listMessages() });
  } catch (error) {
    console.error("Listing messages failed:", error);
    res.status(500).json({ error: "Could not load messages." });
  }
});

router.delete("/:id", async (req, res) => {
  if (!isValidMessageId(req.params.id)) return res.status(400).json({ error: "Invalid message id." });
  try {
    await deleteMessage(req.params.id);
    res.json({ ok: true });
  } catch (error) {
    console.error("Deleting message failed:", error);
    res.status(500).json({ error: "Could not delete the message." });
  }
});

export default router;
