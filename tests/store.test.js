import { test } from "node:test";
import assert from "node:assert/strict";
import { load, save, clearAll } from "../js/lib/store.js";

function fakeStorage() {
  const m = new Map();
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
    key: (i) => [...m.keys()][i] ?? null,
    get length() { return m.size; },
  };
}
const broken = {
  getItem() { throw new Error("blocked"); },
  setItem() { throw new Error("blocked"); },
  removeItem() { throw new Error("blocked"); },
  key() { throw new Error("blocked"); },
  get length() { throw new Error("blocked"); },
};

test("load returns fallback when storage throws", () => {
  assert.deepEqual(load("lh.x", [1], broken), [1]);
});
test("save returns false when storage throws", () => {
  assert.equal(save("lh.x", 1, broken), false);
});
test("clearAll does not throw when storage throws", () => {
  assert.doesNotThrow(() => clearAll(broken));
});
test("round trip", () => {
  const s = fakeStorage();
  assert.equal(save("lh.a", { n: 2 }, s), true);
  assert.deepEqual(load("lh.a", null, s), { n: 2 });
});
test("load returns fallback for missing or corrupt", () => {
  const s = fakeStorage();
  assert.equal(load("lh.none", "fb", s), "fb");
  s.setItem("lh.bad", "{not json");
  assert.equal(load("lh.bad", "fb", s), "fb");
});
test("clearAll removes only lh. keys", () => {
  const s = fakeStorage();
  s.setItem("lh.a", "1"); s.setItem("lh.b", "2"); s.setItem("other", "3");
  clearAll(s);
  assert.equal(s.getItem("lh.a"), null);
  assert.equal(s.getItem("lh.b"), null);
  assert.equal(s.getItem("other"), "3");
});
