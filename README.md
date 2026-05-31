# Shot on iPhone in B&W — Portfolio

A minimal, cinematic black-and-white photography portfolio built with React and React Router.
Inspired by [shotoniphone.lorenzobocchi.com](https://shotoniphone.lorenzobocchi.com).

---

## Project Structure

```
bw-portfolio/
├── public/
│   └── index.html
├── src/
│   ├── data/
│   │   └── photos.js          ← All photo data + route definitions
│   ├── hooks/
│   │   └── useLightbox.js     ← Keyboard nav hook (Esc / ← / →)
│   ├── styles/
│   │   └── globals.css        ← Design tokens, reset, utilities
│   ├── components/
│   │   ├── Navbar.jsx / .css  ← Fixed nav with route-aware view tabs
│   │   ├── Hero.jsx / .css    ← Full-viewport cinematic opener
│   │   ├── Marquee.jsx / .css ← Infinite-scroll keyword strip
│   │   ├── About.jsx / .css   ← Editorial project description
│   │   ├── GalleryHeader.jsx / .css  ← Reusable header strip per view
│   │   ├── Lightbox.jsx / .css       ← Full-screen photo overlay
│   │   └── Footer.jsx / .css
│   ├── views/                 ← One file per gallery route
│   │   ├── FlowView.jsx / .css   →  /flow  (vertical scroll)
│   │   ├── GridView.jsx / .css   →  /grid  (square mosaic)
│   │   └── MapView.jsx / .css    →  /map   (index list)
│   ├── App.jsx                ← Router + lightbox state (single source of truth)
│   ├── App.css
│   └── index.jsx              ← Entry point
└── package.json
```

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm start

# 3. Open http://localhost:3000
```

---

## Routing

All routes are declared in `src/App.jsx`:

| Path    | Component  | Description              |
|---------|------------|--------------------------|
| `/`     | —          | Redirects to `/flow`     |
| `/flow` | FlowView   | Full-width vertical scroll |
| `/grid` | GridView   | Responsive square mosaic |
| `/map`  | MapView    | Index list with EXIF tags |

---

## Customising Your Photos

Edit `src/data/photos.js` — each photo object accepts:

```js
{
  id:       1,
  src:      "https://...",   // Image URL (Unsplash, Supabase, etc.)
  location: "Tokyo, Japan",
  date:     "Mar 2024",
  camera:   "iPhone 15 Pro",
  aperture: "f/1.78",
  shutter:  "1/800s",
  iso:      "ISO 50",
  aspect:   "tall",          // 'tall' | 'wide' | 'square' (affects FlowView height)
}
```

---

## Design Tokens

All visual variables live in `src/styles/globals.css`:

```css
--bg:         #0a0a0a;   /* page background          */
--fg:         #f0ede8;   /* primary text              */
--fg-muted:   #6b6b6b;   /* secondary / labels        */
--accent:     #c8b89a;   /* italic highlight colour   */
--border:     rgba(255,255,255,0.08);
--font-serif: 'DM Serif Display';
--font-mono:  'DM Mono';
```
