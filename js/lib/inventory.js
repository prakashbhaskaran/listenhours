// "Look back": the book's relationship inventory, one entry per partner.
export const INVENTORY_STEPS = [
  { key: "name", label: "Who was it?", hint: "A name or initial. Past or present, even brief." },
  { key: "pattern", label: "What was it like?", hint: "What keeps coming back when you remember it?" },
  { key: "trigger", label: "What set you off?", hint: "A moment that made you anxious, or made you want to pull away." },
  { key: "reaction", label: "What did you think, feel and do?", hint: "For example: called again and again, went silent, found fault with them." },
  { key: "principle", label: "Which pattern was that?", hint: "Protest behaviour, putting them on a pedestal, seeing only their flaws, missing an ex…" },
  { key: "cost", label: "How did it cost you?", hint: "What did reacting that way take from you, or from the relationship?" },
  { key: "secure", label: "What would a secure person do?", hint: "Think of someone calm and steady you know. What would they say or do here?" },
];

let counter = 0;
const newId = () => `${Date.now().toString(36)}-${(counter++).toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export function addEntry(list, entry) {
  const name = String(entry?.name ?? "").trim();
  if (!name) return list;
  const item = { id: newId() };
  for (const { key } of INVENTORY_STEPS) item[key] = String(entry?.[key] ?? "").trim();
  return [...list, item];
}

export function removeEntry(list, id) {
  return list.filter((e) => e.id !== id);
}

export const ANXIOUS_PATTERNS = [
  "Protest behaviour: calling a lot, going silent, keeping score, threatening to leave, making them jealous",
  "Putting them on a pedestal and feeling small next to them",
  "Remembering only the good after a fight",
  "Mistaking the anxious highs and lows for love",
];
export const AVOIDANT_PATTERNS = [
  "Pulling back when things got close",
  "Seeing only their flaws",
  "Assuming they meant to annoy or trap you",
  "Missing an ex, or waiting for \"the one\"",
  "Pushing loving feelings down",
];
export const SECURE_PRINCIPLES = [
  "Be available", "Support without taking over", "Encourage", "Say what you need",
  "Don't play games", "Care about their well-being", "Stay on the actual problem",
  "Don't generalise in a fight", "Calm small upsets before they grow",
];
