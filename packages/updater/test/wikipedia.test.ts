import assert from "node:assert";
import test from "node:test";
import {
  getWikipediaPageHtml,
  getWikipediaSummary,
  parseWikipediaUrl,
} from "../src/wikipedia.js";

test("parseWikipediaUrl returns language and title", () => {
  assert.deepStrictEqual(
    parseWikipediaUrl("https://id.wikipedia.org/wiki/Vivaldi_(peramban_web)"),
    {
      language: "id",
      title: "Vivaldi_(peramban_web)",
    },
  );
});

test("getWikipediaPageHtml returns a string", async () => {
  assert.ok(
    (
      await getWikipediaPageHtml({
        language: "id",
        title: "Vivaldi_(peramban_web)",
      })
    ).startsWith("<!DOCTYPE html>"),
  );
});

test("getWikipediaSummary returns an object", async () => {
  assert.strictEqual(
    typeof (await getWikipediaSummary({
      language: "id",
      title: "Vivaldi_(peramban_web)",
    })),
    "object",
  );
});
