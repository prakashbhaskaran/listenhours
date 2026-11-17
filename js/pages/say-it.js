import { renderShell, payBox, escapeHtml } from "../lib/layout.js";
import { buildScript, checkScript, PRINCIPLES, EXAMPLES, JUDGE_RESPONSE } from "../lib/script.js";
import { load, save } from "../lib/store.js";

renderShell({ active: "say-it.html" });

document.getElementById("principles").innerHTML = PRINCIPLES
  .map((p) => `<li><strong>${escapeHtml(p.title)}.</strong> ${escapeHtml(p.text)}</li>`).join("");
document.getElementById("judge").innerHTML = JUDGE_RESPONSE.map((q) => `<li>${escapeHtml(q)}</li>`).join("");
document.getElementById("examples").innerHTML = EXAMPLES.map((e) => `<article>
  <h3>${escapeHtml(e.situation)}</h3>
  <p class="bad">${escapeHtml(e.protest)}</p>
  <p class="good">${escapeHtml(e.effective)}</p></article>`).join("");
document.getElementById("pay").appendChild(payBox());

const form = document.getElementById("builder");
const preview = document.getElementById("preview");
const warnings = document.getElementById("warnings");
const draft = load("lh.script", {});
for (const [k, v] of Object.entries(draft)) if (form.elements[k]) form.elements[k].value = v;

function update() {
  const values = Object.fromEntries(new FormData(form).entries());
  save("lh.script", values);
  const text = buildScript(values);
  preview.textContent = text || "Start typing above. Your words will appear here.";
  preview.classList.toggle("muted", !text);
  const raw = Object.values(values).join(" ");
  warnings.innerHTML = checkScript(raw)
    .map((w) => `<li><strong>"${escapeHtml(w.word)}"</strong>: ${escapeHtml(w.tip)}</li>`).join("");
}
form.addEventListener("input", update);
form.addEventListener("submit", (e) => e.preventDefault());
update();

document.getElementById("copy").addEventListener("click", async () => {
  const text = buildScript(Object.fromEntries(new FormData(form).entries()));
  const status = document.getElementById("copy-status");
  if (!text) { status.textContent = "Write something first."; return; }
  try { await navigator.clipboard.writeText(text); status.textContent = "Copied."; }
  catch { status.textContent = "Couldn't copy. Select the text and copy it yourself."; }
});

// Remind them of their secure person, if they've set one.
import("../lib/roleModel.js").then(({ roleModelLine }) => {
  const line = roleModelLine(load("lh.roleModel", null), "if they were in your place");
  const el = document.getElementById("rm-note");
  if (line && el) { el.textContent = line; el.hidden = false; }
});
