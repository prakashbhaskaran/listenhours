import { renderShell } from "../lib/layout.js";
import { clearAll } from "../lib/store.js";

renderShell({ active: "privacy.html" });
document.getElementById("clear-data").addEventListener("click", () => {
  clearAll();
  document.getElementById("clear-status").textContent = "Done. Everything you saved on this device has been erased.";
});
