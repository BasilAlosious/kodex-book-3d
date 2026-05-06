# Kodex Design System

This document captures the visual language, tokens, typography, and component patterns used to build the Kodex ROI Report landing page. It's the source of truth for anyone extending this codebase or porting it to another property.

All values here are pulled directly from the official Kodex design reference (style guide, typography spec, card system) plus the report cover artwork.

---

## 1. Brand Colors

### Primary palette

| Role | Token | Hex | RGB | HSL |
|---|---|---|---|---|
| Primary | `--primary` | `#000040` | `rgb(0, 0, 64)` | `hsl(240, 100%, 13%)` |
| Secondary | `--secondary` | `#893c47` | `rgb(137, 60, 71)` | `hsl(351, 39%, 39%)` |

**Primary** is used for: headings, primary buttons, eyebrow icons, focus rings, the logo wordmark, anywhere a hard accent is needed.

**Secondary** is used for: card backgrounds, atmospheric glows, accent dividers. Never for body text.

### Background system

| Role | Hex | Use |
|---|---|---|
| BG Gradient 2 | `#eaeef7` | Default page background base (lavender wash) |
| Background neutral | `#e7e7e7` | Subtle gray for product shots, shelves, secondary surfaces |
| Card background blue | `#2b57ac` | Solid card variant |
| Card background red | `#893c47` | Solid card variant (same as secondary) |
| Background Glow Red | radial of `#893c47` at low alpha | Atmospheric accent on white surfaces |
| White | `#ffffff` | Base for cards, form surfaces, content blocks |

### Text colors

| Role | Token | Value |
|---|---|---|
| Heading | `--text-heading` | `#000040` (matches primary) |
| Body / paragraph | `--text-body` | `rgba(0, 0, 0, 0.85)` |
| Muted / secondary | `--text-mute` | `rgba(0, 0, 0, 0.55)` |

Notice paragraph text uses near-black with 85% alpha (warmer, less harsh than pure navy). Headings use solid navy. This creates intentional contrast between display and reading copy.

### Hairlines

| Role | Token | Value |
|---|---|---|
| Border / rule | `--line` | `rgba(0, 0, 64, 0.10)` |

A 10% navy hairline is used for all dividers, form borders, and section rules. Never a pure gray — the navy tint keeps surfaces feeling cohesive.

---

## 2. Page Backgrounds

The default page background is built from layered radial blooms over the lavender base. This creates atmospheric depth without overpowering content.

```css
.page-bg {
  background:
    radial-gradient(ellipse 60% 50% at 90% 10%,
      rgba(137, 60, 71, 0.10) 0%, transparent 70%),
    radial-gradient(ellipse 70% 60% at 10% 0%,
      rgba(43, 87, 172, 0.08) 0%, transparent 65%),
    linear-gradient(180deg, #eaeef7 0%, #ffffff 80%);
}
```

Three layers, top to bottom:
1. **Maroon glow** in the top-right at 10% opacity (uses the secondary)
2. **Blue glow** in the top-left at 8% opacity (uses card-blue)
3. **Vertical fade** from BG Gradient 2 lavender to white over the top 80% of the page

Both glows fall off by 65–70% radius — they should feel like ambient light, not visible shapes. The radial-gradient sizes (60%, 70%) and positions (10%, 90%) are tuned so the glows kiss the corners without dominating the layout.

---

## 3. Typography

### Font families

| Family | Role | Weights used |
|---|---|---|
| **Nomixa** | Primary — display, headings, labels | 400 Regular, 500 Medium, 600 SemiBold |
| **General Sans** | Secondary — body, paragraphs, UI | 300 Light, 400 Regular, 500 Medium |

Both fonts are local OTF files in `/public/fonts/`. Loaded via `@font-face` with `font-display: swap`.

```css
@font-face {
  font-family: 'Nomixa';
  font-weight: 500;
  src: url('/fonts/Nomixa-Medium.otf') format('opentype');
}
```

### Type scale

All scales below are from the official Kodex typography reference. Tracking is `0%` (no letter-spacing) unless specified.

#### Display (Nomixa)

| Style | Size | Line height | Weights |
|---|---|---|---|
| Display 2XL (H1) | 64px | 72 | Regular, Medium, SemiBold, Bold |
| Display XL (H2) | 48px | 64 | Regular, Medium, SemiBold, Light |
| Display L (Cards H1) | 28px | 38 | Regular, Medium, SemiBold, Bold |

#### Paragraph (General Sans)

| Style | Size | Line height | Weights |
|---|---|---|---|
| Paragraph Large | 26px | 35 | Regular, Medium, SemiBold, Bold |
| Paragraph Medium | 22px | 27 | Regular, Medium, SemiBold, Bold |
| Paragraph Small | 18px | 24 | Regular, Medium, SemiBold, Bold |
| Paragraph XS | 16px | 22 | Regular, Medium, SemiBold, Bold |

#### CTA

| Style | Size | Line height | Family |
|---|---|---|---|
| CTA Large | 26px | 29 | General Sans |
| CTA Small | 18px | 29 | Nomixa |

### Practical usage in this project

| Element | Spec | CSS |
|---|---|---|
| H1 | Nomixa Medium 48px / 1.125 line-height | `font: 500 48px/1.125 'Nomixa'` |
| Subtitle | Nomixa Regular ~22px | `font: 400 22px/1.35 'Nomixa'` |
| Section label | Nomixa Medium 14px uppercase | `font: 500 14px/1 'Nomixa'; text-transform: uppercase; letter-spacing: 0.04em` |
| Body | General Sans Regular 16–17px | `font: 400 17px/1.65 'General Sans'` |
| Form label | General Sans Medium 12px | `font: 500 12px/1 'General Sans'` |
| Form input | General Sans Regular 14px | `font: 400 14px/1 'General Sans'` |
| Button | General Sans Medium 15px | `font: 500 15px/1 'General Sans'` |

---

## 4. Logo & Brand Mark

### Wordmark
The Kodex wordmark is a stylized "KODEX" plus a small triangular K-monogram. The geometric K is built from three triangles forming an arrow shape.

- **File**: `/public/textures/kodex-logo.svg` (SVG with embedded PNG mask, viewBox `0 0 68 16`)
- **Color**: `#102A55` (a slightly lighter navy than `--primary`; the SVG is colored at design time)
- **Aspect ratio**: 68:16 ≈ 4.25:1 — always preserve

The wordmark also appears on:
- The 3D book's spine (rendered to a Canvas texture at runtime)
- The book's front and back covers (already baked into the cover artwork)

### Repeating monogram pattern
The brand uses a 4×4 grid of the K-monogram as a textural element on showcase pages — dark navy `#000040` on white. Decorative only; not used in this landing page but available for future sections.

---

## 5. Cards

The signature Kodex card has a stepped notch at the top-left and bottom-right corners. This is the brand's most distinctive structural element.

### The notch

Three "steps" of equal size, forming a pixelated diagonal cut through each corner. Implementation via CSS `clip-path` with a `--n` variable for the step size.

```css
.kodex-card {
  --n: 12px;
  clip-path: polygon(
    /* top-left stepped notch */
    calc(var(--n) * 3) 0,
    100% 0,
    100% calc(100% - var(--n) * 3),
    /* bottom-right stepped notch */
    calc(100% - var(--n)) calc(100% - var(--n) * 3),
    calc(100% - var(--n)) calc(100% - var(--n) * 2),
    calc(100% - var(--n) * 2) calc(100% - var(--n) * 2),
    calc(100% - var(--n) * 2) calc(100% - var(--n)),
    calc(100% - var(--n) * 3) calc(100% - var(--n)),
    calc(100% - var(--n) * 3) 100%,
    0 100%,
    0 calc(var(--n) * 3),
    var(--n) calc(var(--n) * 3),
    var(--n) calc(var(--n) * 2),
    calc(var(--n) * 2) calc(var(--n) * 2),
    calc(var(--n) * 2) var(--n),
    calc(var(--n) * 3) var(--n),
    calc(var(--n) * 3) 0
  );
}
```

**Tuning the notch**:
- Default `--n: 12px` — three 12px steps = 36px total notch depth
- Mobile: `--n: 8px` — three 8px steps = 24px (less pronounced on small surfaces)
- Hero/large cards: `--n: 16px` for more visual presence

### Card variants

| Variant | Background | Text color | Use |
|---|---|---|---|
| Light | `#ffffff` with `1px solid var(--line)` | `#000040` heading, `var(--text-body)` body | Forms, content blocks |
| Blue | `#2b57ac` | `#ffffff` | Numbered feature cards, "01 — Compliance Liability"-style |
| Red | `#893c47` | `#ffffff` | Alternate feature cards, callouts |

### Corner accessories

Cards typically include two corner accessories:

| Position | Element | Style |
|---|---|---|
| Top-left or top-right | The Kodex K-monogram | Small, ~24×24px, low opacity if on dark card |
| Top-right (alternative) | Index tag e.g. `01 / REPORT` | Nomixa Medium 12px, uppercase, `--text-mute` |
| Bottom-right | A number reference e.g. `4` | Nomixa Medium ~14px, lives inside the notch |

The numbered tags reference a system index — they're not just decoration. Don't strip them when porting components.

---

## 6. Buttons

### Primary
- **Background**: `var(--primary)` `#000040`
- **Text**: `#ffffff`
- **Padding**: `14px 18px`
- **Border-radius**: `8px` (slightly rounded, not pill)
- **Font**: General Sans Medium 15px
- **Hover**: lighten to `#1a1a5a`
- **Active**: `transform: translateY(1px)` for tactile feedback

```css
button.submit {
  background: var(--primary);
  color: #fff;
  padding: 14px 18px;
  border-radius: 8px;
  font: 500 15px 'General Sans';
}
```

### Pill (utility)
For navigation CTAs and lighter contexts:
- Same fill but `border-radius: 999px` (full pill)
- Smaller padding: `9–10px 16–18px`
- Smaller text: 14px

### Link with arrow
For inline content navigation:
- No background, underlined text
- Color: `var(--primary)`
- Trailing `→` arrow with a small gap
- Variant: double-arrow `→ →` for "see more" links (Kodex idiom)

---

## 7. Form Patterns

### Card container
The form lives inside a notched-corner card (see [Section 5](#5-cards)).

```
┌─[notch]──────────────────────────┐ ← stepped notch top-left
│                       01 / REPORT │ ← index tag top-right
│                                    │
│   Tell us about your program.      │ ← Nomixa Medium ~22px
│                                    │
│   Field label                      │ ← General Sans Medium 12px
│   [____________________________]   │ ← input
│                                    │
│   ...                              │
│                                    │
│   [☐] consent text                 │
│                                    │
│   [   Run my numbers   ]           │ ← navy submit button
│                                    │
│   ✓ trust  ✓ trust  ✓ trust        │ ← microcopy row
│                                ↘   │ ← stepped notch bottom-right
└────────────────────────────────────┘
```

### Field anatomy
- **Label**: General Sans Medium 12px, `var(--text-body)`, `margin-bottom: 6px`
- **Input**: General Sans Regular 14px, `1px solid var(--line)`, `border-radius: 6px`, `padding: 11px 13px`
- **Focus state**: border switches to `var(--primary)`, with `box-shadow: 0 0 0 3px rgba(0, 0, 64, 0.10)` ring
- **Helper text**: General Sans Regular 11px, `var(--text-mute)`, `margin-top: 4px`

### Two-column field rows
For paired fields (first/last name):
```css
.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
```
Collapses to single column at 640px breakpoint.

### Consent / privacy line
- Smaller text (12px)
- `var(--text-mute)` color
- Privacy Policy link in `var(--primary)` with subtle underline (`text-underline-offset: 2px`)
- First-person voice ("I'd like to receive...") rather than coercive ("By checking this box, you agree...")

### Trust microcopy
A row of small check items below the submit button:
- General Sans Regular 12px
- `var(--text-mute)`
- Each item: 14px tick icon + space + label
- Common labels: "Specific to your numbers", "No sales call", "Within 24 hours"

---

## 8. Layout

### Two-column hero (desktop ≥ 1024px)
- Max width: `1280px` centered
- Padding: `72px 32px 96px`
- Grid: `minmax(0, 1.1fr) minmax(0, 1fr)` with `80px` gap
- Right column is `position: sticky; top: 32px` so the book + form stay in view as the left column scrolls
- Both columns `align-items: start` so they begin at the same Y

### Tablet (≤ 1024px)
- Single column, max-width 640px
- Right column reorders to top (`order: -1`) so the book is the first thing seen
- Sticky positioning released

### Phone (≤ 640px)
- Padding `40px 18px`
- H1 clamps down to 28–38px
- Findings list tightens (smaller icons, less gap)
- Book stage: aspect ratio 4/4, max-width 360px
- Notch corners scale to `--n: 8px`
- Name fields stack vertically

### Tiny phone (≤ 380px)
- Even tighter padding
- Trust microcopy hides to save vertical space

---

## 9. Iconography

Used in the page:
- **Document icon** for the Report eyebrow
- **Search icon** for the "Where your team's hours are going" finding
- **Dollar / coin icon** for the "Cost recovery" finding
- **Trend / chart icon** for the "3-year projection" finding
- **Tick / checkmark** for trust microcopy

All icons follow these rules:
- 24×24 viewBox (or 14×14 for small contexts)
- `stroke-width: 1.6` for line icons
- `stroke-linecap: round`, `stroke-linejoin: round`
- Color set via `currentColor` so they inherit text color
- No fills — purely line work, matches the editorial feel of Nomixa

---

## 10. The 3D Book

A custom React Three Fiber scene rendering a hardcover book with the report's cover artwork.

### Construction
Four meshes form a real hardcover:
1. **Front cover board** — full size, thin (`0.014` thick), carries front cover artwork
2. **Back cover board** — same, with back cover artwork
3. **Spine cloth** — sandwiched between the two boards, slightly inset in Z so the boards visibly cap it. Carries the runtime-generated spine texture (Kodex logomark + CLOC 2026)
4. **Page block** — smaller in W and H by `OVERHANG = 0.020`, recessed inside the cover. Procedurally striated cream texture simulates 420 paper page edges

Cover overhang on top, bottom, and fore-edge gives the book the premium "framed page block" look of a real hardcover.

### Materials
- **Cover (front/back)**: `MeshPhysicalMaterial` with the cover image as both `map` and `emissiveMap`. The emissive map at `intensity 0.28` keeps the print colors saturated even under environment lighting (this is the Stripe Press product-render technique)
- **Spine**: `MeshPhysicalMaterial` with a Canvas-generated texture
- **Page edges**: striated cream texture, generated procedurally
- **Cover edges / liners**: solid colors derived from the gradient

### Lighting
- `Environment preset="apartment"` HDR with `environmentIntensity: 0.6` (knocked back so cover colors stay saturated)
- One directional light from the front-right
- One subtle directional light from the back-left for rim
- Hemisphere fill light at low intensity

### Tone mapping
- `ACESFilmicToneMapping` with `toneMappingExposure: 1.15`
- `outputColorSpace: SRGBColorSpace`

### Default pose & interaction
- Book rests at `rotation.y = -0.45` (slight turn revealing the spine on the left)
- `rotation.x = -0.13` (gentle forward tilt so the top edge is visible)
- Auto-rotates around Y at `0.12 rad/sec` (full turn ~52 seconds)
- Drag to rotate manually; releasing returns to auto-rotation

---

## 11. Implementation: CSS variables

For any new component or page, start by defining these tokens. Everything else cascades from them:

```css
:root {
  /* Brand */
  --primary:      #000040;
  --secondary:    #893c47;
  --card-blue:    #2b57ac;

  /* Surfaces */
  --bg-page:      #eaeef7;
  --bg-soft:      #e7e7e7;

  /* Text */
  --text-heading: #000040;
  --text-body:    rgba(0, 0, 0, 0.85);
  --text-mute:    rgba(0, 0, 0, 0.55);

  /* Lines */
  --line:         rgba(0, 0, 64, 0.10);
}
```

---

## 12. Voice & Tone

The visual system is editorial and quiet — the copy should match. Reference points:

- **Direct over clever** — say what the thing is, not a metaphor for it
- **Specific over vague** — "Annual lawful data requests" beats "your workflow"
- **First-person consent** — "I'd like to receive updates" not "By checking this box, you agree"
- **No em dashes** — use commas or full stops instead (Kodex preference)
- **No exclamation points** — the system is calm by design
- **Short sentences over long ones** — leave room for the typography to do the work

The 3D book is dramatic. The copy shouldn't compete with it.

---

## 13. Don't

A few things to avoid that break the system:

- ❌ Pure gray (`#cccccc`-style) for hairlines — always tint with navy
- ❌ Drop shadows on cards — the notch + hairline does the work
- ❌ Rounded corners larger than `12px` — the system reads as crisp, not soft
- ❌ Gradients that mix outside the brand palette — stay within navy/maroon/blue/lavender
- ❌ Sans-serifs other than Nomixa or General Sans — even similar ones will look off
- ❌ "Click here" or "Submit" CTAs — always use action verbs ("Run my numbers", "Get the report")
- ❌ Bright accent colors (lime, yellow, neon) — Kodex is restrained
- ❌ Stock photography in hero positions — use the 3D book or commissioned illustration

---

## File reference

| Path | Purpose |
|---|---|
| `app/globals.css` | All design tokens + component styles |
| `app/page.tsx` | Page composition |
| `components/Book.tsx` | 3D book mesh + interaction |
| `components/BookCanvas.tsx` | R3F canvas + lighting |
| `components/SpineTexture.ts` | Runtime-generated spine texture |
| `components/PageEdgeTexture.ts` | Runtime-generated page edge striations |
| `public/fonts/` | Nomixa + General Sans OTF files |
| `public/textures/cover_front.png` | Front cover artwork |
| `public/textures/cover_back.png` | Back cover artwork |
| `public/textures/kodex-logo.svg` | Wordmark |

---

*This document is the design system for the Kodex ROI Report landing page. Treat it as a living reference — when adding new components, update the relevant section so future work stays cohesive.*
