# bravoixr

Shared **design identity system** imported by all my software projects to keep their design consistent.

## What this is

The single source of truth for design identity: the values and styling that make my software recognizably _mine_ — colors, sizing, and typography. Generic UI mechanics (component behavior, accessibility, positioning) are rented from **daisyUI** (a Tailwind v4 plugin) and only _skinned_ with the tokens defined here, delivered as a daisyUI + Tailwind theme.

## Contents

- **Identity decisions** (`identity/`) — human-readable Markdown documenting the design taste, one file per category. The source everything else transcribes from.
- **Design tokens** — two tiers in separate folders: `primitives/` (raw literal values) → `semantics/` (meaning). The portable source of truth.
- **The theme** (`index.css`) — maps the semantic tokens onto daisyUI's theme variables and Tailwind's type scale. This is what a consuming app installs.

The web target is **daisyUI on Tailwind v4** — bravoixr authors a daisyUI theme so daisyUI's components render in bravoixr's identity. The token source is kept portable for a future non-web target.

## Principles

- **Own the tokens and the taste, rent the mechanics.** Define identity (color, type, spacing, radius, elevation, motion, density); rent components from **daisyUI** — never re-implement modals, dropdowns, focus management, etc.
- **One value per concept**, referenced everywhere — never inline a raw value.
- **CSS is the source today; portable to JSON/Style Dictionary** when a non-web (e.g. MAUI) target appears.

## Layers

| Layer | Job |
| --- | --- |
| Primitive tokens | Raw values, no meaning (`--blue-600`) |
| Semantic tokens | Meaning mapped onto primitives (`--color-primary`, `--control-height`) |
| Theme | Maps semantic tokens onto daisyUI's theme variables + Tailwind's type scale |

## Structure

```
identity/      design decisions, one Markdown file per category
primitives/    raw literal CSS values (color, typography, layout, motion, icons)
semantics/     meaning mapped onto primitives (+ inline dark theme)
components/    legacy component classes (retired; daisyUI owns components)
index.css      single entry — bravoixr's daisyUI + Tailwind theme
```

Five measurable categories (color, typography, layout, motion, icons) run through `identity/`, `primitives/`, and `semantics/`. **Feel** (density, taste) and **media** (decorative-artwork direction) are `identity/`-only. `layout` combines spacing, sizing, radius, borders, elevation, and z-index.

## Consuming bravoixr

Install Tailwind + daisyUI, then import bravoixr's theme **after** the daisyUI plugin. Apply **daisyUI's** component classes — they render in bravoixr's identity:

```css
@import "tailwindcss";
@plugin "daisyui";
@import "bravoixr/index.css";   /* after the daisyui plugin */
```

```html
<button class="btn btn-primary">Save</button>
<input class="input" />
<div class="card">…</div>
```

- **daisyUI components, bravoixr identity.** Build your UI from daisyUI's classes; bravoixr's theme gives them its colors, sizing (40px controls), radii, and typography.
- **Tokens are the escape hatch.** For layout, spacing, and one-offs the theme doesn't cover, reference the semantic tokens directly (`gap: var(--spacing-5)`). Never reference primitives.
- **Theming is explicit.** Always set both `data-theme` (`light` or `dark`) and `dir` (`ltr` or `rtl`) on the root element — one switch drives both bravoixr's tokens and daisyUI's theme. Themed roles are defined per state with no default, so an unset context leaves them unresolved by design. Both attributes work on any subtree root too, so a nested island (e.g. a `data-theme="light"` block in a dark page) fully overrides its context — daisyUI components inside it re-theme automatically.
- **Fonts.** Load the named fonts yourself (Bricolage Grotesque, IBM Plex Sans Arabic, JetBrains Mono, Material Symbols) — the system declares the family stacks only.
- **Pin a version.** Track a released tag (e.g. `v0.2.0`).

## Releases

Versioned with a release cadence. `release.json.currentRelease` is the last shipped release; consumers pin a version.

## Targets

Web target: **daisyUI on Tailwind v4** (Vue / React apps). Non-web (MAUI/native) is planned — the token source is kept portable for that.