import { PAYMENT } from "../config.js";
import { paymentHref } from "./payment.js";
import { clearAll } from "./store.js";

const NAV = [
  ["index.html", "Home"],
  ["my-style.html", "My style"],
  ["partner-style.html", "My partner"],
  ["inventory.html", "Look back"],
  ["say-it.html", "Say it well"],
  ["breakup.html", "Breakup kit"],
];

export function renderShell({ active } = {}) {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (header) {
    header.className = "site-header";
    header.innerHTML = `<div class="wrap">
      <a class="brand" href="index.html">ListenHours</a>
      <nav class="site-nav" aria-label="Main">
        ${NAV.map(([href, label]) =>
          `<a href="${href}"${href === active ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
      </nav></div>`;
  }
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML = `<div class="wrap">
      <h2>If you need help right now</h2>
      <p>ListenHours is not therapy and can't respond in an emergency. If you're in crisis or thinking of hurting yourself, please call:</p>
      <ul class="helplines">
        <li><a href="tel:14416">14416</a> Tele-MANAS (free, 24 hours)</li>
        <li><a href="tel:04424640050">044-2464 0050</a> SNEHA, Chennai</li>
        <li><a href="tel:181">181</a> Women's helpline, if a partner is hurting you</li>
      </ul>
      <div class="footer-row">
        <span>Your answers stay on this device. Nothing is sent anywhere.</span>
        <button type="button" class="linklike" id="clear-data">Clear my data</button>
        <span id="clear-status" role="status"></span>
      </div>
      <p class="credit">Ideas based on <cite>Attached</cite> by Amir Levine and Rachel Heller.</p>
    </div>`;
    footer.querySelector("#clear-data").addEventListener("click", () => {
      clearAll();
      footer.querySelector("#clear-status").textContent = "Cleared. Reload the page to start fresh.";
    });
  }
}

export function payBox() {
  const box = document.createElement("aside");
  box.className = "pay";
  box.setAttribute("aria-label", "Support ListenHours");
  const href = paymentHref(PAYMENT);
  box.innerHTML = `<h2>Did this help?</h2>
    <p>Everything here is free. If this helped you, pay whatever you can. It keeps ListenHours going for the next person.</p>
    ${href
      ? `<a class="btn" href="${href}" target="_blank" rel="noopener">Pay what you can</a>`
      : `<p class="small muted">Payments are being set up. Please come back soon.</p>`}`;
  return box;
}

export function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}
