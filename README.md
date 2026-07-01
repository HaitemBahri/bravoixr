# bravoixr

Shared **design identity system** imported by all my software projects to keep their design consistent.

## What this is

The single source of truth for design identity: the values and styling that make my software recognizably _mine_. Everything that is solved, generic UI mechanics (component behavior, accessibility, layout primitives) is rented from libraries and only _skinned_ with the tokens defined here.

## Contents

- **Identity decisions** (`identity/`) — human-readable Markdown documenting the design taste, one file per category. The source everything else transcribes from.
- **Design tokens** — two tiers in separate folders: `primitives/` (raw literal values) → `semantics/` (meaning). The portable source of truth.
- **Component classes** (`components/`) — thin classes for reused elements (buttons, inputs, cards) that apply the semantic tokens. Behavior is not implemented here.

The system is **framework-agnostic** — it names no component library. Each consuming app maps these semantic tokens onto whatever library it uses, on its own side.

## Principles

- **Own the tokens and the taste, rent the mechanics.** Define identity (color, type, spacing, radius, elevation, motion, density); never re-implement modals, dropdowns, focus management, etc.
- **One value per concept**, referenced everywhere — never inline a raw value.
- **Component class only when reused** (2+ times) — never speculatively.
- **CSS is the source today; portable to JSON/Style Dictionary** when a non-web (e.g. MAUI) target appears.

## Layers

| Layer | Job |
| --- | --- |
| Primitive tokens | Raw values, no meaning (`--blue-600`) |
| Semantic tokens | Meaning mapped onto primitives (`--color-primary`, `--btn-height`) |
| Component classes | Apply semantic tokens to reused elements (`.btn-regular`) |

## Structure

```
identity/      design decisions, one Markdown file per category
primitives/    raw literal CSS values (color, typography, layout, motion, icons)
semantics/     meaning mapped onto primitives (+ inline dark theme)
components/    component classes for reused elements
index.css      single entry — import order: primitives → semantics → components
```

Five measurable categories (color, typography, layout, motion, icons) run through `identity/`, `primitives/`, and `semantics/`. **Feel** (density, taste) and **media** (decorative-artwork direction) are `identity/`-only. `layout` combines spacing, sizing, radius, borders, elevation, and z-index.

## Consuming bravoixr

Import the single entry point and apply the **classes** — they are the public API:

```html
<link rel="stylesheet" href="bravoixr/index.css">

<button class="btn btn-primary">Save</button>
<input class="input">
<div class="card">…</div>
```

- **Classes first.** Build your UI from bravoixr's classes; each one bundles the correct combination of tokens, so you can't assemble an invalid pairing.
- **Tokens are the escape hatch.** For layout, spacing, and one-offs no class covers, reference the semantic tokens directly (`gap: var(--spacing-5)`). Never reference primitives.
- **Theming is explicit.** Always set both `data-theme` (`light` or `dark`) and `dir` (`ltr` or `rtl`) on the root element — the themed color/icon and scripted typography roles are defined per state with no default, so an unset context leaves them unresolved by design. Both attributes work on any subtree root too, so a nested island (e.g. a `data-theme="light"` card in a dark page, or a `dir="ltr"` block in an RTL page) fully overrides its context.
- **Fonts.** Load the named fonts yourself (Bricolage Grotesque, IBM Plex Sans Arabic, JetBrains Mono, Material Symbols) — the system declares the family stacks only.
- **Pin a version.** Track a released tag (e.g. `v0.1.0`).

## Releases

Versioned with a release cadence. `release.json.currentRelease` is the last shipped release; consumers pin a version.

## Targets

Web first (Blazor / JS). Non-web (MAUI/native) is planned — the token source is kept portable for that.