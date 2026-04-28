# HW4 — PWA Explorer

## Files Included
```
hw4/
├── index.html          ← Main page (heading, 2+ paragraphs, dropdown, name input)
├── style.css           ← External CSS with @media queries (no frameworks)
├── app.js              ← Background selector + Local Storage name + SW registration
├── manifest.json       ← Web App Manifest (makes app installable)
├── service-worker.js   ← Caches all assets for offline use
├── README.md           ← This file
├── images/
│   ├── bg-blue.jpg     ← ⚠️  ADD your light blue image from hw4 folder here
│   └── bg-gold.jpg     ← ⚠️  ADD your light gold image from hw4 folder here
└── icons/
    ├── icon-72x72.png
    ├── icon-128x128.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    └── icon-512x512.png  ← ⚠️  ADD your resized icons here (see below)
```

---

## Steps to Complete Setup

### 1. Add Background Images
Copy the two images from your hw4 assignment folder into the `images/` subfolder:
- Rename your **light blue** image → `lightblue.jpg`
- Rename your **light gold** image → `lightgold.jpg`

### 2. Create & Resize Icons
Pick a nice icon image (PNG with transparent background works best).
Use an image editor (Photoshop, GIMP, Canva, or an online tool like [Favicon.io](https://favicon.io/)) to export it at **all 8 sizes** listed above, and place them in the `icons/` folder.

### 3. Serve Over HTTPS (Required for PWA Install Prompt)
Service Workers only run on HTTPS (or localhost for development).

**Local development:**
```bash
# Using Python's built-in server
python3 -m http.server 8080
# Then open: http://localhost:8080/Homework_4/
```

**Or use VS Code's Live Server extension** — right-click `index.html` → "Open with Live Server".

### 4. Verify the Service Worker
Open Chrome DevTools → Application → Service Workers. You should see `service-worker.js` registered and active.

### 5. Test Offline Mode
DevTools → Application → Service Workers → check "Offline", then reload the page. The app — including background image changes — should still work.

### 6. Test Install Prompt
In Chrome, open the page, click the ⋮ menu → you should see "Install PWA Explorer…" (or a download icon in the address bar).

---

## Features Summary

| Feature | Implementation |
|---|---|
| Heading | `<h1>` in `index.html` |
| 2+ Paragraphs about PWA | Two `<section class="card">` blocks |
| Background dropdown | `<select>` + `<button>` in `index.html` |
| External CSS | `style.css` with `@media` queries |
| No CSS framework | Pure CSS only |
| Responsive (mobile-first) | `@media (max-width: 599px)` + `@media (max-width: 899px)` |
| Web App Manifest | `manifest.json` with 8 icon sizes |
| Service Worker (offline) | `service-worker.js` — caches HTML, CSS, JS, images, icons |
| Local Storage name (extra credit) | Input on blur: reads/writes `localStorage.getItem('name')` |
