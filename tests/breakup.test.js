import { test } from "node:test";
import assert from "node:assert/strict";
import { innerCircleVerdict, ENEMY_SIGNS, ROYALTY_SIGNS, BREAKUP_STRATEGIES } from "../js/lib/breakup.js";

test("verdicts", () => {
  assert.equal(innerCircleVerdict(0, 0), "unanswered");
  assert.equal(innerCircleVerdict(4, 1), "enemy");
  assert.equal(innerCircleVerdict(0, 4), "royalty");
  assert.equal(innerCircleVerdict(2, 2), "mixed");
  assert.equal(innerCircleVerdict(3, 3), "mixed");
  assert.equal(innerCircleVerdict(1, 4), "mixed");
});
test("content", () => {
  assert.equal(ENEMY_SIGNS.length, 9);
  assert.equal(ROYALTY_SIGNS.length, 5);
  assert.equal(BREAKUP_STRATEGIES.length, 9);
});
