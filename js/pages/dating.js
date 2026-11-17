import { renderShell, payBox, escapeHtml } from "../lib/layout.js";
import { DATING_STEPS, ALARM_SIGNS, CALM_SIGNS, loveOrAlarm, LOVE_OR_ALARM_TEXT } from "../lib/dating.js";
import { SMOKING_GUNS } from "../lib/partnerQuiz.js";

renderShell({ active: "dating.html" });

document.getElementById("steps").innerHTML = DATING_STEPS
  .map((s) => `<li><strong>${escapeHtml(s.title)}.</strong> ${escapeHtml(s.text)}</li>`).join("");
const checks = (arr, name) => arr.map((t, i) => `<li><label><input type="checkbox" name="${name}" value="${i}"><span>${escapeHtml(t)}</span></label></li>`).join("");
document.getElementById("alarm").innerHTML = checks(ALARM_SIGNS, "alarm");
document.getElementById("calm").innerHTML = checks(CALM_SIGNS, "calm");
document.getElementById("guns").innerHTML = SMOKING_GUNS.map((g) => `<li>${escapeHtml(g)}</li>`).join("");

const form = document.getElementById("check");
const verdict = document.getElementById("verdict");
function update() {
  const n = (name) => form.querySelectorAll(`input[name="${name}"]:checked`).length;
  verdict.textContent = LOVE_OR_ALARM_TEXT[loveOrAlarm(n("alarm"), n("calm"))];
}
form.addEventListener("change", update);
update();
document.getElementById("pay").appendChild(payBox());
