# ListenHours — Design (v1: free tools website)

Date: 2026-11-17
Status: Draft, awaiting approval

## Intent and the why

A healing website for people in Chennai who are struggling in love — dating,
partners, marriage, and breakups. It is built on the ideas in *Attached*
(Levine & Heller): attachment styles (anxious, avoidant, secure), protest
behavior, deactivating strategies, effective communication, and surviving a
breakup. Everything is free. People pay only if it helped them.

This v1 is the first step of a larger plan: AI chat comes next, then paid human
sessions (listener / responder / therapist, by appointment, 9 AM–6 PM, Chennai).

## Goals

- Help someone understand their own attachment style and their partner's.
- Give them practical, book-based tools they can use today.
- Let them pay if it helped — any amount they can, no minimum.
- Simple, clean, calm, works well on a phone.

## Non-goals (v1)

- No AI chat, no human sessions, no booking, no accounts, no server.
- No topics outside romantic relationships (grief, family, work, depression).

## Anti-goals (a failure even if it works)

- Feeling like a cold clinical test, or like it's selling something.
- Shaming any style — the book says none is "pathological"; anxious needs are
  legitimate ("dependency is not a bad word").
- Sending answers anywhere. Private answers stay on the visitor's device.
- Presenting itself as therapy or a diagnosis.

## Constraints

- Content follows the book only. Quiz questions and text are written in our own
  words (the book's quizzes are adapted from published research
  questionnaires; we don't copy its wording into a paid product).
- Static site: plain HTML, CSS, JavaScript. No build step, no backend.
- Hostable free (Netlify / GitHub Pages / Cloudflare Pages).

## Approaches considered

- **A. Static tools site, no AI (chosen).** Free hosting, fast to build, fully
  private. No one to talk to yet.
- B. A + AI chat. Needs a server and per-chat cost. Next phase.
- C. B + human tiers with bookings. Several times the work. Later phase.

Chosen: A, to see whether people use it and pay before spending on AI or
recruiting listeners.

## What's in it

1. **Home** — warm one-line promise, the three styles in plain words, links to
   the tools, a short "this is not therapy" note, crisis help.
2. **My style quiz** — true/false statements measuring two things: worry about
   the relationship (anxiety) and comfort with closeness (avoidance). Result:
   anxious / avoidant / secure / anxious-avoidant, placed on the two-axis map,
   with what it means and what to do next (from chapters 3, 5, 6, 7).
3. **My partner's style** — rate behaviors 1–3 in three groups; result plus the
   five "golden rules" and the avoidant "smoking guns" (chapters 4–5).
4. **Relationship inventory** — guided steps per partner: what it was like,
   what triggered you, how you reacted, which pattern that was, what it cost
   you, what a secure person would do (chapter 9). Saved in the browser.
5. **Say it well** — builds a script using the five principles of effective
   communication (heart on sleeve, your needs, specific, no blame, no
   apology), with protest-behavior vs. effective examples (chapter 11).
6. **Breakup kit** — the nine survival strategies, a "reasons I left" list to
   reread when good memories flood back, and the "inner circle: royalty or
   enemy?" check (chapter 10).
7. **Pay if it helped** — after each result: "If this helped you, pay
   whatever you can." No minimum, no suggested amount. Opens a payment link.
   Never blocks anything.
8. **Coming soon** — a short note that talking to a listener or therapist
   (Chennai, by appointment, 9–6) is on the way.

## Safety

Every page footer: this isn't therapy; if you're in crisis or thinking of
harming yourself, call Tele-MANAS 14416 (free, 24/7) or SNEHA Chennai
044-2464 0050. If you're being hurt by a partner, call 181 (women's helpline).

## Builder's calls (Claude's, correctable)

- Name: **ListenHours** (from the project folder).
- English only in v1; Tamil later.
- Look: soft, calm palette, generous whitespace, one readable font, phone-first.
- Saved data: browser `localStorage` only, with a "clear my data" button.
- Payment: a Razorpay Payment Page or UPI link set in one config value —
  **the owner must supply the real link / UPI ID** before launch.
- Folder layout: `index.html`, one page per tool, `css/`, `js/`.

## Left to the builder

Exact quiz wording and scoring thresholds (balanced so each style is
reachable), page copy, and visual details.
