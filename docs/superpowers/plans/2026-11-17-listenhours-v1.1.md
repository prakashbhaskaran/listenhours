# ListenHours v1.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use checkbox syntax.

**Goal:** Add four "become more secure" tools. **Architecture/stack:** same as v1 (static pages, pure logic in `js/lib/`, `node --test`). **Spec:** `docs/superpowers/specs/2026-11-17-listenhours-design.md` (v1.1 section).

## Global Constraints
Same as v1. All wording and scenarios original. Nothing leaves the device.

## Review Focus
1. Practice dates use the visitor's local day, not UTC (late-night IST entries land on the right day).
2. Saving a second check-in on the same day replaces, not duplicates.
3. Streak counts from today or yesterday; a gap breaks it.
4. Role model with empty name is not saved; pages without one show no empty "Think of :" line.
5. Workshop answers before revealing don't crash on unknown ids.

### Task 1: Conflict (`js/lib/conflict.js`, `conflict.html`, `js/pages/conflict.js`, `tests/conflict.test.js`)
Interfaces: `CONFLICT_PRINCIPLES` (5 {title,text}), `AVOID_TACTICS` (6), `FIGHT_TRUTHS` (6), `SCENARIOS` ({id,text,question,answer:"secure"|"insecure",why,better}[] ≥6, both answers present), `gradeAnswer(id, choice) -> {correct:boolean, answer, why, better} | null`, `workshopScore(answers: Record<id,choice>) -> {correct,total}`.
- [ ] tests → RED → implement → GREEN; page.

### Task 2: Role model (`js/lib/roleModel.js`, `role-model.html`, `js/pages/role-model.js`, `tests/roleModel.test.js`)
Interfaces: `ROLE_PROMPTS` ({key,label,hint}[]), `SECURE_TRAITS` (string[]), `normalizeRoleModel(input) -> {name, notes:Record<key,string>, traits:string[]} | null` (null if name blank; trims; keeps only known traits), `roleModelLine(rm, situation) -> string` ("" if no rm). Stored `lh.roleModel`. Consumed by inventory.js and say-it.js.
- [ ] tests → RED → implement → GREEN; page; wire into Look back and Say it well.

### Task 3: Dating (`js/lib/dating.js`, `dating.html`, `js/pages/dating.js`, `tests/dating.test.js`)
Interfaces: `DATING_STEPS` (5 {title,text}), `ALARM_SIGNS`, `CALM_SIGNS`, `loveOrAlarm(alarm, calm) -> "unanswered"|"alarm"|"calm"|"mixed"`; reuses `SMOKING_GUNS` from partnerQuiz.
- [ ] tests → RED → implement → GREEN; page.

### Task 4: Daily practice (`js/lib/practice.js`, `practice.html`, `js/pages/practice.js`, `tests/practice.test.js`)
Interfaces: `localDay(date) -> "YYYY-MM-DD"` (local time), `PRACTICE_FORMS[style]` (fields per anxious/avoidant/secure/anxious-avoidant), `upsertEntry(list, entry) -> list` (by `day`, sorted ascending), `streak(list, today) -> number`, `lastDays(list, today, n) -> {day, done, win}[]` oldest→newest, `isWin(entry) -> boolean` (did = "said" or "waited" or "stayed"). Stored `lh.practice`.
- [ ] tests → RED → implement → GREEN; page.

### Task 5: Navigation, home hub, cross-links, verify, push on request
- [ ] Header 6 links; home grouped list; my-style result links to practice + role model.
- [ ] npm test, smoke test extended, screenshots phone/desktop.
