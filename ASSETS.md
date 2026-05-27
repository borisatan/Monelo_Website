# Monora Website — Asset Checklist

## ✅ Already Have

| File | Used for |
|---|---|
| `public/assets/Logo.png` | Header logo, footer logo, browser tab favicon, OG social preview |
| `public/assets/AddTrans1.png` | Step 01 phone mockup — "Log a transaction" screen |
| `public/assets/Budget1.png` | Step 02 phone mockup — "Budget overview" screen |

---

## ❌ Broken — Fix First

### Hero video filename mismatch
The code references `AddTransDemo.mp4` but the file on disk is `monelo.mp4`.

**Fix:** Rename the file:
```
public/assets/monelo.mp4  →  public/assets/AddTransDemo.mp4
```

This is the autoplay looping video in the phone mockup at the top of the page. Without it, the hero section is blank.

---

## 📋 Required Assets

| # | File | What it is | Specs |
|---|---|---|---|
| 1 | `public/assets/AddTransDemo.mp4` | **Hero video** — looping screen recording of adding a transaction in the app | Portrait, ~9:19.5 ratio (iPhone screen), 10–20s loop, under 5MB |
| 2 | `public/assets/AddTrans1.png` | **Step 01 screenshot** — the "add transaction" screen | Portrait iPhone screenshot, ~390×844px |
| 3 | `public/assets/Budget1.png` | **Step 02 screenshot** — the budget/overview screen | Portrait iPhone screenshot, ~390×844px |
| 4 | `public/assets/Logo.png` | **App icon / logo** | 512×512px square, transparent or dark background |

---

## 💡 Optional but Recommended

### Social share preview image
Currently the OG/Twitter image is just `Logo.png` (a small square). A proper banner looks much better in link previews on Twitter, iMessage, and Slack.

| # | File | Specs |
|---|---|---|
| 5 | `public/assets/og-image.png` | 1200×630px, shows app name + a screenshot or tagline |

Once created, update these two lines in `index.html`:
```html
<meta property="og:image" content="https://monora.com/assets/og-image.png" />
<meta property="twitter:image" content="https://monora.com/assets/og-image.png" />
```

---

## 🔧 Non-Asset TODOs

| # | What | Where |
|---|---|---|
| 6 | **App Store URL** — replace `'#'` with your real App Store link | `src/App.jsx` line 4: `const APP_STORE_URL = '#'` |
