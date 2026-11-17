// Daily practice: a short check-in, one per day, saved only on this device.
const pad = (n) => String(n).padStart(2, "0");

export function localDay(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// Day arithmetic on "YYYY-MM-DD" strings, independent of time zone.
function shiftDay(day, delta) {
  const [y, m, d] = day.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + delta));
  return `${t.getUTCFullYear()}-${pad(t.getUTCMonth() + 1)}-${pad(t.getUTCDate())}`;
}

const DID_ANXIOUS = [
  { value: "said", label: "I said what I needed, calmly" },
  { value: "waited", label: "I waited before reacting" },
  { value: "protested", label: "I protested (called again and again, went silent, made them jealous…)" },
  { value: "none", label: "Nothing set me off today" },
];
const DID_AVOIDANT = [
  { value: "stayed", label: "I stayed close, or asked for space kindly" },
  { value: "waited", label: "I noticed the urge and didn't act on it" },
  { value: "protested", label: "I pulled away, went cold, or found fault" },
  { value: "none", label: "No urge to pull away today" },
];

export const PRACTICE_FORMS = {
  anxious: {
    title: "Today's check-in",
    intro: "Notice when your alarm goes off, and practise saying what you need instead of protesting.",
    fields: [
      { key: "trigger", type: "text", label: "Did anything set off your alarm today?", hint: "A late reply, a change in tone, plans left vague…" },
      { key: "did", type: "choice", label: "What did you do?", options: DID_ANXIOUS },
      { key: "note", type: "text", label: "One kind thing to tell yourself", hint: "My needs are real. One quiet hour doesn't mean they're leaving." },
    ],
  },
  avoidant: {
    title: "Today's check-in",
    intro: "Notice the good in your partner, and notice the urge to pull away before acting on it.",
    fields: [
      { key: "gratitude", type: "text", label: "One thing your partner did that helped you today", hint: "Even something small." },
      { key: "did", type: "choice", label: "Did you feel the urge to pull away?", options: DID_AVOIDANT },
      { key: "note", type: "text", label: "What set it off, if anything?", hint: "Closeness after a good evening, a request, a plan…" },
    ],
  },
  secure: {
    title: "Today's check-in",
    intro: "Keep your security strong. Notice anything that's making you feel less sure of yourself.",
    fields: [
      { key: "gratitude", type: "text", label: "One way you were there for someone today", hint: "Available, encouraging, without taking over." },
      { key: "did", type: "choice", label: "How did you handle anything difficult?", options: [
        { value: "said", label: "I said what I needed" },
        { value: "stayed", label: "I stayed calm and in the conversation" },
        { value: "protested", label: "I reacted in a way I didn't like" },
        { value: "none", label: "Nothing difficult today" },
      ] },
      { key: "note", type: "text", label: "Anything making you feel anxious or guarded lately?", hint: "That can be a sign something in the relationship isn't right." },
    ],
  },
  "anxious-avoidant": {
    title: "Today's check-in",
    intro: "Notice which way you're pulled today, toward chasing or toward escaping, and choose the secure move.",
    fields: [
      { key: "trigger", type: "text", label: "What pulled at you today?", hint: "Wanting to chase, wanting to run, or both." },
      { key: "did", type: "choice", label: "What did you do?", options: [
        { value: "said", label: "I said what I felt and needed" },
        { value: "waited", label: "I noticed the urge and didn't act on it" },
        { value: "protested", label: "I chased or pulled away" },
        { value: "none", label: "A calm day" },
      ] },
      { key: "gratitude", type: "text", label: "One good thing about someone close to you", hint: "Even something small." },
    ],
  },
};

export function upsertEntry(list, entry) {
  if (!entry?.day) return list;
  const rest = list.filter((e) => e.day !== entry.day);
  return [...rest, { ...entry }].sort((a, b) => (a.day < b.day ? -1 : a.day > b.day ? 1 : 0));
}

export function streak(list, today) {
  const days = new Set(list.map((e) => e.day));
  let cursor = days.has(today) ? today : shiftDay(today, -1);
  let n = 0;
  while (days.has(cursor)) { n++; cursor = shiftDay(cursor, -1); }
  return n;
}

export function isWin(entry) {
  return ["said", "waited", "stayed"].includes(entry?.did);
}

export function lastDays(list, today, n = 28) {
  const byDay = new Map(list.map((e) => [e.day, e]));
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const day = shiftDay(today, -i);
    const e = byDay.get(day);
    out.push({ day, done: !!e, win: !!e && isWin(e) });
  }
  return out;
}
