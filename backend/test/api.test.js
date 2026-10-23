// End-to-end tests for the API: a real server on a random port, local storage in temp folders.
// Run with `npm test`. Email is disabled (no Resend key), so nothing is sent.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { hashPassword } from "../src/lib/password.js";

const PASSWORD = "test-password-123";
const PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
  "base64"
);

let server;
let base;
let tmp;
let token;

before(async () => {
  tmp = await mkdtemp(path.join(tmpdir(), "portfolio-api-test-"));
  // The app reads its settings at import time, so configure the environment first.
  Object.assign(process.env, {
    UPLOAD_DIR: path.join(tmp, "uploads"),
    MESSAGES_DIR: path.join(tmp, "messages"),
    ADMIN_USERNAME: "admin",
    ADMIN_PASSWORD_HASH: await hashPassword(PASSWORD),
    SESSION_SECRET: randomBytes(32).toString("hex"),
    ALLOWED_ORIGINS: "http://allowed.test",
    RESEND_API_KEY: "",
    RESEND_TO_EMAIL: "",
  });
  for (const key of ["UPLOAD_BUCKET", "BLOB_READ_WRITE_TOKEN", "VERCEL"]) delete process.env[key];

  const { default: app } = await import("../src/index.js");
  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  base = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await rm(tmp, { recursive: true, force: true });
});

const json = (body) => ({ method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
const auth = (extra = {}) => ({ ...extra, headers: { ...extra.headers, Authorization: `Bearer ${token}` } });
function imageForm(bytes = PNG) {
  const form = new FormData();
  form.append("image", new Blob([bytes], { type: "image/png" }), "test.png");
  return form;
}

test("health check", async () => {
  const res = await fetch(`${base}/api/health`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
});

test("CORS allows only configured origins", async () => {
  const preflight = (origin) =>
    fetch(`${base}/api/contact`, {
      method: "OPTIONS",
      headers: { Origin: origin, "Access-Control-Request-Method": "POST" },
    });
  assert.equal((await preflight("http://allowed.test")).headers.get("access-control-allow-origin"), "http://allowed.test");
  assert.equal((await preflight("http://evil.test")).headers.get("access-control-allow-origin"), null);
});

test("admin login rejects wrong credentials", async () => {
  const wrongPassword = await fetch(`${base}/api/auth/login`, json({ username: "admin", password: "nope-nope-nope" }));
  assert.equal(wrongPassword.status, 401);
  const wrongUser = await fetch(`${base}/api/auth/login`, json({ username: "root", password: PASSWORD }));
  assert.equal(wrongUser.status, 401);
});

test("admin login works, username is not case-sensitive", async () => {
  const res = await fetch(`${base}/api/auth/login`, json({ username: " Admin ", password: PASSWORD }));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(body.token);
  token = body.token;

  const me = await fetch(`${base}/api/auth/me`, auth());
  assert.deepEqual(await me.json(), { admin: true, username: "admin" });
});

test("sessions cannot be forged", async () => {
  const [payload, signature] = token.split(".");
  const data = JSON.parse(Buffer.from(payload, "base64url").toString());
  data.exp += 10 ** 12;
  const forged = `${Buffer.from(JSON.stringify(data)).toString("base64url")}.${signature}`;
  const res = await fetch(`${base}/api/auth/me`, { headers: { Authorization: `Bearer ${forged}` } });
  assert.equal(res.status, 401);
});

test("uploads require an admin session", async () => {
  const res = await fetch(`${base}/api/upload`, { method: "POST", body: imageForm() });
  assert.equal(res.status, 401);
});

test("uploads reject files that are not images", async () => {
  const res = await fetch(`${base}/api/upload`, auth({ method: "POST", body: imageForm(Buffer.from("not an image")) }));
  assert.equal(res.status, 415);
});

test("profile photo: upload, read, remove", async () => {
  const up = await fetch(`${base}/api/upload?folder=profile`, auth({ method: "POST", body: imageForm() }));
  assert.equal(up.status, 201);
  const { url } = await up.json();

  assert.equal((await (await fetch(`${base}/api/profile-image`)).json()).url, url);
  const image = await fetch(url);
  assert.equal(image.status, 200);
  assert.equal(image.headers.get("content-type"), "image/png");

  assert.equal((await fetch(`${base}/api/profile-image`, { method: "DELETE" })).status, 401);
  assert.equal((await fetch(`${base}/api/profile-image`, auth({ method: "DELETE" }))).status, 200);
  assert.equal((await (await fetch(`${base}/api/profile-image`)).json()).url, null);
});

test("project pictures: only the newest is kept, reset goes back to default", async () => {
  const bad = await fetch(`${base}/api/upload?project=../profile`, auth({ method: "POST", body: imageForm() }));
  assert.equal(bad.status, 400);

  await fetch(`${base}/api/upload?project=demo`, auth({ method: "POST", body: imageForm() }));
  await new Promise((r) => setTimeout(r, 20)); // distinct modification times
  const second = await fetch(`${base}/api/upload?project=demo`, auth({ method: "POST", body: imageForm() }));
  const { url } = await second.json();

  assert.equal((await readdir(path.join(process.env.UPLOAD_DIR, "projects", "demo"))).length, 1);
  const listed = await (await fetch(`${base}/api/project-images?ids=demo,other`)).json();
  assert.deepEqual(listed, { images: { demo: url } });

  assert.equal((await fetch(`${base}/api/project-images/demo`, { method: "DELETE" })).status, 401);
  assert.equal((await fetch(`${base}/api/project-images/demo`, auth({ method: "DELETE" }))).status, 200);
  assert.deepEqual(await (await fetch(`${base}/api/project-images?ids=demo`)).json(), { images: {} });
});

test("contact form validates input and ignores bots", async () => {
  const invalid = await fetch(`${base}/api/contact`, json({ name: "A", email: "not-an-email", message: "hi" }));
  assert.equal(invalid.status, 400);
  const bot = await fetch(`${base}/api/contact`, json({ website: "spam.example" }));
  assert.equal(bot.status, 200);
});

test("contact messages are saved and only the admin can read or delete them", async () => {
  const sent = await fetch(`${base}/api/contact`, json({ name: "Ada", email: "ada@example.com", message: "Hello\nthere" }));
  assert.equal(sent.status, 200);

  assert.equal((await fetch(`${base}/api/messages`)).status, 401);
  const { messages } = await (await fetch(`${base}/api/messages`, auth())).json();
  assert.equal(messages.length, 1);
  assert.equal(messages[0].message, "Hello\nthere");

  const traversal = await fetch(`${base}/api/messages/..%2F..%2Fsecret`, auth({ method: "DELETE" }));
  assert.equal(traversal.status, 400);
  assert.equal((await fetch(`${base}/api/messages/${messages[0].id}`, auth({ method: "DELETE" }))).status, 200);
  assert.deepEqual((await (await fetch(`${base}/api/messages`, auth())).json()).messages, []);
});
