import { renderShell, payBox, escapeHtml } from "../lib/layout.js";
import { ROLE_PROMPTS, SECURE_TRAITS, normalizeRoleModel } from "../lib/roleModel.js";
import { load, save } from "../lib/store.js";

renderShell({ active: "role-model.html" });

const form = document.getElementById("rm");
const status = document.getElementById("status");
const summary = document.getElementById("summary");
const saved = load("lh.roleModel", null);

document.getElementById("prompts").innerHTML = ROLE_PROMPTS.map((p) => `
  <label class="field" for="p-${p.key}">${escapeHtml(p.label)}<span class="hint">${escapeHtml(p.hint)}</span></label>
  <textarea id="p-${p.key}" name="${p.key}"></textarea>`).join("");
document.getElementById("traits").innerHTML = SECURE_TRAITS.map((t, i) =>
  `<li><label><input type="checkbox" name="trait" value="${escapeHtml(t)}" id="t-${i}"><span>${escapeHtml(t)}</span></label></li>`).join("");

if (saved) {
  form.elements.name.value = saved.name;
  for (const p of ROLE_PROMPTS) form.elements[p.key].value = saved.notes?.[p.key] ?? "";
  form.querySelectorAll('input[name="trait"]').forEach((c) => { c.checked = saved.traits?.includes(c.value); });
  showSummary(saved);
}

function showSummary(rm) {
  const notes = ROLE_PROMPTS.filter((p) => rm.notes[p.key]);
  summary.hidden = false;
  summary.innerHTML = `<h2>When it gets hard, think of ${escapeHtml(rm.name)}</h2>
    ${rm.traits.length ? `<p class="muted">What you're borrowing:</p><ul>${rm.traits.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>` : ""}
    ${notes.map((p) => `<h3>${escapeHtml(p.label)}</h3><p>${escapeHtml(rm.notes[p.key])}</p>`).join("")}
    <p class="note">${escapeHtml(rm.name)} will now appear in <a href="say-it.html">Say it well</a> and <a href="inventory.html">Look back</a>, to remind you how they'd handle it.</p>`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const rm = normalizeRoleModel({
    name: fd.get("name"),
    notes: Object.fromEntries(ROLE_PROMPTS.map((p) => [p.key, fd.get(p.key)])),
    traits: fd.getAll("trait"),
  });
  if (!rm) { status.textContent = "Add a name first."; form.elements.name.focus(); return; }
  status.textContent = save("lh.roleModel", rm) ? "Saved." : "This browser can't save, but here's your summary.";
  showSummary(rm);
  summary.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
});

document.getElementById("pay").appendChild(payBox());
