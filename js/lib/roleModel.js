// "My secure person": borrow the calm of someone steady you know.
export const ROLE_PROMPTS = [
  { key: "says", label: "What do they say when someone they love is upset?", hint: "Their actual words, if you can remember them." },
  { key: "ignores", label: "What do they let go of, and what do they take seriously?", hint: "Small slights they shrug off, things they always respond to." },
  { key: "conflict", label: "How do they handle a disagreement?", hint: "Do they listen, stay calm, stay in the conversation?" },
  { key: "support", label: "How do they support the people close to them?", hint: "Encouraging, available, without taking over." },
  { key: "outlook", label: "What's their attitude to love and relationships?", hint: "For example: trusting, patient, not playing games." },
];

export const SECURE_TRAITS = [
  "Says what they need, plainly",
  "Doesn't play games",
  "Stays calm when things get tense",
  "Assumes the best about people they love",
  "Forgives quickly",
  "Stays in the conversation during a fight",
  "Is there when someone needs them",
  "Encourages without taking over",
  "Doesn't take every bad mood personally",
  "Treats the people closest to them best",
];

export function normalizeRoleModel(input) {
  const name = String(input?.name ?? "").trim();
  if (!name) return null;
  const notes = {};
  for (const { key } of ROLE_PROMPTS) {
    const v = String(input?.notes?.[key] ?? "").trim();
    if (v) notes[key] = v;
  }
  const traits = (input?.traits ?? []).filter((t) => SECURE_TRAITS.includes(t));
  return { name, notes, traits };
}

export function roleModelLine(rm, situation) {
  if (!rm?.name) return "";
  return `Think of ${rm.name}. What would they say or do ${situation}?`;
}
