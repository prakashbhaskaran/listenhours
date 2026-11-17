import { renderShell, payBox, escapeHtml } from "../lib/layout.js";
import { PARTNER_GROUPS, scorePartner, STYLE_MEANING, GOLDEN_RULES, SMOKING_GUNS, BOTH_HIGH_NOTE } from "../lib/partnerQuiz.js";
import { load, save } from "../lib/store.js";

renderShell({ active: "partner-style.html" });

const form = document.getElementById("quiz");
const box = document.getElementById("items");
const status = document.getElementById("status");
const result = document.getElementById("result");
const saved = load("lh.partnerRatings", {});

// Mix the three groups so the pattern isn't obvious while answering.
const items = PARTNER_GROUPS[0].items.flatMap((_, i) => PARTNER_GROUPS.map((g) => g.items[i]));
const LABELS = { 1: "Not true", 2: "Somewhat", 3: "Very true" };

box.innerHTML = items.map((it, n) => `<div class="rating" id="row-${it.id}" role="radiogroup" aria-labelledby="q-${it.id}">
  <p id="q-${it.id}">${n + 1}. ${escapeHtml(it.text)}</p>
  <div class="opts">${[1, 2, 3].map((v) => `<label><input type="radio" name="${it.id}" value="${v}"${saved[it.id] == v ? " checked" : ""}><span>${LABELS[v]}</span></label>`).join("")}</div>
</div>`).join("");

const ratings = () => Object.fromEntries(new FormData(form).entries());
form.addEventListener("change", (e) => {
  save("lh.partnerRatings", ratings());
  document.getElementById(`row-${e.target.name}`)?.classList.remove("missing");
  status.textContent = "";
});

const NAMES = { avoidant: "Avoidant", secure: "Secure", anxious: "Anxious" };

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const s = scorePartner(ratings());
  box.querySelectorAll(".missing").forEach((el) => el.classList.remove("missing"));
  if (!s.complete) {
    s.missing.forEach((id) => document.getElementById(`row-${id}`).classList.add("missing"));
    status.textContent = `${s.missing.length} still to answer. They're highlighted.`;
    const first = document.querySelector(`#row-${s.missing[0]} input`);
    first?.focus();
    return;
  }
  const rows = PARTNER_GROUPS.map((g) => `<li><strong>${NAMES[g.style]}</strong>: <span class="level ${s.levels[g.id]}">${s.levels[g.id]}</span> <span class="muted small">(${s.totals[g.id]} of 33)</span></li>`).join("");
  let headline;
  if (s.likely.length === 0) headline = "No style stands out strongly yet";
  else if (s.likely.length === 1) headline = `Your partner seems ${s.likely[0]}`;
  else headline = `Your partner shows signs of ${s.likely.join(" and ")}`;
  const bothInsecure = s.likely.includes("avoidant") && s.likely.includes("anxious");

  result.hidden = false;
  result.innerHTML = `<div class="panel">
    <h2>${escapeHtml(headline)}</h2>
    <ul>${rows}</ul>
    ${s.likely.map((st) => `<p><strong>${NAMES[st]}:</strong> ${escapeHtml(STYLE_MEANING[st])}</p>`).join("")}
    ${s.likely.length === 0 ? `<p>Scores of 23 or more point clearly to a style. Keep watching, and use the rules below.</p>` : ""}
    ${bothInsecure ? `<p class="note">${escapeHtml(BOTH_HIGH_NOTE)}</p>` : ""}
    <h3>Five rules for reading someone</h3>
    <ol class="steps">${GOLDEN_RULES.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ol>
    <h3>Warning signs to take seriously</h3>
    <p class="muted small">It's less about any one behaviour and more about a feeling: things stay unclear, and your feelings don't seem to matter to them.</p>
    <ul>${SMOKING_GUNS.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>
    <div class="actions"><a class="btn" href="say-it.html">Find the words to tell them</a></div>
  </div>`;
  result.appendChild(payBox());
  result.focus();
});
