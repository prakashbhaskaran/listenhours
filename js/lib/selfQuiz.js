// "Find my style": statements written in our own words, built on the book's two
// dimensions (worry about the relationship, comfort with closeness).
// cat A = anxious, B = secure, C = avoidant.

const A = [
  "A slow reply from someone I love can set my mind racing.",
  "Part of me expects that the closer someone gets, the more they'll see that I'm not enough.",
  "Being single leaves me feeling like something important is missing.",
  "When we're apart, I picture them meeting someone they'll like more than me.",
  "Relationships take up a big share of my thoughts most days.",
  "After just a few dates, I can already feel very attached.",
  "I notice tiny shifts in their tone or mood, and I usually think it's about me.",
  "When someone I'm seeing goes quiet, my first thought is \"what did I do?\"",
  "When a fight gets heated, I can lose control of what I say.",
  "If this ended, I'm afraid I'd be alone for good.",
  "Seeing the person I like pay attention to someone else really hurts and stays with me.",
  "When I've been rejected, I've wanted them to see what they're losing.",
];

const B = [
  "Showing love and affection comes easily to me.",
  "Leaning on a partner, and being leaned on, feels normal to me.",
  "Asking for what I want in a relationship isn't a big struggle.",
  "We can disagree without me wondering whether we should be together at all.",
  "If someone I'm seeing seems distant, I don't automatically blame myself.",
  "Opening up about my inner life with a partner feels safe.",
  "I can say \"I see it differently\" to a partner without it becoming a fight.",
  "Looking back, my relationships have mostly felt good.",
  "I tend to trust people until they give me a real reason not to.",
  "I'm not the type to stir up drama to feel noticed.",
  "If a few months of dating ended, it would sting, then I'd move on.",
  "A flash of jealousy comes and goes for me without taking over.",
];

const C = [
  "Keeping my freedom matters more to me than being in a relationship.",
  "My deepest feelings are something I prefer to keep to myself.",
  "Counting on a partner feels risky to me.",
  "When someone wants to get really close, part of me wants to back off.",
  "People I date seem to want more closeness than I can give.",
  "I miss them when they're gone, then feel crowded once they're back.",
  "Someone relying on me heavily makes me uncomfortable.",
  "Once a relationship is over, I move on almost too easily.",
  "When my partner is struggling, I don't know how to be there for them.",
  "If someone I'm seeing starts pulling back, it's honestly a relief.",
  "Getting what I wanted in love can make me suddenly lose interest.",
  "Little things about my partner annoy me, and I'm not sure why.",
];

// Interleave so the categories aren't grouped on the page.
export const SELF_ITEMS = A.flatMap((_, i) => [
  { id: `a${i + 1}`, text: A[i], cat: "A" },
  { id: `b${i + 1}`, text: B[i], cat: "B" },
  { id: `c${i + 1}`, text: C[i], cat: "C" },
]);

const PER = 12;

export function scoreSelf(checkedIds) {
  const set = new Set(checkedIds);
  const counts = { A: 0, B: 0, C: 0 };
  for (const item of SELF_ITEMS) if (set.has(item.id)) counts[item.cat]++;
  const anxiety = counts.A / PER;
  const avoidance = counts.C / PER;
  const total = counts.A + counts.B + counts.C;

  let style;
  if (total === 0) style = "unclear";
  else if (anxiety >= 0.5 && avoidance >= 0.5) style = "anxious-avoidant";
  else if (anxiety >= 0.5) style = "anxious";
  else if (avoidance >= 0.5) style = "avoidant";
  else if (counts.B >= Math.max(counts.A, counts.C)) style = "secure";
  else style = counts.A >= counts.C ? "anxious" : "avoidant";

  return { style, anxiety, avoidance, counts };
}

export const STYLE_INFO = {
  unclear: {
    title: "Tick the statements that are true for you",
    summary: "You haven't ticked anything yet. Go through the list and tick every statement that feels true, even partly.",
    doNext: [],
  },
  anxious: {
    title: "You lean anxious",
    summary:
      "You love deeply and want to be close. You're very good at sensing when something has changed, but you tend to jump to the worst conclusion and take it personally. When you feel unsure of your partner, your mind won't rest until you're reassured. That isn't neediness. Your needs for closeness and reassurance are real and legitimate.",
    doNext: [
      "Wait a little before reacting. Your sense that something has changed is often right, but your first reading of what it means is often wrong.",
      "Notice the urge to call again and again, go silent, or make them jealous. That's protest behaviour. Say what you need instead. \"Say it well\" helps you find the words.",
      "Drama is not passion. Feeling anxious, obsessed and occasionally elated usually means your alarm system is switched on, not that it's true love.",
      "Give calm, steady people a chance, even if they feel boring at first.",
      "If you're dating, meet more than one person for a while. It stops one person from taking over your mind before you know if they're right for you.",
    ],
  },
  avoidant: {
    title: "You lean avoidant",
    summary:
      "Your independence matters a lot to you, and closeness can feel like pressure. You do want love. Everyone has the same need for connection. You've just learned to switch it off when things get close. That can leave you feeling alone even inside a relationship.",
    doNext: [
      "When you suddenly feel \"they're not right for me\" just as things are going well, stop and ask whether you're pushing them away.",
      "Notice when you focus on small flaws. Each evening, write down one thing your partner did that helped you.",
      "Be careful of longing for a perfect ex or waiting for \"the one\". Both keep the real person in front of you at a distance.",
      "If you need space, say so, and tell them it's your need and not their fault.",
      "Closeness is easier while doing something together, like walking or cooking.",
    ],
  },
  secure: {
    title: "You lean secure",
    summary:
      "You're comfortable being close, you say what you need, and you don't get thrown by every small change. About half of people are like this. It's a real strength. Your calm can even help an anxious or avoidant partner feel safer over time.",
    doNext: [
      "If you start feeling jealous, anxious, or careful about what you say, take it seriously. It can mean you're with someone who isn't good for you.",
      "Being able to get along with anyone doesn't mean you have to stay with anyone.",
      "Keep doing what works: be available, support without taking over, and encourage.",
    ],
  },
  "anxious-avoidant": {
    title: "You lean both anxious and avoidant",
    summary:
      "You worry about your partner's love, and you also feel uneasy when things get close. This combination is less common, and it can feel confusing to be pulled both ways. The ideas for both anxious and avoidant styles apply to you.",
    doNext: [
      "Notice which pull you're feeling right now: the urge to get closer, or the urge to escape.",
      "When you feel the urge to chase, say what you need instead of acting it out.",
      "When you feel the urge to run, ask whether you're pushing love away because it's getting close.",
      "A calm, steady partner helps most. Talking with a counsellor can help too.",
    ],
  },
};
