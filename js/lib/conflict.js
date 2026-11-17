// "When we fight": the secure way of handling conflict. Wording and scenarios are original.

export const CONFLICT_PRINCIPLES = [
  { title: "Care about how they're doing, too", text: "Your happiness and theirs are tied together. A win that leaves them hurt is not a win." },
  { title: "Stay on this one problem", text: "Talk about what actually happened, not everything that has ever gone wrong." },
  { title: "Don't make it bigger than it is", text: "Avoid \"always\", \"never\", and \"I've had it with you\". One fight is not the whole relationship." },
  { title: "Stay in the conversation", text: "Don't walk out, go silent, or switch off. If you need a pause, say when you'll come back." },
  { title: "Say what you feel and need", text: "Plainly, without blame. It's better than hoping they'll read your mind." },
];

export const AVOID_TACTICS = [
  "Drifting away from the real problem",
  "Not saying what you actually feel and need",
  "Personal attacks and hurtful words",
  "Answering their negativity with more negativity",
  "Withdrawing: going silent, walking out, shutting down",
  "Forgetting that their well-being matters too",
];

export const FIGHT_TRUTHS = [
  "One fight doesn't end a relationship.",
  "Say your fear out loud instead of letting it drive you. \"I'm scared you're pulling away.\"",
  "Their bad mood is most likely not about you.",
  "Expect them to care, and ask for what you need.",
  "They can't know what you haven't told them.",
  "When you're not sure what they meant, ask.",
];

export const SCENARIOS = [
  {
    id: "s1",
    text: "Priya tells Karthik she feels uneasy that he's planning a boys' trip to Goa only two months after they started dating. He says: \"So now I can't have a life? You'd hate it anyway. And the tickets are booked.\"",
    question: "Karthik's reply is…",
    answer: "insecure",
    why: "He makes her sound demanding, drags in money, and never touches what's actually worrying her.",
    better: "Stay on her worry: \"I can see why that feels unsettling this early. What would help you feel okay about it?\"",
  },
  {
    id: "s2",
    text: "After Karthik's reply, Priya apologises for bringing it up and tells herself she's being too much.",
    question: "Priya's reaction is…",
    answer: "insecure",
    why: "She backs down to protect the relationship, and quietly agrees that her feelings don't count.",
    better: "Say it calmly anyway: \"This trip makes me anxious about where we stand. I need to know we're on the same page.\" His response will tell her a lot.",
  },
  {
    id: "s3",
    text: "Driving home in traffic, Anitha says Arun never worries about their son's falling marks. Arun, tired, says: \"I do worry about it. I just can't think properly while driving in this. Can we sit down tonight and plan something?\"",
    question: "Arun's reply is…",
    answer: "secure",
    why: "He doesn't hit back at the accusation. He agrees with her real concern, explains himself honestly, and offers a time to deal with it.",
    better: "He handled it well. Keeping that plan for tonight is what makes it count.",
  },
  {
    id: "s4",
    text: "Meera asks Vikram to dinner. He says, \"Come with my office gang, it'll be fun.\" She replies, half joking, \"Scared to be alone with me or what?\" There's a pause, then he says, \"Okay, message me if you're coming,\" and hangs up.",
    question: "Both of them reacted…",
    answer: "insecure",
    why: "Her real wish came out as a jab, and he avoided the moment entirely instead of asking what she meant.",
    better: "Meera: \"I'd love some time just the two of us. Can we plan that?\" Vikram: \"You sound upset. What's going on?\"",
  },
  {
    id: "s5",
    text: "At a café, Divya notices Rahul staring at someone at the next table. She says, \"That really hurts when you do that.\" He answers, \"You're right. That was careless of me, and I'd hate it if it were the other way round. Tell me if I do it again.\"",
    question: "Rahul's reply is…",
    answer: "secure",
    why: "He takes her feeling seriously, owns what he did, reassures her, and invites her to speak up next time.",
    better: "A brief, sincere answer like this calms things down more than any argument would.",
  },
  {
    id: "s6",
    text: "Sanjay snaps that Lakshmi didn't even greet his mother when she came by. Lakshmi says, \"Did I really not? I was so lost in my head. I'm sorry, I'll call her tomorrow.\"",
    question: "Lakshmi's reply is…",
    answer: "secure",
    why: "She doesn't get defensive or dig up old complaints. She stays on this one issue and makes a simple, real repair.",
    better: "Sometimes a secure response is just an honest apology and a small action.",
  },
  {
    id: "s7",
    text: "Nikhil keeps putting off introducing Asha to his family. When she finally asks why, he goes quiet for days, then says he needs space and stays at his parents' place for a week.",
    question: "Nikhil's response is…",
    answer: "insecure",
    why: "He withdraws instead of engaging, and leaves a big, sensitive topic buried where it will grow.",
    better: "Talk about it, even if it's uncomfortable: \"I'm nervous about it, and here's why. Can we work out a timeline together?\"",
  },
];

const byId = new Map(SCENARIOS.map((s) => [s.id, s]));

export function gradeAnswer(id, choice) {
  const s = byId.get(id);
  if (!s || (choice !== "secure" && choice !== "insecure")) return null;
  return { correct: choice === s.answer, answer: s.answer, why: s.why, better: s.better };
}

export function workshopScore(answers = {}) {
  let correct = 0;
  for (const s of SCENARIOS) if (answers[s.id] === s.answer) correct++;
  return { correct, total: SCENARIOS.length };
}
