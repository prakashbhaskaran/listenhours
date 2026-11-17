import { test } from "node:test";
import assert from "node:assert/strict";
import { buildScript, checkScript, EXAMPLES, PRINCIPLES } from "../js/lib/script.js";

test("all empty gives empty string", () => {
  assert.equal(buildScript({}), "");
  assert.equal(buildScript({ when: "  ", feel: "", need: " ", ask: "" }), "");
});
test("only need gives a single clean sentence", () => {
  assert.equal(buildScript({ need: "to feel you're there for me" }), "I need to feel you're there for me.");
});
test("full script", () => {
  assert.equal(
    buildScript({ when: "you don't call for days", feel: "unsure where I stand", need: "to hear from you every day", ask: "send me a quick message when you can" }),
    "When you don't call for days, I feel unsure where I stand. I need to hear from you every day. Would you send me a quick message when you can?"
  );
});
test("trailing punctuation in inputs is not doubled", () => {
  assert.equal(buildScript({ need: "time with you.", ask: "plan a weekend?" }), "I need time with you. Would you plan a weekend?");
});
test("feel without when", () => {
  assert.equal(buildScript({ feel: "lonely" }), "I feel lonely.");
});
test("blame words flagged", () => {
  const w = checkScript("You always ignore me");
  assert.deepEqual(w.map((x) => x.word), ["you always"]);
  assert.ok(w[0].tip.length > 0);
});
test("apologising flagged twice", () => {
  const w = checkScript("Sorry, I'm being needy");
  assert.equal(w.length, 2);
});
test("clean script has no flags", () => {
  assert.deepEqual(checkScript("When you cancel late, I feel hurt. I need some notice."), []);
});
test("content present", () => {
  assert.equal(PRINCIPLES.length, 5);
  assert.ok(EXAMPLES.length >= 4 && EXAMPLES.every((e) => e.situation && e.protest && e.effective));
});
