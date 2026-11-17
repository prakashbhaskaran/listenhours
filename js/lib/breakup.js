// Breakup kit: the inner-circle check and the book's nine survival strategies.
export const ENEMY_SIGNS = [
  "I hide from family and friends how my partner speaks to me in private.",
  "Others call my partner kind and caring, and it doesn't match what I see.",
  "I find out what's happening in their life by overhearing, not by being told.",
  "When something big comes up, they talk it over with others, not me.",
  "If I were in real trouble, I'm not sure they'd come.",
  "They put more effort into impressing people they barely know than into me.",
  "Watching other couples be gentle with each other surprises me.",
  "Of everyone in their life, I'm the one who gets the sharpest words.",
  "How I'm feeling, in body or mind, doesn't seem to matter much to them.",
];

export const ROYALTY_SIGNS = [
  "They put my well-being near the top of their list.",
  "I'm the first person they tell things to.",
  "What I think carries real weight with them.",
  "With them I feel looked after and admired.",
  "When I reach for closeness, they reach back.",
];

export function innerCircleVerdict(enemyCount, royaltyCount) {
  if (enemyCount === 0 && royaltyCount === 0) return "unanswered";
  if (enemyCount >= 3 && enemyCount > royaltyCount) return "enemy";
  if (royaltyCount >= 3 && enemyCount === 0) return "royalty";
  return "mixed";
}

export const VERDICT_TEXT = {
  unanswered: "Tick whatever is true, then check again.",
  enemy: "You're being treated like the enemy, not like someone loved. Being close to them has made you the target. That isn't your fault, and it usually doesn't change. It may be time to go.",
  royalty: "You're treated like royalty in their inner circle. That's what a loving relationship looks like.",
  mixed: "It's mixed. Watch closely. Say what you need and notice how they respond. If the hurtful side keeps winning, take that seriously.",
};

export const BREAKUP_STRATEGIES = [
  { title: "Ask how you're treated up close", text: "Do they treat you like royalty or like the enemy? If it's the enemy, it's time to go." },
  { title: "Build support before you leave", text: "Start telling friends and family what it's really like. Shame keeps people silent. Support gets you through." },
  { title: "Plan a safe place for the first nights", text: "Stay with family or a close friend. The pull to go back is strongest at the start." },
  { title: "Meet your need for comfort in other ways", text: "Time with people close to you, exercise, good food, rest. The calmer your body, the less it hurts." },
  { title: "If you slip and contact them, be kind to yourself", text: "Don't punish yourself. Feeling bad about yourself makes you want to go back even more." },
  { title: "Don't feel guilty for hurting", text: "Breakup pain is real. The brain treats it like physical pain. Look after yourself as you would with a broken leg." },
  { title: "When good memories flood in, ask a friend for the truth", text: "Your mind will replay the sweet moments and hide the bad ones. A friend can remind you how it really was." },
  { title: "Write down why you left", text: "List the bad moments while they're clear. Read the list when you start missing them." },
  { title: "Know this will pass", text: "Most people recover well from a broken heart and go on to find better love." },
];
