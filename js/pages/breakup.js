import { renderShell, payBox, escapeHtml } from "../lib/layout.js";
import { ENEMY_SIGNS, ROYALTY_SIGNS, innerCircleVerdict, VERDICT_TEXT, BREAKUP_STRATEGIES } from "../lib/breakup.js";
import { load, save } from "../lib/store.js";

renderShell({ active: "breakup.html" });

const checks = (arr, name) => arr.map((t, i) => `<li><label><input type="checkbox" name="${name}" value="${i}"><span>${escapeHtml(t)}</span></label></li>`).join("");
document.getElementById("enemy").innerHTML = checks(ENEMY_SIGNS, "enemy");
document.getElementById("royalty").innerHTML = checks(ROYALTY_SIGNS, "royalty");

const circle = document.getElementById("circle");
const verdict = document.getElementById("verdict");
function updateVerdict() {
  const n = (name) => circle.querySelectorAll(`input[name="${name}"]:checked`).length;
  verdict.textContent = VERDICT_TEXT[innerCircleVerdict(n("enemy"), n("royalty"))];
}
circle.addEventListener("change", updateVerdict);
updateVerdict();

document.getElementById("strategies").innerHTML = BREAKUP_STRATEGIES
  .map((s) => `<li><strong>${escapeHtml(s.title)}.</strong> ${escapeHtml(s.text)}</li>`).join("");

const rForm = document.getElementById("reason-form");
const rList = document.getElementById("reasons");
let reasons = load("lh.reasons", []);
function renderReasons() {
  rList.innerHTML = reasons.length
    ? reasons.map((r, i) => `<li><p style="white-space:pre-wrap;margin:0">${escapeHtml(r)}</p><button type="button" class="linklike small" data-i="${i}">Remove</button></li>`).join("")
    : `<li class="muted">Your list is empty.</li>`;
}
rForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const v = rForm.elements.reason.value.trim();
  if (!v) { rForm.elements.reason.focus(); return; }
  reasons = [...reasons, v];
  save("lh.reasons", reasons);
  rForm.reset();
  renderReasons();
});
rList.addEventListener("click", (e) => {
  const i = e.target.closest("[data-i]")?.dataset.i;
  if (i == null) return;
  reasons = reasons.filter((_, j) => j !== Number(i));
  save("lh.reasons", reasons);
  renderReasons();
});
renderReasons();
document.getElementById("pay").appendChild(payBox());
