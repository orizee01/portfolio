import { test } from "node:test";
import assert from "node:assert/strict";
import { contactEmail } from "../src/lib/contactEmail.js";

const receivedAt = new Date("2026-10-24T09:30:00Z");

test("subject names the sender and previews the message on one line", () => {
  const { subject } = contactEmail({ name: "Ada Lovelace", email: "ada@example.com", message: "Hi!\nCan we talk about a backend role?", receivedAt });
  assert.equal(subject, "New portfolio message from Ada Lovelace: “Hi! Can we talk about a backend role?”");
});

test("long messages are shortened in the subject", () => {
  const { subject } = contactEmail({ name: "Ada", email: "ada@example.com", message: "x".repeat(300), receivedAt });
  assert.ok(subject.length < 90, subject);
  assert.ok(subject.endsWith("…”"));
});

test("header injection is impossible: no line breaks or control characters in the subject", () => {
  const { subject } = contactEmail({ name: "Eve\r\nBcc: victim@example.com", email: "eve@example.com", message: "a\r\nb\u0007", receivedAt });
  assert.doesNotMatch(subject, /[\r\n\u0000-\u001f]/);
});

test("HTML from visitors is escaped, never rendered", () => {
  const { html } = contactEmail({
    name: "<img src=x onerror=alert(1)>",
    email: "x@example.com",
    message: "<script>alert('hi')</script>",
    receivedAt,
  });
  assert.doesNotMatch(html, /<script>|<img src=x/);
  assert.match(html, /&lt;script&gt;alert\(&#39;hi&#39;\)&lt;\/script&gt;/);
});

test("reply button and plain-text version", () => {
  const { html, text } = contactEmail({ name: "Ada", email: "ada+jobs@example.com", message: "Hello", receivedAt });
  assert.match(html, /href="mailto:ada%2Bjobs%40example\.com\?subject=Re%3A/);
  assert.match(text, /From: +Ada <ada\+jobs@example\.com>/);
  assert.match(text, /Hello/);
});
