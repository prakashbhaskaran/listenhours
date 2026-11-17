// "Dating when you're anxious": choosing someone who can give you what you need.
export const DATING_STEPS = [
  { title: "Accept what you need", text: "Wanting closeness, reassurance and a clear sense of where you stand isn't neediness. It's simply what you need to be happy. Instead of asking \"how do I make them like me?\", ask \"can this person give me what I need?\"" },
  { title: "Spot avoidant partners early", text: "Mixed messages, keeping you guessing, brushing off your feelings: notice these in the first weeks, before you're attached, and treat them as reasons to step back." },
  { title: "Be yourself and say what you need", text: "Playing it cool attracts exactly the people who keep you at arm's length. Say what you want early and kindly. The right person will lean in, and the wrong one shows themselves quickly." },
  { title: "Don't put everything on one person", text: "For a while, keep meeting new people instead of locking onto the first person you like. It stops one person from taking over your mind before you know if they're right for you, and reminds you there are many good people out there." },
  { title: "Give calm people a chance", text: "Someone steady and clear may feel boring at first, because your alarm isn't going off. Stay a little longer. Calm is what real love feels like." },
];

export const ALARM_SIGNS = [
  "I check my phone constantly for their messages.",
  "I feel elated when they're warm, and crushed when they go quiet.",
  "I'm never quite sure where I stand.",
  "I replay our conversations looking for clues.",
  "I hide what I really want so I don't scare them away.",
  "I'm cancelling plans with friends in case they call.",
  "I feel like they're out of my league.",
];

export const CALM_SIGNS = [
  "I know when I'll see them next.",
  "They tell me how they feel without me having to guess.",
  "I can say what I want without rehearsing it.",
  "I can focus on work and friends when we're apart.",
  "When I'm worried, a small reassurance is enough.",
  "I feel more like myself around them, not less.",
];

export function loveOrAlarm(alarm, calm) {
  if (alarm === 0 && calm === 0) return "unanswered";
  if (alarm >= 3 && alarm > calm) return "alarm";
  if (calm >= 3 && calm > alarm) return "calm";
  return "mixed";
}

export const LOVE_OR_ALARM_TEXT = {
  unanswered: "Tick whatever is true for you right now.",
  alarm: "This sounds like your alarm system, not love. The highs and lows, the guessing, the obsessing: that's what it feels like when someone keeps you unsure. Real love tends to bring peace of mind.",
  calm: "This sounds steady and safe. It might feel less dramatic than you're used to. That's a good sign, not a missing spark.",
  mixed: "It's mixed. Say what you need clearly, and watch whether they move toward you or away.",
};
