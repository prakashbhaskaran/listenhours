import { test } from "node:test";
import assert from "node:assert/strict";
import { PARTNER_GROUPS, scorePartner, levelFor, GOLDEN_RULES, SMOKING_GUNS } from "../js/lib/partnerQuiz.js";

const all = (v, over = {}) => {
  const r = {};
  for (const g of PARTNER_GROUPS) for (const it of g.items) r[it.id] = over[g.id] ?? v;
  return r;
};

test("11 items per group, styles mapped as in the book", () => {
  assert.deepEqual(PARTNER_GROUPS.map((g) => [g.id, g.style, g.items.length]),
    [["A", "avoidant", 11], ["B", "secure", 11], ["C", "anxious", 11]]);
  const ids = PARTNER_GROUPS.flatMap((g) => g.items.map((i) => i.id));
  assert.equal(new Set(ids).size, 33);
});
test("missing ratings are reported", () => {
  const r = all(1); delete r.pa1; delete r.pc11;
  const s = scorePartner(r);
  assert.equal(s.complete, false);
  assert.deepEqual(s.missing.sort(), ["pa1", "pc11"]);
});
test("invalid rating counts as missing", () => {
  const r = all(1); r.pb2 = 5;
  assert.deepEqual(scorePartner(r).missing, ["pb2"]);
});
test("all 1s → 11 each, low, none likely", () => {
  const s = scorePartner(all(1));
  assert.equal(s.complete, true);
  assert.deepEqual(s.totals, { A: 11, B: 11, C: 11 });
  assert.deepEqual(s.levels, { A: "low", B: "low", C: "low" });
  assert.deepEqual(s.likely, []);
});
test("group A all 3 → avoidant likely", () => {
  const s = scorePartner(all(1, { A: 3 }));
  assert.equal(s.totals.A, 33);
  assert.equal(s.levels.A, "high");
  assert.deepEqual(s.likely, ["avoidant"]);
});
test("level boundaries", () => {
  assert.equal(levelFor(17), "low");
  assert.equal(levelFor(18), "moderate");
  assert.equal(levelFor(22), "moderate");
  assert.equal(levelFor(23), "high");
});
test("rules and smoking guns present", () => {
  assert.equal(GOLDEN_RULES.length, 5);
  assert.ok(SMOKING_GUNS.length >= 6);
});
