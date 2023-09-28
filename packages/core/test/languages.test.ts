import assert from "node:assert";
import test from "node:test";
import { defaultLanguage } from "../src/languages.js";

test("default language should be english", () => {
  assert.strictEqual(defaultLanguage, "en");
});
