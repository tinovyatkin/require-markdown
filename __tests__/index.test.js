"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const Snap = require("@matteo.collina/snap");

const snap = Snap(__filename);
const requireMarkdown = require("../");

test("require-markdown", async (t) => {
  await t.test("load README", async () => {
    const rm = requireMarkdown();
    const res = rm("../README.md");
    const snapshot = await snap(res);
    assert.deepEqual(res, snapshot);
  });

  await t.test("renders inline content without linefeeds", async () => {
    const rm = requireMarkdown();
    const res = rm("../__tests__/fixtures/inline.md");
    assert.ok(!res.startsWith("<p>"), "Inline content should not be wrapped in <p>");
  });

  await t.test("accepts custom markdown-it options", async () => {
    const rm = requireMarkdown({ html: true, typographer: false });
    const res = rm("../README.md");
    assert.ok(typeof res === "string");
    assert.ok(res.length > 0);
  });
});
