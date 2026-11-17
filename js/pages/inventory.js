import { renderShell, payBox, escapeHtml } from "../lib/layout.js";
import { INVENTORY_STEPS, addEntry, removeEntry, ANXIOUS_PATTERNS, AVOIDANT_PATTERNS, SECURE_PRINCIPLES } from "../lib/inventory.js";
import { load, save } from "../lib/store.js";

renderShell({ active: "inventory.html" });

const form = document.getElementById("entry");
const list = document.getElementById("entries");
const status = document.getElementById("status");
let entries = load("lh.inventory", []);

document.getElementById("fields").innerHTML = INVENTORY_STEPS.map((s, i) => `
  <label class="field" for="f-${s.key}">${escapeHtml(s.label)}<span class="hint">${escapeHtml(s.hint)}</span></label>
  ${i === 0 ? `<input type="text" id="f-${s.key}" name="${s.key}" autocomplete="off">` : `<textarea id="f-${s.key}" name="${s.key}"></textarea>`}`).join("");

const ul = (arr) => `<ul>${arr.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`;
document.getElementById("patterns").innerHTML = `
  <h3>If you lean anxious</h3>${ul(ANXIOUS_PATTERNS)}
  <h3>If you lean avoidant</h3>${ul(AVOIDANT_PATTERNS)}
  <h3>Secure ways to try</h3>${ul(SECURE_PRINCIPLES)}`;

function render() {
  if (!entries.length) {
    list.innerHTML = `<li class="muted">Nothing yet. Start with the relationship that comes to mind first.</li>`;
    return;
  }
  list.innerHTML = entries.map((e) => `<li>
    <h3>${escapeHtml(e.name)}</h3>
    <dl>${INVENTORY_STEPS.slice(1).filter((s) => e[s.key]).map((s) => `<dt>${escapeHtml(s.label)}</dt><dd>${escapeHtml(e[s.key])}</dd>`).join("")}</dl>
    <button type="button" class="linklike" data-remove="${escapeHtml(e.id)}">Delete ${escapeHtml(e.name)}</button>
  </li>`).join("");
}

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  if (!String(data.name ?? "").trim()) {
    status.textContent = "Add a name or initial first.";
    form.elements.name.focus();
    return;
  }
  entries = addEntry(entries, data);
  const ok = save("lh.inventory", entries);
  status.textContent = ok ? "Saved." : "Added for now. This browser can't save, so it will be gone when you close the page.";
  form.reset();
  render();
});

list.addEventListener("click", (ev) => {
  const id = ev.target.closest("[data-remove]")?.dataset.remove;
  if (!id) return;
  entries = removeEntry(entries, id);
  save("lh.inventory", entries);
  render();
});

render();
document.getElementById("pay").appendChild(payBox());
