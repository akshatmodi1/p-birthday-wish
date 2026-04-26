# Birthday Site Design Spec — Purva

**Date:** 2026-04-26
**Tone:** Warm, celebratory, friendship-focused (not romantic)
**Deployment:** Netlify drag-and-drop (no backend, no build step)

---

## Overview

A single-page birthday surprise website for Purva. Premium aesthetic, pink and white theme, fully mobile-first. Three files: `index.html`, `style.css`, `script.js`. All content is placeholder — clearly marked with `<!-- EDIT: ... -->` comments for easy manual replacement.

---

## File Structure

```
p-birthday-site/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── images/        ← photo-1.jpg through photo-6.jpg (placeholders via picsum.photos)
│   ├── video/         ← birthday-video.mp4 (placeholder)
│   └── music/         ← background-music.mp3 (placeholder)
└── docs/
    └── superpowers/specs/
        └── 2026-04-26-birthday-site-design.md
```

---

## Visual Design System

| Token | Value |
|-------|-------|
| Background | `#FFF0F5` (lavender blush) |
| Primary pink | `#FF85A1` |
| Light pink accent | `#FFB6C1` |
| Surface (cards) | `#FFFFFF` |
| Body text | `#5C3D4E` (dark plum) |
| Hero gradient | `135deg, #FFE4EE → #FFF0F5 → #FFE9F3` slow animated drift |
| Glow | `box-shadow: 0 0 30px rgba(255,133,161,0.3)` |

**Fonts (Google Fonts CDN):**
- `Playfair Display` — hero name, section headings, message card
- `Poppins` — body text, buttons, captions

**Typography scale:**
- Hero name: 64px desktop / 42px mobile, Playfair Display
- Section headings: 36px desktop / 28px mobile
- Body: 16px Poppins

**Micro-interactions:**
- Buttons: `transform: scale(1.05)` on hover, pink glow on focus
- Photo cards: lift (`translateY(-6px)`) + glow on hover
- CTA button: subtle pulse animation at rest

---

## Sections

### 1. Hero
- Fullscreen (`100vh`), vertically centered content
- Animated gradient background (slow 8s keyframe drift)
- Floating particle dots (20–30 small circles, CSS + JS, gentle float upward)
- Heading: `"Happy Birthday, Purva! 🎉"` — Playfair Display, 64px
- Subtext: warm friendship placeholder (e.g. "Wishing you the most magical day — you deserve all of it!")
- CTA button: `"See Your Surprise 💖"` — smooth scrolls to gallery section
- Side nav dots (right edge, fixed): 7 dots, one per section, highlight on scroll

### 2. Photo Gallery
- 3-column CSS masonry grid (desktop), 2-col (tablet), 1-col (mobile)
- 6 placeholder image slots using `picsum.photos` URLs (easily replaced)
- Hover: zoom (`scale(1.07)`) + pink glow overlay
- Click: lightweight lightbox (pure JS, no library) — shows image fullscreen with close button
- Scroll-reveal: cards fade + slide up as they enter viewport (Intersection Observer)

### 3. Video
- Centered `<video>` element with `controls`, rounded corners, soft `box-shadow`
- Placeholder `src` pointing to `assets/video/birthday-video.mp4`
- YouTube embed option commented out directly below with instructions
- Responsive: `max-width: 800px`, `width: 100%`

### 4. Message Card
- Full-width card with `Playfair Display` quote styling
- Large decorative quote marks (`"`) in light pink
- Typewriter effect triggers after scroll-reveal — types out the message character by character
- Placeholder message: a warm, friendship-toned birthday note (~4 sentences)

### 5. Memories Timeline
- Alternating left/right cards (mobile: all left-aligned)
- 4 placeholder entries, each with: placeholder date, placeholder caption, placeholder image thumbnail
- Vertical line connecting cards, with a pink dot marker per entry
- Scroll-reveal: each card slides in from its side as it enters viewport

### 6. Surprise Animation
- Section heading: `"Send Some Love to the Universe ✨"`
- Large centered button: `"Spread the Love 💖"`
- On click:
  1. `canvas-confetti` burst (CDN, pink + white + gold colors)
  2. 30 star/heart SVG elements animate upward from button, fade out at top
- Button can be clicked multiple times (each click re-triggers)

### 7. Footer
- Centered, simple
- Text: `"Made with ❤️ just for you, Purva"`
- Soft pink top border

---

## Persistent UI Elements

| Element | Position | Behavior |
|---------|----------|----------|
| Music toggle button | Fixed, bottom-right | Animated pulse ring when playing; click toggles `assets/music/background-music.mp3`; icon swaps 🎵/🔇 |
| Side nav dots | Fixed, right edge | 7 dots; active dot grows + fills pink on scroll |

---

## Scroll Animations

All implemented via `IntersectionObserver` (no AOS or external library):
- Default: `opacity: 0; transform: translateY(30px)` → `opacity: 1; transform: translateY(0)` over `0.6s ease`
- Timeline cards: slide from left or right depending on alternating side
- Stagger delay on gallery grid items (100ms per item)

---

## Third-Party Dependencies (CDN only)

| Library | Purpose | Size |
|---------|---------|------|
| Google Fonts | Playfair Display + Poppins | ~50KB |
| canvas-confetti | Confetti burst | ~3KB |

No other external dependencies.

---

## Placeholder Conventions

Every piece of content that needs replacing is marked with an HTML comment:
```html
<!-- EDIT: Replace with your custom text -->
<!-- EDIT: Replace src with your photo path, e.g. assets/images/photo-1.jpg -->
<!-- EDIT: Replace with your video file path or YouTube embed URL -->
<!-- EDIT: Replace with your music file path -->
```

---

## Deployment

1. Drop the entire `p-birthday-site/` folder onto Netlify
2. No build settings needed — Netlify serves `index.html` as-is
3. All assets must be in the `assets/` subdirectory with matching filenames

---

## Out of Scope

- Any backend, form submission, or database
- Multi-page navigation
- User authentication
- CMS or admin panel
