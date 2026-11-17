import { PAYMENT } from "../config.js";
import { paymentHref } from "./payment.js";

const NAV = [
  ["index.html", "Home"],
  ["my-style.html", "My style"],
  ["practice.html", "Daily practice"],
  ["say-it.html", "Say it well"],
  ["conflict.html", "When we fight"],
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
      </nav>
      <a class="help-link" href="help.html"${active === "help.html" ? ' aria-current="page"' : ""}>Need help?</a>
    </div>`;
  }
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML = `<div class="wrap">
      <a class="brand" href="index.html">ListenHours</a>
      <span>Made for Chennai. <a href="help.html">Help and privacy</a></span>
    </div>`;
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
      : `<p class="small">Payments are being set up. Please come back soon.</p>`}`;
  return box;
}

export function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}
