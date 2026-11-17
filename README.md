# ListenHours

Free tools for people hurting in love (dating, partners, marriage, breakups), based on the ideas in *Attached* by Amir Levine and Rachel Heller. For Chennai. Everything is free; people pay whatever they can if it helped.

## Before you launch: set up payments

Open `js/config.js` and fill in **one** of:

- `razorpayUrl`: a Razorpay Payment Page link where the customer types the amount, or
- `upiId`: your UPI ID (e.g. `yourname@okhdfcbank`). The visitor's UPI app opens with no amount filled in.

Until one is set, the "Did this help?" box says payments are being set up.

## Run it on your computer

```
npm start        # then open http://localhost:5173
npm test         # unit tests for scoring and tools
```

Needs Node 18 or newer. No packages to install.

## Put it online (free)

It's a plain static site. Upload the folder to Netlify, Cloudflare Pages, or GitHub Pages. You don't need to upload `tests/`, `docs/`, `.preview/`, `serve.js`, or `package.json`.

## What's where

- Pages: `index.html` (home), `my-style.html`, `partner-style.html`, `inventory.html`, `practice.html`, `role-model.html`, `say-it.html`, `conflict.html`, `dating.html`, `breakup.html`, `privacy.html` (privacy, clear data, about)
- `js/lib/`: quiz content, scoring, and shared layout (tested)
- `js/pages/`: the code behind each page
- `css/style.css`: the look (premium night theme)
- `.preview/`: local test pages only (phone-width preview, click-through smoke test)

Private answers are kept only in the visitor's browser (`localStorage`). Nothing is sent anywhere.
