import assert from "node:assert";
import test from "node:test";
import { deepEqual } from "../src/utils.js";

test("deepEqual", () => {
  let a: any, b: any;

  // True
  a = "foo";
  b = "foo";
  assert.ok(deepEqual(a, b));

  a = 10;
  b = 10;
  assert.ok(deepEqual(a, b));

  a = { foo: "bar" };
  b = a;
  assert.ok(deepEqual(a, b));

  a = {};
  b = {};
  assert.ok(deepEqual(a, b));

  a = undefined;
  b = undefined;
  assert.ok(deepEqual(a, b));

  a = null;
  b = null;
  assert.ok(deepEqual(a, b));

  a = void 0;
  b = undefined;
  assert.ok(deepEqual(a, b));

  a = { foo: "bar" };
  b = { foo: "bar" };
  assert.ok(deepEqual(a, b));

  a = { bar: "baz", foo: { bar: "baz" } };
  b = { foo: { bar: "baz" }, bar: "baz" };
  assert.ok(deepEqual(a, b));

  a = { bar: "baz", foo: { bar: "baz" } };
  b = { foo: { bar: "baz" }, bar: "baz" };
  assert.ok(deepEqual(a, b));

  a = [];
  b = [];
  assert.ok(deepEqual(a, b));

  a = [1, 2, 3];
  b = [1, 2, 3];
  assert.ok(deepEqual(a, b));

  a = [1, 2, 3];
  b = [3, 2, 1];
  assert.ok(deepEqual(a, b));

  a = [1, { foo: "bar" }];
  b = [{ foo: "bar" }, 1];
  assert.ok(deepEqual(a, b));

  // False
  a = "a";
  b = "b";
  assert.ok(deepEqual(a, b) === false);

  a = 5;
  b = 10;
  assert.ok(deepEqual(a, b) === false);

  a = "5";
  b = 5;
  assert.ok(deepEqual(a, b) === false);

  a = [];
  b = {};
  assert.ok(deepEqual(a, b) === false);

  a = undefined;
  b = null;
  assert.ok(deepEqual(a, b) === false);

  a = { foo: "bar" };
  b = { foo: "baz" };
  assert.ok(deepEqual(a, b) === false);

  a = [1, 2, 3];
  b = [2, 3, 4];
  assert.ok(deepEqual(a, b) === false);

  a = [1, { foo: "bar" }];
  b = [{ foo: "bar" }];
  assert.ok(deepEqual(a, b) === false);
});
