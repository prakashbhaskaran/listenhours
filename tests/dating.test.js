import { test } from "node:test";
import assert from "node:assert/strict";
import { DATING_STEPS, ALARM_SIGNS, CALM_SIGNS, loveOrAlarm } from "../js/lib/dating.js";

test("content", () => {
  assert.equal(DATING_STEPS.length, 5);
  assert.ok(ALARM_SIGNS.length >= 5 && CALM_SIGNS.length >= 5);
});
test("verdicts", () => {
  assert.equal(loveOrAlarm(0, 0), "unanswered");
  assert.equal(loveOrAlarm(4, 1), "alarm");
  assert.equal(loveOrAlarm(3, 0), "alarm");
  assert.equal(loveOrAlarm(0, 4), "calm");
  assert.equal(loveOrAlarm(1, 4), "calm");
  assert.equal(loveOrAlarm(2, 2), "mixed");
});
