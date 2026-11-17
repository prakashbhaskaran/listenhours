// "Say it well": effective communication as the book describes it.

const clean = (s) => String(s ?? "").trim().replace(/[\s.!?,;:]+$/u, "");

export function buildScript({ when, feel, need, ask } = {}) {
  const w = clean(when), f = clean(feel), n = clean(need), a = clean(ask);
  const parts = [];
  if (w && f) parts.push(`When ${w}, I feel ${f}.`);
  else if (w) parts.push(`When ${w}, it's hard for me.`);
  else if (f) parts.push(`I feel ${f}.`);
  if (n) parts.push(`I need ${n}.`);
  if (a) parts.push(`Would you ${a}?`);
  return parts.join(" ");
}

const FLAGS = [
  { re: /\byou always\b/i, word: "you always", tip: "\"Always\" turns one problem into an attack on who they are. Name the specific moment instead." },
  { re: /\byou never\b/i, word: "you never", tip: "\"Never\" makes them defend themselves instead of hearing you. Describe one specific time." },
  { re: /\bselfish\b/i, word: "selfish", tip: "Labels like \"selfish\" are blame. Say what you feel and need instead." },
  { re: /\byour fault\b/i, word: "your fault", tip: "Blame starts a fight. Keep the focus on what you need." },
  { re: /\byou make me\b/i, word: "you make me", tip: "Try \"When you…, I feel…\". It owns your feeling without accusing." },
  { re: /\bsorry\b/i, word: "sorry", tip: "No need to apologise for having needs. They're valid." },
  { re: /\bi know (this|it) (is|sounds) (silly|stupid|dumb)\b/i, word: "i know this is silly", tip: "Your needs aren't silly. Say them plainly." },
  { re: /\bi['’]?m (being )?(too )?needy\b/i, word: "i'm being needy", tip: "Needing closeness isn't a flaw. You don't have to label yourself." },
];

export function checkScript(text) {
  const t = String(text ?? "");
  return FLAGS.filter((f) => f.re.test(t)).map(({ word, tip }) => ({ word, tip }));
}

export const PRINCIPLES = [
  { title: "Wear your heart on your sleeve", text: "Be honest about how you feel. It takes courage, and it's worth it." },
  { title: "Focus on your needs", text: "Use words like need, feel and want. Talk about what you're hoping for, not what they're doing wrong." },
  { title: "Be specific", text: "Name the exact situation, like \"when you don't stay the night\", so they know what to change." },
  { title: "Don't blame", text: "Never make them feel selfish or useless. Wait until you're calm before you talk." },
  { title: "Don't apologise for your needs", text: "Your needs are real. Say them steadily, without saying sorry." },
];

export const EXAMPLES = [
  {
    situation: "They're very busy at work and you hardly see them.",
    protest: "Calling every couple of hours to make sure you're on their mind.",
    effective: "\"I miss you, and I'm finding your new hours hard, even though I know it's temporary.\"",
  },
  {
    situation: "They keep talking about their ex.",
    protest: "Telling them it's pathetic, or bringing up your own exes so they feel it too.",
    effective: "\"When you talk about your ex, I feel unsure where I stand. I need to feel secure with you.\"",
  },
  {
    situation: "They always make plans at the last minute.",
    protest: "Saying you're busy every time, to teach them a lesson.",
    effective: "\"Not knowing if or when I'll see you unsettles me. Can we roughly plan our week ahead?\"",
  },
  {
    situation: "They haven't called for a few days.",
    protest: "When they finally call, acting cold or busy to show them.",
    effective: "\"It hurts when you disappear. I need to feel like a priority when it's possible.\"",
  },
  {
    situation: "You need space (if you lean avoidant).",
    protest: "Going silent, or suddenly deciding they're not right for you.",
    effective: "\"I need a little time alone when things feel intense. It's my need, not something you did. Can we find a way that works for both of us?\"",
  },
];

export const JUDGE_RESPONSE = [
  "Do they try to understand what's really bothering you?",
  "Do they answer the actual issue, or dodge it?",
  "Do they take you seriously, or make you feel foolish for asking?",
  "Do they try to help you feel better, or just defend themselves?",
  "Do they respond to your feelings, not only the facts?",
];
