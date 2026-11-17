import { test } from "node:test";
import assert from "node:assert/strict";
import { CONFLICT_PRINCIPLES, AVOID_TACTICS, FIGHT_TRUTHS, SCENARIOS, gradeAnswer, workshopScore } from "../js/lib/conflict.js";

test("content shape", () => {
  assert.equal(CONFLICT_PRINCIPLES.length, 5);
  assert.equal(AVOID_TACTICS.length, 6);
  assert.equal(FIGHT_TRUTHS.length, 6);
  assert.ok(SCENARIOS.length >= 6);
  assert.equal(new Set(SCENARIOS.map((s) => s.id)).size, SCENARIOS.length);
  assert.ok(SCENARIOS.some((s) => s.answer === "secure") && SCENARIOS.some((s) => s.answer === "insecure"));
  for (const s of SCENARIOS) assert.ok(s.text && s.question && s.why && s.better && ["secure", "insecure"].includes(s.answer));
});
test("grade correct and wrong", () => {
  const s = SCENARIOS[0];
  const other = s.answer === "secure" ? "insecure" : "secure";
  assert.equal(gradeAnswer(s.id, s.answer).correct, true);
  const g = gradeAnswer(s.id, other);
  assert.equal(g.correct, false);
  assert.equal(g.answer, s.answer);
  assert.ok(g.why && g.better);
});
test("unknown id or bad choice", () => {
  assert.equal(gradeAnswer("nope", "secure"), null);
  assert.equal(gradeAnswer(SCENARIOS[0].id, "maybe"), null);
});
test("workshop score", () => {
  const all = Object.fromEntries(SCENARIOS.map((s) => [s.id, s.answer]));
  assert.deepEqual(workshopScore(all), { correct: SCENARIOS.length, total: SCENARIOS.length });
  assert.deepEqual(workshopScore({}), { correct: 0, total: SCENARIOS.length });
  assert.deepEqual(workshopScore({ nope: "secure" }), { correct: 0, total: SCENARIOS.length });
});
