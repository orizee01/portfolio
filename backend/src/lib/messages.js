import { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { mkdir, writeFile, readdir, readFile, unlink } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

// Contact messages are private: S3 under messages/ (not publicly readable, see the bucket policy)
// or, in development, ./data/messages, which is never served over HTTP.
const DATA_DIR = process.env.MESSAGES_DIR || path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../data/messages");
const PREFIX = "messages/";
const MAX_LIST = 200;
const ID_RE = /^\d{13}-[0-9a-f-]{36}$/;

let s3Client;
const s3 = () => (s3Client ??= new S3Client({}));

export function messageDriver() {
  if (process.env.UPLOAD_BUCKET) return "s3";
  if (process.env.VERCEL) return null;
  return "local";
}

export const isValidMessageId = (id) => ID_RE.test(id);

// Ids start with a millisecond timestamp, so sorting ids sorts by date.
export async function saveMessage({ name, email, message }) {
  const id = `${Date.now()}-${randomUUID()}`;
  const record = { id, name, email, message, createdAt: new Date().toISOString() };
  const body = JSON.stringify(record);

  if (messageDriver() === "s3") {
    await s3().send(
      new PutObjectCommand({
        Bucket: process.env.UPLOAD_BUCKET,
        Key: `${PREFIX}${id}.json`,
        Body: body,
        ContentType: "application/json",
      })
    );
  } else {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(path.join(DATA_DIR, `${id}.json`), body);
  }
  return record;
}

export async function listMessages() {
  if (messageDriver() === "s3") {
    const keys = [];
    let ContinuationToken;
    do {
      const page = await s3().send(
        new ListObjectsV2Command({ Bucket: process.env.UPLOAD_BUCKET, Prefix: PREFIX, ContinuationToken })
      );
      for (const o of page.Contents || []) keys.push(o.Key);
      ContinuationToken = page.NextContinuationToken;
    } while (ContinuationToken);

    const newest = keys.sort().reverse().slice(0, MAX_LIST);
    return Promise.all(
      newest.map(async (Key) => {
        const obj = await s3().send(new GetObjectCommand({ Bucket: process.env.UPLOAD_BUCKET, Key }));
        return JSON.parse(await obj.Body.transformToString());
      })
    );
  }

  let names;
  try {
    names = await readdir(DATA_DIR);
  } catch {
    return [];
  }
  const newest = names.filter((n) => n.endsWith(".json")).sort().reverse().slice(0, MAX_LIST);
  return Promise.all(newest.map(async (n) => JSON.parse(await readFile(path.join(DATA_DIR, n), "utf8"))));
}

export async function deleteMessage(id) {
  if (!isValidMessageId(id)) throw new Error("Invalid message id");
  if (messageDriver() === "s3") {
    await s3().send(new DeleteObjectCommand({ Bucket: process.env.UPLOAD_BUCKET, Key: `${PREFIX}${id}.json` }));
  } else {
    await unlink(path.join(DATA_DIR, `${id}.json`)).catch((e) => {
      if (e.code !== "ENOENT") throw e;
    });
  }
}
