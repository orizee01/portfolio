import express from "express";
import cors from "cors";
import { fileURLToPath } from "node:url";
import contactRouter from "./routes/contact.js";
import uploadRouter from "./routes/upload.js";
import profileRouter from "./routes/profile.js";
import messagesRouter from "./routes/messages.js";
import authRouter from "./routes/auth.js";
import projectImagesRouter from "./routes/projectImages.js";
import { storageDriver, UPLOAD_DIR } from "./lib/storage.js";

const app = express();

// Needed so req.ip is the real client IP behind Vercel / a proxy (used for rate limiting).
app.set("trust proxy", 1);
app.disable("x-powered-by");

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({ origin: allowedOrigins, methods: ["GET", "POST", "DELETE", "OPTIONS"] }));
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRouter);
app.use("/api/contact", contactRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/profile-image", profileRouter);
app.use("/api/project-images", projectImagesRouter);
app.use("/api/messages", messagesRouter);

// Locally stored uploads (dev only; production uses Vercel Blob URLs).
if (storageDriver() === "local") {
  app.use("/uploads", express.static(UPLOAD_DIR, { index: false, setHeaders: (res) => res.set("X-Content-Type-Options", "nosniff") }));
}

app.use((_req, res) => res.status(404).json({ error: "Not found" }));

// Malformed JSON and anything else unexpected.
app.use((err, _req, res, _next) => {
  if (err.type === "entity.parse.failed") return res.status(400).json({ error: "Invalid JSON" });
  if (err.type === "entity.too.large") return res.status(413).json({ error: "Payload too large" });
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

// Listen only when run directly; Vercel imports the default export instead.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Backend listening on http://localhost:${port}`));
}

export default app;
