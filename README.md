# Kodex 3D Book

Rotating 3D book scaffold — Next.js + React Three Fiber. The book uses your
front and back cover PNGs and generates a matching spine at runtime by sampling
the cover's gradient.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Files that matter

- `components/Book.tsx` — the book mesh, materials, drag/scroll interaction
- `components/BookCanvas.tsx` — R3F canvas, lighting, environment
- `components/SpineTexture.ts` — generates the spine from the front cover gradient + report metadata
- `public/textures/cover_front.png` and `cover_back.png` — your covers (drop-in replacements)

## Tweaks you'll likely want

- **Book proportions** in `Book.tsx`: `W`, `H`, `D` constants
- **Spine text/layout** in `SpineTexture.ts`
- **Auto-rotate speed** in `Book.tsx` (`targetRot.current += dt * 0.12`) — set to `0` to disable
- **Lighting** in `BookCanvas.tsx` — try `Environment preset="city" | "studio" | "warehouse"`

## Drop into the Kodex page

Copy `Book.tsx`, `BookCanvas.tsx`, `SpineTexture.ts` into your Kodex Next.js project,
and place your cover PNGs anywhere your project serves static assets. Update the
texture paths in `Book.tsx` and `SpineTexture.ts` accordingly.

The component is self-contained — no global state, no required props.
