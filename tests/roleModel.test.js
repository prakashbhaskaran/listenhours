import { test } from "node:test";
import assert from "node:assert/strict";
import { ROLE_PROMPTS, SECURE_TRAITS, normalizeRoleModel, roleModelLine } from "../js/lib/roleModel.js";

test("content", () => {
  assert.ok(ROLE_PROMPTS.length >= 4);
  assert.ok(SECURE_TRAITS.length >= 8);
});
test("blank name → null", () => {
  assert.equal(normalizeRoleModel({ name: "   " }), null);
  assert.equal(normalizeRoleModel(null), null);
});
test("trims notes and keeps only known traits", () => {
  const key = ROLE_PROMPTS[0].key;
  const rm = normalizeRoleModel({ name: " Meena ", notes: { [key]: "  stays calm ", bogus: "x" }, traits: [SECURE_TRAITS[0], "made up"] });
  assert.equal(rm.name, "Meena");
  assert.equal(rm.notes[key], "stays calm");
  assert.equal("bogus" in rm.notes, false);
  assert.deepEqual(rm.traits, [SECURE_TRAITS[0]]);
});
test("line", () => {
  assert.equal(roleModelLine(null, "here"), "");
  const line = roleModelLine({ name: "Meena", notes: {}, traits: [] }, "in this moment");
  assert.ok(line.includes("Meena") && line.includes("in this moment"));
});
