import { test } from "node:test";
import assert from "node:assert/strict";
import { localDay, PRACTICE_FORMS, upsertEntry, streak, lastDays, isWin } from "../js/lib/practice.js";

test("localDay uses local date parts", () => {
  assert.equal(localDay(new Date(2026, 0, 5, 23, 50)), "2026-01-05");
  assert.equal(localDay(new Date(2026, 10, 17, 0, 5)), "2026-11-17");
});
test("forms for every style", () => {
  for (const s of ["anxious", "avoidant", "secure", "anxious-avoidant"]) {
    assert.ok(PRACTICE_FORMS[s].title && PRACTICE_FORMS[s].fields.length >= 2);
  }
});
test("upsert replaces same day and sorts", () => {
  let l = upsertEntry([], { day: "2026-11-17", note: "a" });
  l = upsertEntry(l, { day: "2026-11-15", note: "b" });
  l = upsertEntry(l, { day: "2026-11-17", note: "c" });
  assert.deepEqual(l.map((e) => [e.day, e.note]), [["2026-11-15", "b"], ["2026-11-17", "c"]]);
});
test("upsert ignores entry without day", () => {
  const l = [{ day: "2026-11-01" }];
  assert.equal(upsertEntry(l, { note: "x" }), l);
});
test("streak", () => {
  const l = ["2026-11-14", "2026-11-15", "2026-11-16"].map((day) => ({ day }));
  assert.equal(streak(l, "2026-11-16"), 3);
  assert.equal(streak(l, "2026-11-17"), 3); // yesterday still counts
  assert.equal(streak(l, "2026-11-18"), 0); // gap
  assert.equal(streak([], "2026-11-18"), 0);
  assert.equal(streak([{ day: "2026-10-31" }, { day: "2026-11-01" }], "2026-11-01"), 2); // month boundary
});
test("isWin", () => {
  assert.equal(isWin({ did: "said" }), true);
  assert.equal(isWin({ did: "waited" }), true);
  assert.equal(isWin({ did: "stayed" }), true);
  assert.equal(isWin({ did: "protested" }), false);
  assert.equal(isWin({}), false);
});
test("lastDays", () => {
  const l = [{ day: "2026-11-16", did: "said" }, { day: "2026-11-17", did: "protested" }];
  const d = lastDays(l, "2026-11-17", 3);
  assert.deepEqual(d, [
    { day: "2026-11-15", done: false, win: false },
    { day: "2026-11-16", done: true, win: true },
    { day: "2026-11-17", done: true, win: false },
  ]);
});
