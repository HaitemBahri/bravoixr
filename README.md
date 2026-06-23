# bravoixr

Shared **design identity system** imported by all my software projects to keep their design consistent.

## What this is

The single source of truth for design identity: the values and styling that make my software recognizably _mine_. Everything that is solved, generic UI mechanics (component behavior, accessibility, layout primitives) is rented from libraries and only _skinned_ with the tokens defined here.

## Contents

- **Design tokens** — two-tier CSS custom properties (primitives → semantic). The portable source of truth.
- **Component classes** — thin classes for reused elements (buttons, inputs, cards, badges) that apply the semantic tokens. Behavior is not implemented here.
- **Syncfusion bridge** — a stylesheet mapping the semantic tokens onto Syncfusion's theme variables, so Syncfusion components match the hand-built UI.

## Principles

- **Own the tokens and the taste, rent the mechanics.** Define identity (color, type, spacing, radius, elevation, motion, density); never re-implement modals, dropdowns, focus management, etc.
- **One value per concept**, referenced everywhere — never inline a raw value.
- **Component class only when reused** (2+ times) — never speculatively.
- **CSS is the source today; portable to JSON/Style Dictionary** when a non-web (e.g. MAUI) target appears.

## Layers

| Layer | Job |
| -- | -- |
| Primitive tokens | Raw values, no meaning (`--blue-600`) |
| Semantic tokens | Meaning mapped onto primitives (`--color-primary`, `--btn-height`) |
| Component classes | Apply semantic tokens to reused elements (`.btn-regular`) |
| Syncfusion bridge | Map semantic tokens onto Syncfusion theme variables |

## Releases

Versioned with a release cadence. `release.json.currentRelease` is the last shipped release; consumers pin a version.

## Targets

Web first (Blazor / JS, Syncfusion). Non-web (MAUI/native) is planned — the token source is kept portable for that.