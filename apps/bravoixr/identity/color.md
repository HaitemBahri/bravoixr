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
| 50 | `#eef3ff` |
| 100 | `#d5def3` |
| 200 | `#bcc9e7` |
| 300 | `#a3b4da` |
| 400 | `#8b9fcd` |
| 500 | `#738bc1` |
| 600 | `#5c77b4` |
| 700 | `#4663a7` |
| 800 | `#304f99` |
| 900 | `#1a3b8c` |
| 950 | `#04257e` |

_Why: a muted slate-blue — trustworthy and modern, desaturated so it stays calm._

### Secondary — Teal

| Step | Hex |
| -- | -- |
| 50 | `#e5f7f7` |
| 100 | `#cae3e3` |
| 200 | `#afcfcf` |
| 300 | `#95bbbc` |
| 400 | `#7ba8a9` |
| 500 | `#609597` |
| 600 | `#458285` |
| 700 | `#277073` |
| 800 | `#005d61` |
| 900 | `#00494d` |
| 950 | `#003639` |

_Why: a muted teal pairs with the blue without clashing — supporting, not competing._

## State colors

### Success — Green

| Step | Hex |
| -- | -- |
| 50 | `#ebf7e5` |
| 100 | `#d1e3c8` |
| 200 | `#b7d0ac` |
| 300 | `#9dbd90` |
| 400 | `#84aa74` |
| 500 | `#6a9759` |
| 600 | `#51853d` |
| 700 | `#37731e` |
| 800 | `#206000` |
| 900 | `#154b00` |
| 950 | `#0c3700` |

_Why: a soft, earthy green — clearly "good" without a vivid alert-green glare._

### Warning — Yellow

| Step | Hex |
| -- | -- |
| 50 | `#fbf5de` |
| 100 | `#ebe0be` |
| 200 | `#dbcc9e` |
| 300 | `#ccb77e` |
| 400 | `#bda25d` |
| 500 | `#af8d39` |
| 600 | `#a07800` |
| 700 | `#8c6600` |
| 800 | `#775500` |
| 900 | `#624400` |
| 950 | `#4e3400` |

_Why: a muted gold rather than a bright yellow — caution that stays legible on light surfaces._

### Error — Red

| Step | Hex |
| -- | -- |
| 50 | `#ffeeec` |
| 100 | `#f8d3ce` |
| 200 | `#efb9b1` |
| 300 | `#e69e95` |
| 400 | `#db8479` |
| 500 | `#cf685e` |
| 600 | `#c34b44` |
| 700 | `#b52828` |
| 800 | `#9f0013` |
| 900 | `#80000e` |
| 950 | `#620009` |

_Why: a desaturated brick-red — serious and clear without feeling aggressive._

### Info — Blue

- **Reuses the Primary blue ramp** — no separate hue.
  _Why: informational and brand voices are the same here — fewer colors, more coherence._

## Additional accents (tiny usages)

### Purple

| Step | Hex |
| -- | -- |
| 50 | `#f5efff` |
| 100 | `#e1d7f5` |
| 200 | `#cebfe9` |
| 300 | `#baa7dc` |
| 400 | `#a890d0` |
| 500 | `#9678c3` |
| 600 | `#8461b6` |
| 700 | `#7349a9` |
| 800 | `#62309c` |
| 900 | `#520c8e` |
| 950 | `#3e006f` |

### Pink

| Step | Hex |
| -- | -- |
| 50 | `#ffecf5` |
| 100 | `#f5d1e1` |
| 200 | `#eab7cd` |
| 300 | `#dd9cba` |
| 400 | `#d182a6` |
| 500 | `#c36893` |
| 600 | `#b54c80` |
| 700 | `#a62e6d` |
| 800 | `#94005a` |
| 900 | `#770046` |
| 950 | `#5a0034` |

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
| Blue 100 → 300 | `#d5def3` → `#a3b4da` |
| Blue 300 → 500 | `#a3b4da` → `#738bc1` |
| Blue 500 → 700 | `#738bc1` → `#4663a7` |
| Blue 700 → 900 | `#4663a7` → `#1a3b8c` |

### Teal (single-hue) — 4 gradients

| Gradient | Stops |
| -- | -- |
| Teal 100 → 300 | `#cae3e3` → `#95bbbc` |
| Teal 300 → 500 | `#95bbbc` → `#609597` |
| Teal 500 → 700 | `#609597` → `#277073` |
| Teal 700 → 900 | `#277073` → `#00494d` |

### Blue–teal (matched level) — 5 gradients

| Gradient | Stops |
| -- | -- |
| Blue 100 → Teal 100 | `#d5def3` → `#cae3e3` |
| Blue 300 → Teal 300 | `#a3b4da` → `#95bbbc` |
| Blue 500 → Teal 500 | `#738bc1` → `#609597` |
| Blue 700 → Teal 700 | `#4663a7` → `#277073` |
| Blue 900 → Teal 900 | `#1a3b8c` → `#00494d` |

_Why: the matched-level blue→teal set is the signature gradient; the single-hue sets cover subtle
depth when a hue shift isn't wanted._

- Which surfaces use which gradient is a component decision; this file fixes the family, the stop
  rule, and the default direction.
  _Why: literal placements belong with the components that use them._
