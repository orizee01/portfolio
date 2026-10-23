import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { mkdir, writeFile, readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// UPLOAD_DIR can be overridden (tests point it at a temporary folder).
export const UPLOAD_DIR = process.env.UPLOAD_DIR || path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../uploads");

// S3 when UPLOAD_BUCKET is set (AWS), otherwise the local ./uploads folder (development, Docker).
export function storageDriver() {
  if (process.env.UPLOAD_BUCKET) return "s3";
  if (process.env.VERCEL) return null;
  return "local";
}

let s3Client;
const s3 = () => (s3Client ??= new S3Client({}));
const s3Url = (key) => `https://${process.env.UPLOAD_BUCKET}.s3.${process.env.AWS_REGION || "us-east-1"}.amazonaws.com/${key}`;

export async function saveImage(folder, filename, buffer, contentType, baseUrl) {
  if (storageDriver() === "s3") {
    const key = `${folder}/${filename}`;
    await s3().send(
      new PutObjectCommand({
        Bucket: process.env.UPLOAD_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        CacheControl: "public, max-age=31536000, immutable",
      })
    );
    return s3Url(key);
  }

  await mkdir(path.join(UPLOAD_DIR, folder), { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, folder, filename), buffer);
  return `${baseUrl}/uploads/${folder}/${filename}`;
}

// Lists a folder's images, newest first: [{ url, ref }] where ref is what removeImages needs.
async function listImages(folder, baseUrl) {
  if (storageDriver() === "s3") {
    const { Contents = [] } = await s3().send(
      new ListObjectsV2Command({ Bucket: process.env.UPLOAD_BUCKET, Prefix: `${folder}/` })
    );
    return Contents.sort((a, b) => b.LastModified - a.LastModified).map((o) => ({ url: s3Url(o.Key), ref: o.Key }));
  }

  const dir = path.join(UPLOAD_DIR, folder);
  let names;
  try {
    names = await readdir(dir);
  } catch {
    return [];
  }
  const files = await Promise.all(
    names.map(async (name) => ({ name, mtime: (await stat(path.join(dir, name))).mtimeMs }))
  );
  return files
    .sort((a, b) => b.mtime - a.mtime)
    .map((f) => ({ url: `${baseUrl}/uploads/${folder}/${f.name}`, ref: path.join(dir, f.name) }));
}

export async function latestImageUrl(folder, baseUrl) {
  return (await listImages(folder, baseUrl))[0]?.url ?? null;
}

// Deletes every image in a folder except the one whose url is `keepUrl`.
export async function removeImages(folder, baseUrl, keepUrl = null) {
  const doomed = (await listImages(folder, baseUrl)).filter((img) => img.url !== keepUrl);
  if (storageDriver() === "s3") {
    if (doomed.length) {
      await s3().send(
        new DeleteObjectsCommand({
          Bucket: process.env.UPLOAD_BUCKET,
          Delete: { Objects: doomed.map((img) => ({ Key: img.ref })) },
        })
      );
    }
    return;
  }
  await Promise.all(doomed.map((img) => unlink(img.ref)));
}
