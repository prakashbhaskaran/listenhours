import { renderShell, payBox, escapeHtml } from "../lib/layout.js";
import { SELF_ITEMS, scoreSelf, STYLE_INFO } from "../lib/selfQuiz.js";
import { attachmentMap } from "../lib/map.js";
import { load, save } from "../lib/store.js";

renderShell({ active: "my-style.html" });

const form = document.getElementById("quiz");
const list = document.getElementById("items");
const count = document.getElementById("count");
const result = document.getElementById("result");
const saved = load("lh.selfChecked", []);

list.innerHTML = SELF_ITEMS.map((it) => `<li><label>
  <input type="checkbox" name="item" value="${it.id}"${saved.includes(it.id) ? " checked" : ""}>
  <span>${escapeHtml(it.text)}</span></label></li>`).join("");

const checked = () => [...form.querySelectorAll('input[name="item"]:checked')].map((i) => i.value);
const updateCount = () => { count.textContent = `${checked().length} ticked`; };
form.addEventListener("change", () => { updateCount(); save("lh.selfChecked", checked()); });
updateCount();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const r = scoreSelf(checked());
  const info = STYLE_INFO[r.style];
  save("lh.selfResult", { style: r.style, at: new Date().toISOString() });
  result.hidden = false;
  result.innerHTML = `<div class="panel">
    <h2>${escapeHtml(info.title)}</h2>
    ${r.style === "unclear" ? "" : attachmentMap(r, "Your place on the attachment map")}
    <p>${escapeHtml(info.summary)}</p>
    ${info.doNext.length ? `<h3>What helps</h3><ul>${info.doNext.map((d) => `<li>${escapeHtml(d)}</li>`).join("")}</ul>` : ""}
    ${r.style === "unclear" ? "" : `<p class="small muted">Styles can change. About one in four people shift over a few years, often through a relationship with someone secure. This is a guide, not a diagnosis.</p>
    <div class="actions"><a class="btn" href="partner-style.html">Now look at my partner</a><a class="btn quiet" href="say-it.html">Say it well</a></div>`}
  </div>`;
  if (r.style !== "unclear") result.appendChild(payBox());
  result.focus();
  result.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
});
