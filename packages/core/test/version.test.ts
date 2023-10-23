import assert from "node:assert";
import test from "node:test";
import {
  gt,
  highestVersion,
  lt,
  toSimpleVersionString,
} from "../src/version.js";

test("toSimpleVersionString returns simple version string", () => {
  assert.strictEqual(toSimpleVersionString("2"), "2");
  assert.strictEqual(toSimpleVersionString("2.0.1"), "2.0.1");
  assert.strictEqual(toSimpleVersionString("0.4.0"), "0.4");
  assert.strictEqual(toSimpleVersionString("0.0.0.1"), "0");
  assert.strictEqual(toSimpleVersionString("2.1.0"), "2.1");
  assert.strictEqual(toSimpleVersionString("89.234.0.2432"), "89.234");
  assert.strictEqual(toSimpleVersionString("1.a.2"), "1");
  assert.strictEqual(toSimpleVersionString("1.2.a"), "1.2");
  assert.strictEqual(toSimpleVersionString("a"), "0");
});

test("highestVersion returns highest version", () => {
  assert.strictEqual(highestVersion(["1", "3", "2"]), "3");
  assert.strictEqual(highestVersion(["2", "1"]), "2");
  assert.strictEqual(highestVersion(["1.0.4", "49.0.1"]), "49.0.1");
  assert.strictEqual(highestVersion(["1.8.0", "1.10.0", "1.9.0"]), "1.10");
});

test("gt returns true for higher versions", () => {
  assert.strictEqual(gt("1", "3"), false);
  assert.strictEqual(gt("99", "a"), true);
  assert.strictEqual(gt("1.4.5", "1.4.6"), false);
  assert.strictEqual(gt("20.10", "10.20"), true);
});

test("lt returns true for lower versions", () => {
  assert.strictEqual(lt("1", "3"), true);
  assert.strictEqual(lt("99", "a"), false);
  assert.strictEqual(lt("1.4.5", "1.4.6"), true);
  assert.strictEqual(lt("20.10", "10.20"), false);
});
