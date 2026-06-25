# Layout

The decided structural/spatial system — the creative source the primitive and semantic layout
layers later transcribe. Alongside color and typography, layout carries the system's recognizable
identity. This file is the combined structural system: spacing, sizing, radius, border widths,
elevation (shadows), z-index layers, and breakpoints.

Each decision lists the **decided value(s)** and a one-line **why**. Values are literal on purpose:
identity is where raw values are chosen; later layers only reference them. The stances this file
builds on (one fixed density at 40px, hybrid elevation, "just-visible" borders, subtle depth) are
set in `feel.md`.

## Base unit & spacing

- **Base unit: 4px.** Every spacing value is a multiple of 4.
  _Why: a 4px base divides the 40px control height evenly and gives a comfortable, predictable rhythm._

The spacing scale is a 12-step ramp, fine-grained at the small end and widening toward the top.

| Step | px | rem |
| -- | -- | -- |
| 1 | 2 | 0.125 |
| 2 | 4 | 0.25 |
| 3 | 8 | 0.5 |
| 4 | 12 | 0.75 |
| 5 | 16 | 1 |
| 6 | 20 | 1.25 |
| 7 | 24 | 1.5 |
| 8 | 32 | 2 |
| 9 | 40 | 2.5 |
| 10 | 48 | 3 |
| 11 | 64 | 4 |
| 12 | 80 | 5 |

_Why: a fine-grained low end handles tight in-control padding while the wider top steps handle
section and page rhythm — one ramp covers both._

## Sizing

- **Control height: 40px — one fixed density, no small/compact variant.**
  _Why: a single height keeps every consuming app consistent out of the box (per `feel.md`)._
- **Controls are full-width by default**, sized by their container rather than a fixed control width.
  _Why: layout owns width; controls fill the space they're given so forms and toolbars stay flexible._
- **Content container max-width: 1280px.**
  _Why: one cap keeps long-form and app layouts from sprawling on wide screens while leaving room to breathe._

## Radius

A six-step radius scale. `md` is the default for controls; `lg` is the default for cards.

| Token | px | Use |
| -- | -- | -- |
| `none` | 0 | squared edges |
| `sm` | 4 | small chips, tags |
| `md` | 8 | **default — controls** (buttons, inputs) |
| `lg` | 12 | **cards, panels** |
| `xl` | 16 | large surfaces, modals |
| `full` | 9999 | pills, avatars |

_Why: gently rounded reads modern without softening into a toy aesthetic; one default radius per
element class keeps controls and surfaces uniform._

## Border widths

Borders carry resting surfaces in the hybrid elevation model, so they must be clearly present.

| Token | px | Use |
| -- | -- | -- |
| `default` | 1 | the "just-visible" border on cards, inputs, panels |
| `strong` | 2 | focus ring / emphasis |

- **No fainter hairline step.**
  _Why: `feel.md` requires borders be clearly present, not hairline-faint — a faint step would undercut the borders-first surfaces._

## Elevation / shadow

Hybrid elevation: **resting surfaces carry no shadow** (their border does the work); shadows are
reserved for genuinely floating layers. Shadows are cool-tinted using neutral-950 (`#0b0c0f` →
`rgb(11, 12, 15)`) and kept low-contrast to match the muted palette.

| Level | Floating layer | Shadow |
| -- | -- | -- |
| _surface_ | cards, inputs, panels | _none (border only)_ |
| `sm` | menu, dropdown, popover, tooltip | `0 1px 2px rgba(11,12,15,.06), 0 2px 8px rgba(11,12,15,.08)` |
| `md` | toast | `0 4px 12px rgba(11,12,15,.10), 0 2px 4px rgba(11,12,15,.06)` |
| `lg` | modal, dialog | `0 12px 32px rgba(11,12,15,.16), 0 4px 8px rgba(11,12,15,.08)` |

- **Shadows climb with how far a layer floats** — a menu sits just off the surface, a modal sits well above it.
  _Why: the shadow depth signals stacking distance, so "this floats above the page" stays meaningful._
- **The tint is the cool neutral, never pure black.**
  _Why: a cool-keyed shadow shares the UI's temperature and stays quiet instead of harsh._

## Z-index / layers

Named stacking tiers in a small, readable range. Consumers reference the tier, never an ad-hoc number.

| Tier | z-index |
| -- | -- |
| `base` | 0 |
| `sticky` | 10 |
| `dropdown` | 20 |
| `overlay` | 30 |
| `modal` | 40 |
| `popover` | 50 |
| `toast` | 60 |

_Why: named tiers prevent z-index wars; the ordering matches how layers stack — sticky chrome sits
just above content, overlays dim it, modals sit on the overlay, popovers open above modals, and
toasts always win._

## Breakpoints

Two thresholds split the three responsive bands (`mobile` / `tablet` / `desktop`) that
`typography.md` uses.

| Band | Range |
| -- | -- |
| `mobile` | < 768px |
| `tablet` | ≥ 768px |
| `desktop` | ≥ 1024px |

_Why: two conventional thresholds (tablet at 768, desktop at 1024) cover the three bands the type
system already steps across, with no fluid math so the values stay portable to non-web targets._
