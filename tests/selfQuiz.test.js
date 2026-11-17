import { test } from "node:test";
import assert from "node:assert/strict";
import { SELF_ITEMS, scoreSelf, STYLE_INFO } from "../js/lib/selfQuiz.js";

const ids = (cat) => SELF_ITEMS.filter((i) => i.cat === cat).map((i) => i.id);

test("12 items per category, unique ids", () => {
  for (const c of ["A", "B", "C"]) assert.equal(ids(c).length, 12);
  assert.equal(new Set(SELF_ITEMS.map((i) => i.id)).size, 36);
});
test("nothing ticked is unclear", () => {
  assert.equal(scoreSelf([]).style, "unclear");
});
test("all anxious", () => assert.equal(scoreSelf(ids("A")).style, "anxious"));
test("all avoidant", () => assert.equal(scoreSelf(ids("C")).style, "avoidant"));
test("all secure", () => assert.equal(scoreSelf(ids("B")).style, "secure"));
test("both high is anxious-avoidant", () => {
  assert.equal(scoreSelf([...ids("A"), ...ids("C")]).style, "anxious-avoidant");
});
test("3 A + 2 B is anxious", () => {
  const r = scoreSelf([...ids("A").slice(0, 3), ...ids("B").slice(0, 2)]);
  assert.equal(r.style, "anxious");
  assert.deepEqual(r.counts, { A: 3, B: 2, C: 0 });
  assert.equal(r.anxiety, 3 / 12);
});
test("unknown ids ignored", () => {
  assert.equal(scoreSelf(["nope"]).style, "unclear");
});
test("info exists for every style", () => {
  for (const s of ["unclear", "anxious", "avoidant", "secure", "anxious-avoidant"]) {
    assert.ok(STYLE_INFO[s].title && STYLE_INFO[s].summary && Array.isArray(STYLE_INFO[s].doNext));
  }
});
