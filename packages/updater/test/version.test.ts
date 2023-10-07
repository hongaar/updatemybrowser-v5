import assert from "node:assert";
import test from "node:test";
import { highestVersion, toSimpleVersionString } from "../src/version.js";

test("toSimpleVersionString returns simple version string", () => {
  assert.strictEqual(toSimpleVersionString("2"), "2");
  assert.strictEqual(toSimpleVersionString("2.0.1"), "2.0.1");
  assert.strictEqual(toSimpleVersionString("0.4.0"), "0.4");
  assert.strictEqual(toSimpleVersionString("0.0.0.1"), "0");
  assert.strictEqual(toSimpleVersionString("2.1.0"), "2.1");
  assert.strictEqual(toSimpleVersionString("89.234.0.2432"), "89.234");
});

test("highestVersion returns highest version", () => {
  assert.strictEqual(highestVersion(["1", "3", "2"]), "3");
  assert.strictEqual(highestVersion(["2", "1"]), "2");
  assert.strictEqual(highestVersion(["1.0.4", "49.0.1"]), "49.0.1");
});
