# Color

The decided color identity — the creative source the primitive and semantic color layers later
transcribe. This is where the system's recognizable identity lives, alongside typography and layout.

Each decision lists the **decided value(s)** and a one-line **why**. Hex values are literal on
purpose: identity is where raw values are chosen; later layers only reference them.

## Direction

- **Mood:** muted / desaturated — colors are toned down, never neon.
  _Why: restrained color reads as modern and confident without shouting._
- **Contrast:** softer / lower-contrast — text and borders sit a notch off pure black/white.
  _Why: easier on the eye and matches the calm, premium feel._
- **Neutrals:** cool gray — subtly tinted toward the primary blue (hue ~220°, very low saturation),
  not pure gray.
  _Why: a cool neutral harmonizes with the blue/teal accents so the whole UI shares one temperature._
- **Canvas:** off-white in light, off-black in dark — never pure `#ffffff` / `#000000`.
  _Why: softens glare and gives surfaces somewhere to sit._
- **Light & dark are equal first-class** — neither is an afterthought. The ramps here are
  theme-agnostic; how each theme maps onto them is authored later in `semantics/` (P3).
  _Why: every consuming app ships both themes from day one._

## Palette roles

| Role | Hue | Notes |
| -- | -- | -- |
| Primary | Blue | Main brand color; also serves the **info** role |
| Secondary | Teal | Supporting brand accent |
| Success | Green | Positive / confirm state |
| Warning | Yellow | Caution state |
| Error | Red | Destructive / failure state |
| Info | Blue | **Reuses Primary** (no separate hue) |
| Accent — Purple | Purple | Tiny/occasional usages only |
| Accent — Pink | Pink | Tiny/occasional usages only |

_Why: a small, deliberate role set keeps the system coherent; purple/pink stay incidental so they
never compete with the blue/teal identity._

## Brand

### Primary — Blue

| Step | Hex |
| -- | -- |
| 50 | `#f4f6fa` |
| 100 | `#dee1e7` |
| 200 | `#c9cdd5` |
| 300 | `#b4b9c3` |
| 400 | `#9fa6b1` |
| 500 | `#8b92a0` |
| 600 | `#78808e` |
| 700 | `#656d7d` |
| 800 | `#525c6d` |
| 900 | `#404b5d` |
| 950 | `#2f3a4d` |

_Why: a muted slate-blue — trustworthy and modern, desaturated so it stays calm._

### Secondary — Teal

| Step | Hex |
| -- | -- |
| 50 | `#f1f7f7` |
| 100 | `#dbe2e2` |
| 200 | `#c5cece` |
| 300 | `#b0baba` |
| 400 | `#9ba6a6` |
| 500 | `#879393` |
| 600 | `#738080` |
| 700 | `#5f6e6e` |
| 800 | `#4d5c5d` |
| 900 | `#3a4b4b` |
| 950 | `#293a3b` |

_Why: a muted teal pairs with the blue without clashing — supporting, not competing._

## State colors

### Success — Green

| Step | Hex |
| -- | -- |
| 50 | `#f3f7f1` |
| 100 | `#dde2da` |
| 200 | `#c7cec4` |
| 300 | `#b1baae` |
| 400 | `#9ca698` |
| 500 | `#889384` |
| 600 | `#74806f` |
| 700 | `#606e5c` |
| 800 | `#4d5c49` |
| 900 | `#3b4b36` |
| 950 | `#293a25` |

_Why: a soft, earthy green — clearly "good" without a vivid alert-green glare._

### Warning — Yellow

| Step | Hex |
| -- | -- |
| 50 | `#faf8f0` |
| 100 | `#e7e4da` |
| 200 | `#d4d0c4` |
| 300 | `#c2bdae` |
| 400 | `#b1aa99` |
| 500 | `#9f9785` |
| 600 | `#8e8571` |
| 700 | `#7e735d` |
| 800 | `#6e614a` |
| 900 | `#5e5038` |
| 950 | `#4f3f26` |

_Why: a muted gold rather than a bright yellow — caution that stays legible on light surfaces._

### Error — Red

| Step | Hex |
| -- | -- |
| 50 | `#faf4f3` |
| 100 | `#e9dedc` |
| 200 | `#d7c8c6` |
| 300 | `#c6b3b1` |
| 400 | `#b59f9b` |
| 500 | `#a48a87` |
| 600 | `#947673` |
| 700 | `#83635f` |
| 800 | `#73504c` |
| 900 | `#633e3a` |
| 950 | `#532c29` |

_Why: a desaturated brick-red — serious and clear without feeling aggressive._

### Info — Blue

- **Reuses the Primary blue ramp** — no separate hue.
  _Why: informational and brand voices are the same here — fewer colors, more coherence._

## Additional accents (tiny usages)

### Purple

| Step | Hex |
| -- | -- |
| 50 | `#f6f4fa` |
| 100 | `#e1dee7` |
| 200 | `#cdc9d5` |
| 300 | `#b9b4c2` |
| 400 | `#a5a0b0` |
| 500 | `#928c9f` |
| 600 | `#7f788d` |
| 700 | `#6d657c` |
| 800 | `#5c536b` |
| 900 | `#4a415b` |
| 950 | `#3a304b` |

### Pink

| Step | Hex |
| -- | -- |
| 50 | `#faf3f6` |
| 100 | `#e8dde1` |
| 200 | `#d5c7cd` |
| 300 | `#c3b2b9` |
| 400 | `#b29da6` |
| 500 | `#a08992` |
| 600 | `#8f757f` |
| 700 | `#7e626d` |
| 800 | `#6e4f5b` |
| 900 | `#5d3d4a` |
| 950 | `#4d2b39` |

_Why: purple and pink exist for small, occasional moments (tags, illustrations, charts); kept muted
so they never read as a second brand color._

## Neutrals — cool gray

Subtly tinted toward the primary blue (hue ~220°, very low saturation: `B > G > R`). The tint is
fuller through the mids and tapers at the light/dark ends; the pure-white `0` and pure-black `1000`
anchors stay untinted.

| Step | Hex |
| -- | -- |
| 0 | `#ffffff` |
| 50 | `#f5f6f9` |
| 100 | `#eaecf0` |
| 200 | `#d5d8de` |
| 300 | `#bbbec5` |
| 400 | `#9498a0` |
| 500 | `#6f727a` |
| 600 | `#565960` |
| 700 | `#3d4044` |
| 800 | `#282a2e` |
| 900 | `#181a1d` |
| 950 | `#0b0c0f` |
| 1000 | `#000000` |

_Why: a barely-there cool tint keeps the neutrals reading as gray while quietly aligning them with
the brand temperature, so the whole UI shares one cool key._

## Gradients

- **Blue–teal family only** — gradients stay inside the blue/teal corner of the palette: either one
  hue across two steps, or blue→teal at a matched step. Never any other hue.
  _Why: blue and teal are analogous, so they blend cleanly with no muddy midpoint; staying in-family
  keeps gradients quiet and on-brand instead of rainbow-like._
- **Stops are 2 steps apart** for the single-hue sets, and **matched-level** for the blue–teal set.
  _Why: a 2-step span reads as subtle depth, not a glossy sweep; matched levels keep the blend even._
- **Default direction:** `135°` — top-left → bottom-right.
  _Why: one consistent diagonal across the system; components may override only when needed._

### Blue (single-hue) — 4 gradients

| Gradient | Stops |
| -- | -- |
| Blue 100 → 300 | `#dee1e7` → `#b4b9c3` |
| Blue 300 → 500 | `#b4b9c3` → `#8b92a0` |
| Blue 500 → 700 | `#8b92a0` → `#656d7d` |
| Blue 700 → 900 | `#656d7d` → `#404b5d` |

### Teal (single-hue) — 4 gradients

| Gradient | Stops |
| -- | -- |
| Teal 100 → 300 | `#dbe2e2` → `#b0baba` |
| Teal 300 → 500 | `#b0baba` → `#879393` |
| Teal 500 → 700 | `#879393` → `#5f6e6e` |
| Teal 700 → 900 | `#5f6e6e` → `#3a4b4b` |

### Blue–teal (matched level) — 5 gradients

| Gradient | Stops |
| -- | -- |
| Blue 100 → Teal 100 | `#dee1e7` → `#dbe2e2` |
| Blue 300 → Teal 300 | `#b4b9c3` → `#b0baba` |
| Blue 500 → Teal 500 | `#8b92a0` → `#879393` |
| Blue 700 → Teal 700 | `#656d7d` → `#5f6e6e` |
| Blue 900 → Teal 900 | `#404b5d` → `#3a4b4b` |

_Why: the matched-level blue→teal set is the signature gradient; the single-hue sets cover subtle
depth when a hue shift isn't wanted._

- Which surfaces use which gradient is a component decision; this file fixes the family, the stop
  rule, and the default direction.
  _Why: literal placements belong with the components that use them._
