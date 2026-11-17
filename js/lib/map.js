// The book's two-dimension picture of attachment, drawn as an SVG string.
// x: worry about the relationship (anxiety), low on the left.
// y: discomfort with closeness (avoidance), low at the top.
export function attachmentMap(point = null, title = "The attachment map") {
  const S = 300, H = 326, P = 34, inner = S - P * 2, half = inner / 2;
  const clamp = (v) => Math.min(1, Math.max(0, Number(v) || 0));
  const dot = point
    ? `<circle class="you" r="9" cx="${P + clamp(point.anxiety) * inner}" cy="${P + clamp(point.avoidance) * inner}"><title>You</title></circle>`
    : "";
  return `<svg class="map" viewBox="0 0 ${S} ${H}" role="img" aria-label="${title}: secure is low worry and low discomfort with closeness; anxious is high worry; avoidant is high discomfort with closeness; anxious and avoidant is both.${point ? " Your dot shows where your answers fall." : ""}">
  <rect class="frame" x="${P}" y="${P}" width="${inner}" height="${inner}" rx="10"/>
  <rect class="secure-zone" x="${P + 1}" y="${P + 1}" width="${half - 1}" height="${half - 1}" rx="9"/>
  <line class="axis" x1="${P + half}" y1="${P}" x2="${P + half}" y2="${P + inner}"/>
  <line class="axis" x1="${P}" y1="${P + half}" x2="${P + inner}" y2="${P + half}"/>
  <text class="q-label" x="${P + half / 2}" y="${P + half / 2 + 5}" text-anchor="middle">Secure</text>
  <text class="q-label" x="${P + half * 1.5}" y="${P + half / 2 + 5}" text-anchor="middle">Anxious</text>
  <text class="q-label" x="${P + half / 2}" y="${P + half * 1.5 + 5}" text-anchor="middle">Avoidant</text>
  <text class="q-label" x="${P + half * 1.5}" y="${P + half * 1.5 - 4}" text-anchor="middle">Anxious &amp;</text>
  <text class="q-label" x="${P + half * 1.5}" y="${P + half * 1.5 + 14}" text-anchor="middle">avoidant</text>
  <text x="${P}" y="${P - 12}">Less worry</text>
  <text x="${P + inner}" y="${P - 12}" text-anchor="end">More worry →</text>
    <text x="${P}" y="${P + inner + 20}">↓ More need for distance</text>
  ${dot}
</svg>`;
}
