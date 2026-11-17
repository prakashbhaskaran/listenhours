import { test } from "node:test";
import assert from "node:assert/strict";
import { INVENTORY_STEPS, addEntry, removeEntry } from "../js/lib/inventory.js";

test("seven steps with name first", () => {
  assert.equal(INVENTORY_STEPS.length, 7);
  assert.equal(INVENTORY_STEPS[0].key, "name");
});
test("addEntry trims, assigns id, does not mutate", () => {
  const list = [];
  const out = addEntry(list, { name: "  Ravi ", trigger: " no calls " });
  assert.equal(list.length, 0);
  assert.equal(out.length, 1);
  assert.equal(out[0].name, "Ravi");
  assert.equal(out[0].trigger, "no calls");
  assert.ok(typeof out[0].id === "string" && out[0].id.length > 0);
});
test("addEntry ignores empty name", () => {
  const list = [{ id: "x", name: "A" }];
  assert.equal(addEntry(list, { name: "   " }), list);
});
test("ids are unique", () => {
  let l = addEntry([], { name: "A" });
  l = addEntry(l, { name: "B" });
  assert.notEqual(l[0].id, l[1].id);
});
test("removeEntry", () => {
  const l = [{ id: "1", name: "A" }, { id: "2", name: "B" }];
  assert.deepEqual(removeEntry(l, "1"), [{ id: "2", name: "B" }]);
});
