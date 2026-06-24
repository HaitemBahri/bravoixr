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
| 100 | `#e6ebf3` |
| 200 | `#ccd7e6` |
| 300 | `#a8bbd4` |
| 400 | `#7e98bb` |
| 500 | `#5c79a3` |
| 600 | `#496187` |
| 700 | `#3d4f6d` |
| 800 | `#36435b` |
| 900 | `#2f3a4d` |
| 950 | `#1f2633` |

_Why: a muted slate-blue — trustworthy and modern, desaturated so it stays calm._

### Secondary — Teal

| Step | Hex |
| -- | -- |
| 50 | `#f1f7f7` |
| 100 | `#ddecec` |
| 200 | `#bdd8d8` |
| 300 | `#93bcbc` |
| 400 | `#659a9b` |
| 500 | `#487e7f` |
| 600 | `#3a6667` |
| 700 | `#325354` |
| 800 | `#2d4445` |
| 900 | `#293a3b` |
| 950 | `#172324` |

_Why: a muted teal pairs with the blue without clashing — supporting, not competing._

## State colors

### Success — Green

| Step | Hex |
| -- | -- |
| 50 | `#f3f7f1` |
| 100 | `#e4ede0` |
| 200 | `#c8dcc1` |
| 300 | `#a1c197` |
| 400 | `#76a06a` |
| 500 | `#588349` |
| 600 | `#45693a` |
| 700 | `#385330` |
| 800 | `#30442a` |
| 900 | `#293a25` |
| 950 | `#152011` |

_Why: a soft, earthy green — clearly "good" without a vivid alert-green glare._

### Warning — Yellow

| Step | Hex |
| -- | -- |
| 50 | `#faf8f0` |
| 100 | `#f3eed9` |
| 200 | `#e6dbb2` |
| 300 | `#d4c184` |
| 400 | `#c0a559` |
| 500 | `#a98c40` |
| 600 | `#8c7234` |
| 700 | `#6f592c` |
| 800 | `#5c4a29` |
| 900 | `#4f3f26` |
| 950 | `#2c2112` |

_Why: a muted gold rather than a bright yellow — caution that stays legible on light surfaces._

### Error — Red

| Step | Hex |
| -- | -- |
| 50 | `#faf4f3` |
| 100 | `#f3e3e1` |
| 200 | `#e7c8c4` |
| 300 | `#d6a39d` |
| 400 | `#c1756d` |
| 500 | `#a9544b` |
| 600 | `#8e413a` |
| 700 | `#743530` |
| 800 | `#61302c` |
| 900 | `#532c29` |
| 950 | `#2d1513` |

_Why: a desaturated brick-red — serious and clear without feeling aggressive._

### Info — Blue

- **Reuses the Primary blue ramp** — no separate hue.
  _Why: informational and brand voices are the same here — fewer colors, more coherence._

## Additional accents (tiny usages)

### Purple

| Step | Hex |
| -- | -- |
| 50 | `#f6f4fa` |
| 100 | `#ece7f3` |
| 200 | `#d9cfe6` |
| 300 | `#bdacd3` |
| 400 | `#9c84bb` |
| 500 | `#7e63a2` |
| 600 | `#654e84` |
| 700 | `#524069` |
| 800 | `#443758` |
| 900 | `#3a304b` |
| 950 | `#241d31` |

### Pink

| Step | Hex |
| -- | -- |
| 50 | `#faf3f6` |
| 100 | `#f3e2ea` |
| 200 | `#e7c6d5` |
| 300 | `#d4a0b7` |
| 400 | `#bd7494` |
| 500 | `#a35577` |
| 600 | `#854460` |
| 700 | `#6c374e` |
| 800 | `#5a3042` |
| 900 | `#4d2b39` |
| 950 | `#2c1620` |

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
| Blue 100 → 300 | `#e6ebf3` → `#a8bbd4` |
| Blue 300 → 500 | `#a8bbd4` → `#5c79a3` |
| Blue 500 → 700 | `#5c79a3` → `#3d4f6d` |
| Blue 700 → 900 | `#3d4f6d` → `#2f3a4d` |

### Teal (single-hue) — 4 gradients

| Gradient | Stops |
| -- | -- |
| Teal 100 → 300 | `#ddecec` → `#93bcbc` |
| Teal 300 → 500 | `#93bcbc` → `#487e7f` |
| Teal 500 → 700 | `#487e7f` → `#325354` |
| Teal 700 → 900 | `#325354` → `#293a3b` |

### Blue–teal (matched level) — 5 gradients

| Gradient | Stops |
| -- | -- |
| Blue 100 → Teal 100 | `#e6ebf3` → `#ddecec` |
| Blue 300 → Teal 300 | `#a8bbd4` → `#93bcbc` |
| Blue 500 → Teal 500 | `#5c79a3` → `#487e7f` |
| Blue 700 → Teal 700 | `#3d4f6d` → `#325354` |
| Blue 900 → Teal 900 | `#2f3a4d` → `#293a3b` |

_Why: the matched-level blue→teal set is the signature gradient; the single-hue sets cover subtle
depth when a hue shift isn't wanted._

- Which surfaces use which gradient is a component decision; this file fixes the family, the stop
  rule, and the default direction.
  _Why: literal placements belong with the components that use them._
