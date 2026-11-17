import { renderShell, payBox, escapeHtml } from "../lib/layout.js";
import { localDay, PRACTICE_FORMS, upsertEntry, streak, lastDays, isWin } from "../lib/practice.js";
import { load, save } from "../lib/store.js";

renderShell({ active: "practice.html" });

const STYLES = [["anxious", "Anxious"], ["avoidant", "Avoidant"], ["secure", "Secure"], ["anxious-avoidant", "Both"]];
const fromQuiz = load("lh.selfResult", null)?.style;
let style = load("lh.practiceStyle", null) ?? (PRACTICE_FORMS[fromQuiz] ? fromQuiz : "anxious");
let entries = load("lh.practice", []);
if (!Array.isArray(entries)) entries = [];

const pick = document.getElementById("style-pick");
const form = document.getElementById("checkin");
const fieldsEl = document.getElementById("fields");
const status = document.getElementById("status");

function renderPick() {
  pick.innerHTML = STYLES.map(([v, l]) => `<button type="button" data-style="${v}" aria-pressed="${v === style}">${l}</button>`).join("");
}

function renderForm() {
  const f = PRACTICE_FORMS[style];
  const today = entries.find((e) => e.day === localDay());
  document.getElementById("form-title").textContent = today ? "Today's check-in (saved)" : f.title;
  document.getElementById("form-intro").textContent = f.intro;
  fieldsEl.innerHTML = f.fields.map((fld) => fld.type === "choice"
    ? `<fieldset class="mt"><legend>${escapeHtml(fld.label)}</legend><ul class="choice">${fld.options.map((o) =>
        `<li><label><input type="radio" name="${fld.key}" value="${o.value}"${today?.[fld.key] === o.value ? " checked" : ""}><span>${escapeHtml(o.label)}</span></label></li>`).join("")}</ul></fieldset>`
    : `<label class="field" for="f-${fld.key}">${escapeHtml(fld.label)}<span class="hint">${escapeHtml(fld.hint)}</span></label>
       <textarea id="f-${fld.key}" name="${fld.key}">${escapeHtml(today?.[fld.key] ?? "")}</textarea>`).join("");
}

function renderProgress() {
  const today = localDay();
  const days = lastDays(entries, today, 28);
  document.getElementById("streak").textContent = streak(entries, today);
  document.getElementById("wins").textContent = days.filter((d) => d.win).length;
  document.getElementById("days").innerHTML = days.map((d) =>
    `<li class="${d.win ? "win" : d.done ? "done" : ""}${d.day === today ? " today" : ""}" title="${d.day}${d.win ? ": secure choice" : d.done ? ": checked in" : ""}"></li>`).join("");
  const recent = [...entries].reverse().slice(0, 7);
  const allFields = Object.values(PRACTICE_FORMS).flatMap((f) => f.fields);
  const labelFor = (k) => allFields.find((f) => f.key === k)?.label ?? k;
  const optLabel = (v) => allFields.flatMap((f) => f.options ?? []).find((o) => o.value === v)?.label ?? v;
  document.getElementById("recent").innerHTML = recent.length ? recent.map((e) => `<li>
    <h3>${new Date(e.day + "T12:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}${isWin(e) ? " ✓" : ""}</h3>
    <dl>${Object.entries(e).filter(([k, v]) => !["day", "style"].includes(k) && v).map(([k, v]) =>
      `<dt>${escapeHtml(labelFor(k))}</dt><dd>${escapeHtml(k === "did" ? optLabel(v) : v)}</dd>`).join("")}</dl></li>`).join("")
    : `<li class="muted">No entries yet. Today is a good day to start.</li>`;
}

pick.addEventListener("click", (e) => {
  const b = e.target.closest("[data-style]");
  if (!b) return;
  style = b.dataset.style;
  save("lh.practiceStyle", style);
  renderPick(); renderForm();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries([...new FormData(form).entries()].map(([k, v]) => [k, String(v).trim()]));
  if (!Object.values(data).some(Boolean)) { status.textContent = "Write or choose something first."; return; }
  entries = upsertEntry(entries, { ...data, day: localDay(), style });
  status.textContent = save("lh.practice", entries) ? "Saved. See you tomorrow." : "This browser can't save, so today won't be kept.";
  renderForm(); renderProgress();
});

renderPick(); renderForm(); renderProgress();
document.getElementById("pay").appendChild(payBox());
