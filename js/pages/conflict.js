import { renderShell, payBox, escapeHtml } from "../lib/layout.js";
import { CONFLICT_PRINCIPLES, AVOID_TACTICS, FIGHT_TRUTHS, SCENARIOS, gradeAnswer, workshopScore } from "../lib/conflict.js";
import { load, save } from "../lib/store.js";

renderShell({ active: "conflict.html" });

const li = (arr) => arr.map((t) => `<li>${escapeHtml(t)}</li>`).join("");
document.getElementById("principles").innerHTML = CONFLICT_PRINCIPLES
  .map((p) => `<li><strong>${escapeHtml(p.title)}.</strong> ${escapeHtml(p.text)}</li>`).join("");
document.getElementById("avoid").innerHTML = li(AVOID_TACTICS);
document.getElementById("truths").innerHTML = li(FIGHT_TRUTHS);

let answers = load("lh.workshop", {});
const box = document.getElementById("scenarios");
const scoreEl = document.getElementById("score");

function verdictHtml(id) {
  const g = gradeAnswer(id, answers[id]);
  if (!g) return "";
  return `<div class="verdict ${g.correct ? "right" : "wrong"}" role="status">
    <p><strong>${g.correct ? "Yes." : "Not quite."}</strong> It was ${g.answer}. ${escapeHtml(g.why)}</p>
    <p class="muted">${escapeHtml(g.better)}</p></div>`;
}

function render() {
  box.innerHTML = SCENARIOS.map((s, i) => `<article class="scenario" data-id="${s.id}">
    <h3>Moment ${i + 1}</h3>
    <p>${escapeHtml(s.text)}</p>
    <p class="q">${escapeHtml(s.question)}</p>
    <div class="actions tight">
      <button type="button" class="btn quiet" data-choice="secure" aria-pressed="${answers[s.id] === "secure"}">Secure</button>
      <button type="button" class="btn quiet" data-choice="insecure" aria-pressed="${answers[s.id] === "insecure"}">Insecure</button>
    </div>
    <div class="out">${verdictHtml(s.id)}</div>
  </article>`).join("");
  const { correct, total } = workshopScore(answers);
  const answered = Object.keys(answers).filter((k) => SCENARIOS.some((s) => s.id === k)).length;
  scoreEl.textContent = answered === total ? `You read ${correct} of ${total} moments the secure way.` : "";
}

box.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-choice]");
  if (!btn) return;
  const id = btn.closest("[data-id]").dataset.id;
  answers = { ...answers, [id]: btn.dataset.choice };
  save("lh.workshop", answers);
  render();
  box.querySelector(`[data-id="${id}"] [data-choice="${btn.dataset.choice}"]`)?.focus();
});

render();
document.getElementById("pay").appendChild(payBox());
