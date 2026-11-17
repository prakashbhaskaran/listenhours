// "Understand my partner": rate behaviours 1–3. Three groups of eleven, scored
// as the book describes (11–17 low, 18–22 moderate, 23–33 high). Wording is ours.
// Group A = avoidant, B = secure, C = anxious.

const g = (prefix, texts) => texts.map((text, i) => ({ id: `${prefix}${i + 1}`, text }));

export const PARTNER_GROUPS = [
  {
    id: "A",
    style: "avoidant",
    items: g("pa", [
      "Hot and cold. Very present one week, hard to reach the next.",
      "Talks a lot about needing space, or looks down on people who \"need\" others.",
      "Puts you or past partners down, even as a joke.",
      "Keeps distance in practical ways: plans stay vague, prefers sleeping apart, holidays alone.",
      "Guards their own world. You're kept away from their friends, family, or home.",
      "Dreams of a perfect partner, or of an ex, but is vague about what went wrong.",
      "Suspects partners want to trap them or take advantage of them.",
      "Has rigid rules about relationships, or a fixed \"type\", and expects you to fit.",
      "In a disagreement, shuts down, walks out, or blows up.",
      "Leaves you guessing how they feel. Rarely says it plainly.",
      "Gets uncomfortable when you ask where things are going.",
    ]),
  },
  {
    id: "B",
    style: "secure",
    items: g("pb", [
      "Reliable. Calls when they say they will, and keeps plans or tells you early if they can't.",
      "Makes decisions with you, not for you.",
      "Flexible about how a relationship should look.",
      "You can ask where you stand and they answer honestly, even if it's not what you hoped.",
      "In an argument, tries to understand what's really bothering you.",
      "Isn't scared of commitment or of you depending on them.",
      "Doesn't treat the relationship as a burden or hard work.",
      "After a close moment, they stay close. They don't go cold.",
      "Brings you into their circle of friends and family.",
      "Tells you how they feel, often and easily.",
      "Doesn't play games or keep score.",
    ]),
  },
  {
    id: "C",
    style: "anxious",
    items: g("pc", [
      "Wants a lot of closeness and time together, early on.",
      "Shows insecurity, like comparing themselves to your exes or worrying you'll lose interest.",
      "Seems unhappy or lost when single.",
      "Plays games to keep your attention, like acting busy or distant if you haven't called.",
      "Expects you to guess what's wrong instead of saying it.",
      "Acts out instead of solving the problem, like threatening to leave and then taking it back.",
      "Takes your bad day or busy schedule as a sign you don't love them.",
      "Waits for you to make the first move so they don't get hurt.",
      "Thinks about the relationship constantly and analyses every detail.",
      "Fears one small mistake will ruin everything.",
      "Suspects you of cheating, or checks your phone or whereabouts.",
    ]),
  },
];

export function levelFor(total) {
  if (total >= 23) return "high";
  if (total >= 18) return "moderate";
  return "low";
}

export function scorePartner(ratings = {}) {
  const missing = [];
  const totals = {};
  for (const grp of PARTNER_GROUPS) {
    totals[grp.id] = 0;
    for (const it of grp.items) {
      const v = Number(ratings[it.id]);
      if (v === 1 || v === 2 || v === 3) totals[grp.id] += v;
      else missing.push(it.id);
    }
  }
  if (missing.length) return { complete: false, missing };
  const levels = {};
  const likely = [];
  for (const grp of PARTNER_GROUPS) {
    levels[grp.id] = levelFor(totals[grp.id]);
    if (levels[grp.id] === "high") likely.push(grp.style);
  }
  return { complete: true, totals, levels, likely };
}

export const STYLE_MEANING = {
  avoidant:
    "They may want love, but closeness makes them feel crowded, so they pull back. Everyday things can turn into quiet negotiations for space. You can't take closeness for granted with them.",
  secure:
    "They want closeness and aren't thrown by small things. They say what they mean and try to find what works for you both. With them, closeness becomes a given, not a fight.",
  anxious:
    "They want closeness badly and are very sensitive to any sign of distance. When scared, they may act out instead of saying what they need. If you can steadily reassure them, they tend to become a deeply loving, devoted partner.",
};

export const GOLDEN_RULES = [
  "Ask first: do they actually seek closeness? If not, they're probably avoidant. If yes, secure or anxious.",
  "Then ask how worried they are about the relationship, and how easily they feel rejected.",
  "Don't judge from one behaviour. Look for a pattern across many.",
  "Say what you need, plainly, and watch how they respond. Their reaction tells you more than anything else.",
  "Notice what they don't say or do. Silence and changing the subject are answers too.",
];

export const SMOKING_GUNS = [
  "Mixed messages about how they feel or whether they're committed.",
  "Longs for an ideal relationship, but hints it won't be with you.",
  "Wants \"the one\", but always finds a reason why it can't be this person.",
  "Ignores your feelings, and keeps ignoring them after you raise it.",
  "Calls you \"too needy\", \"too sensitive\", or \"overreacting\".",
  "Changes the subject when what you say is inconvenient for them.",
  "Answers your worries like a lawyer, with facts and no feeling.",
  "However clearly you explain what you need, it never seems to land.",
];

export const BOTH_HIGH_NOTE =
  "High on both anxious and avoidant? Some of their behaviours look alike on the surface. Use the five rules below, especially the first: do they seek closeness, or keep it away?";
