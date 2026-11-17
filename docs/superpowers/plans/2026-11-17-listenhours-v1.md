# ListenHours v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A free, static, phone-first website with five book-based relationship tools and a "pay if it helped" link.

**Architecture:** Static multi-page site. Pure logic lives in small ES modules under `js/lib/` (tested with `node --test`); each page has a thin UI script under `js/pages/` that renders forms and calls the lib. Shared header/footer/pay box rendered by `js/lib/layout.js`. No backend; private data in `localStorage` only.

**Tech Stack:** HTML5, CSS (custom properties, no framework), vanilla JS ES modules, Node 24 built-in test runner. Zero dependencies.

**Spec:** `docs/superpowers/specs/2026-11-17-listenhours-design.md`

## Global Constraints

- Scope: dating, partners, marriage, breakups only. Content follows *Attached*; all wording our own.
- Payment copy: "If this helped you, pay whatever you can." No minimum, no suggested amount. Never blocks a tool.
- Footer on every page: not therapy; Tele-MANAS 14416 (free, 24/7); SNEHA Chennai 044-2464 0050; Women's helpline 181.
- No style is shamed; anxious needs are legitimate.
- Nothing leaves the device. `localStorage` only, with a "Clear my data" button.
- Works at 360px width with no horizontal scroll. Light and dark mode.
- No commits (folder is not a git repo; owner hasn't asked).

## Review Focus

1. Self quiz submitted with nothing ticked → "unclear" result asking them to answer, not "secure". (Task 2 test)
2. `localStorage` throws (private mode) → tools still work, nothing crashes. (Task 1 test)
3. Partner quiz with unanswered items → no score, tells them what's missing. (Task 3 test)
4. Script builder with empty fields → no broken sentence fragments; blame words flagged. (Task 4 test)
5. No payment link configured → pay box shows a gentle "coming soon", not a dead link. (Task 1 test)

---

### Task 1: Shared foundation (store, payment, layout, styles, home)

**Files:**
- Create: `package.json` (`"type":"module"`, script `"test": "node --test tests/"`)
- Create: `js/config.js` — `export const PAYMENT = { razorpayUrl: "", upiId: "" };`
- Create: `js/lib/store.js`, `js/lib/payment.js`, `js/lib/layout.js`
- Create: `css/style.css`, `index.html`
- Test: `tests/store.test.js`, `tests/payment.test.js`

**Interfaces:**
- Produces: `load(key, fallback, storage?)`, `save(key, value, storage?) -> boolean`, `clearAll(storage?)` (removes keys prefixed `lh.`); `paymentHref({razorpayUrl, upiId}) -> string|null` (Razorpay URL wins; else `upi://pay?pa=<id>&pn=ListenHours&cu=INR` with no `am`; else null); `renderShell({active})` injects header nav + footer; `payBox() -> HTMLElement`.

- [ ] Tests: `load` returns fallback when storage getItem throws; `save` returns false when setItem throws; round-trip works with a fake storage; `clearAll` removes only `lh.` keys. `paymentHref` cases: razorpay set → that URL; only UPI → string starting `upi://pay?pa=` containing `cu=INR` and not `am=`; neither → null.
- [ ] Run `npm test` → FAIL; implement; run → PASS.
- [ ] Home page: promise line, three styles in plain words, tool cards, coming-soon note (listener/responder/therapist, Chennai, by appointment, 9 AM–6 PM).

### Task 2: My style quiz

**Files:** Create `js/lib/selfQuiz.js`, `my-style.html`, `js/pages/my-style.js`. Test `tests/selfQuiz.test.js`.

**Interfaces:** `SELF_ITEMS: {id, text, cat: "A"|"B"|"C"}[]` (12 per category; A=anxious, B=secure, C=avoidant); `scoreSelf(checkedIds: string[]) -> {style, anxiety, avoidance, counts}` where `anxiety=A/12`, `avoidance=C/12`, `style ∈ "unclear"|"anxious"|"avoidant"|"secure"|"anxious-avoidant"`; `STYLE_INFO[style] -> {title, summary, doNext: string[]}`.

Rule: 0 ticked → unclear. `hiA = anxiety>=0.5`, `hiC = avoidance>=0.5`. Both → anxious-avoidant; hiA → anxious; hiC → avoidant; else secure if B >= max(A,C), else the larger of A/C (A on tie).

- [ ] Tests: 12 items per category, unique ids; [] → unclear; all A → anxious; all C → avoidant; all B → secure; all A + all C → anxious-avoidant; 3 A + 2 B → anxious.
- [ ] FAIL → implement → PASS.
- [ ] Page: tick list, result card with two-axis map (SVG dot at anxiety/avoidance), meaning, next steps, pay box. Last result saved to `lh.selfResult`.

### Task 3: Partner's style quiz

**Files:** Create `js/lib/partnerQuiz.js`, `partner-style.html`, `js/pages/partner-style.js`. Test `tests/partnerQuiz.test.js`.

**Interfaces:** `PARTNER_GROUPS: {id:"A"|"B"|"C", style, items:{id,text}[]}[]` (11 items each; A=avoidant, B=secure, C=anxious, as in the book); `scorePartner(ratings: Record<id,1|2|3>) -> {complete:false, missing:id[]} | {complete:true, totals:{A,B,C}, levels:{A,B,C}, likely: style[]}`; level: 11–17 low, 18–22 moderate, 23–33 high; `likely` = styles with high level; `GOLDEN_RULES`, `SMOKING_GUNS` string arrays.

- [ ] Tests: 11 items per group; missing ratings → complete false with missing ids; all 1s → totals 11, all low, likely []; group A all 3s → A total 33, high, likely ["avoidant"]; boundary 17→low, 18→moderate, 22→moderate, 23→high.
- [ ] FAIL → implement → PASS.
- [ ] Page: 1–3 rating per item, results per style, golden rules, smoking guns, pay box.

### Task 4: Say it well (effective communication)

**Files:** Create `js/lib/script.js`, `say-it.html`, `js/pages/say-it.js`. Test `tests/script.test.js`.

**Interfaces:** `buildScript({when, feel, need, ask}) -> string` (joins only non-empty parts: "When {when}, I feel {feel}." "I need {need}." "Would you {ask}?"; trims, strips trailing punctuation from inputs, returns "" if all empty); `checkScript(text) -> {word, tip}[]` flags blame/generalising ("you always", "you never", "selfish", "your fault", "you make me") and apologising ("sorry", "i know this is silly", "i'm being needy"); `EXAMPLES: {situation, protest, effective}[]`; `PRINCIPLES` (five).

- [ ] Tests: all empty → ""; only `need` → "I need X." with no "When"; trailing "." in input not doubled; "You always ignore me" → flags "you always"; "Sorry, I'm being needy" → two flags; clean script → [].
- [ ] FAIL → implement → PASS.
- [ ] Page: five principles, four inputs with live preview + warnings, copy button, protest vs effective examples, pay box.

### Task 5: Relationship inventory and breakup kit

**Files:** Create `js/lib/inventory.js`, `js/lib/breakup.js`, `inventory.html`, `breakup.html`, `js/pages/inventory.js`, `js/pages/breakup.js`. Test `tests/inventory.test.js`, `tests/breakup.test.js`.

**Interfaces:** `INVENTORY_STEPS: {key, label, hint}[]` (7 columns from the book); `addEntry(list, entry) -> list` (new array, assigns `id` and trims; ignores entries with empty `name`); `removeEntry(list, id) -> list`. Stored under `lh.inventory`. `ENEMY_SIGNS`, `ROYALTY_SIGNS` string arrays; `innerCircleVerdict(enemyCount, royaltyCount) -> "enemy"|"royalty"|"mixed"|"unanswered"` (0/0 unanswered; enemy>=3 and enemy>royalty → enemy; royalty>=3 and enemy===0 → royalty; else mixed); `BREAKUP_STRATEGIES` (nine). Reasons list stored under `lh.reasons`.

- [ ] Tests: addEntry immutability + id + empty name ignored; removeEntry; verdict cases 0/0, 4/1, 0/4, 2/2.
- [ ] FAIL → implement → PASS.
- [ ] Pages: inventory form + saved entries + clear button; breakup page with inner-circle check, nine strategies, "reasons I left" list, pay box.

### Task 6: Verify in browser

- [ ] `npm test` all PASS.
- [ ] Serve (`npx --yes http-server -p 5173` or `python`-free alternative `node` static server) and check each page at 360px and desktop, light/dark, no console errors.
