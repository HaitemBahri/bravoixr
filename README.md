# bravoixr

Shared **design identity system** imported by all my software projects to keep their design consistent.

## What this is

The single source of truth for design identity: the values and styling that make my software recognizably _mine_. Everything that is solved, generic UI mechanics (component behavior, accessibility, layout primitives) is rented from libraries and only _skinned_ with the tokens defined here.

## Contents

- **Identity decisions** (`identity/`) — human-readable Markdown documenting the design taste, one file per category. The source everything else transcribes from.
- **Design tokens** — two tiers in separate folders: `primitives/` (raw literal values) → `semantics/` (meaning). The portable source of truth.
- **Component classes** (`components/`) — thin classes for reused elements bravoixr's adopted component library, **daisyUI**, doesn't cover, plus small gap-override rules for the taste daisyUI's theme variables don't expose.

bravoixr adopts **daisyUI** as its component library: it feeds its own tokens into daisyUI's theme-variable contract, so daisyUI's own component classes render in bravoixr's identity with no bravoixr-authored class needed. Component behavior (modals, dropdowns, focus management, accessibility) is rented from daisyUI, never reimplemented.

## Principles

- **Own the tokens and the taste, rent the mechanics from daisyUI.** Define identity (color, type, spacing, radius, elevation, motion, density); skin daisyUI's components rather than re-implementing modals, dropdowns, focus management, etc.
- **One value per concept**, referenced everywhere — never inline a raw value.
- **Component class only when reused** (2+ times) — never speculatively.
- **CSS is the source today; portable to JSON/Style Dictionary** when a non-web (e.g. MAUI) target appears.

## Layers

| Layer | Job |
| --- | --- |
| Primitive tokens | Raw values, no meaning (`--bravoixr-blue-600`) |
| Semantic tokens | Meaning mapped onto primitives (`--bravoixr-color-primary`, `--bravoixr-btn-height`) |
| daisyUI theme bridge | Maps semantic tokens onto daisyUI's own theme CSS variables (`--color-primary`, `--radius-field`) |
| Component classes | daisyUI's own classes for migrated components (`.btn-primary`, `.input-primary`, `.toggle-primary`/`.checkbox-primary`/`.radio-primary`); bravoixr's classes for the rest (`.card-title`, `.card-description`, etc.) |

## Structure

```
apps/bravoixr/         the design identity system
  identity/      design decisions, one Markdown file per category
  primitives/    raw literal CSS values (color, typography, layout, motion, icons)
  semantics/     meaning mapped onto primitives (+ inline dark theme)
  daisyui/       bridges semantic tokens onto daisyUI's theme CSS-variable contract
  components/    component classes for elements daisyUI doesn't cover, plus gap overrides
  index.css      single entry — import order: primitives → semantics → daisyui → components
apps/preview/           preview site for the token layers and component classes
```

Five measurable categories (color, typography, layout, motion, icons) run through `identity/`, `primitives/`, and `semantics/`. **Feel** (density, taste) and **media** (decorative-artwork direction) are `identity/`-only. `layout` combines spacing, sizing, radius, borders, elevation, and z-index.

> Full, always-current usage instructions for consuming projects live in Notion: [Bravoixr v0.3.2](https://app.notion.com/p/3b17e19de5c28154bec8c701d67a9b3f) — kept in sync with each release.

## Consuming bravoixr

Load **daisyUI** (e.g. via CDN, pinned to a major version) **before** bravoixr's stylesheet, then apply classes — daisyUI's own for migrated components, bravoixr's for the rest:

```html
<link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
<link rel="stylesheet" href="bravoixr/index.css">

<button class="btn btn-primary">Save</button>
<input class="input">
<div class="card">…</div>
```

This works without CSS specificity tricks: daisyUI's CSS ships inside Tailwind's cascade layers, and bravoixr's plain, unlayered CSS always wins over layered rules regardless of load order.

**Current migration status:** `button`, `input`, and `toggle` are daisyUI-skinned (`.btn`, `.btn-primary`, `.btn-secondary`, `.btn-success`, `.btn-warning`, `.btn-error`, `.btn-ghost`, `.btn-square`; `.input`, `.input-primary`, `.input-secondary`, `.input-success`, `.input-warning`, `.input-error`; `.toggle`/`.checkbox`/`.radio` with the same five color-role modifiers). `card`'s own base class is a trimmed daisyUI gap-override, and `.card-title` likewise reuses and re-skins daisyUI's own class; its remaining anatomy classes (`.card-description`, `.card-header`, `.card-footer`, `.card-media`) are still full bravoixr implementations, pending their own migration. `page` has no daisyUI equivalent, but its topbar and footer bars gap-override daisyUI's `.navbar` and `.footer` selectors the same way.

- **Classes first.** Build your UI from classes — daisyUI's for migrated components, bravoixr's for the rest; each one bundles the correct combination of tokens, so you can't assemble an invalid pairing.
- **Tokens are the escape hatch.** For layout, spacing, and one-offs no class covers, reference the semantic tokens directly (`gap: var(--bravoixr-spacing-5)`). Never reference primitives.
- **Theming is explicit.** Always set both `data-theme` (`light` or `dark`) and `dir` (`ltr` or `rtl`) on the root element — the themed color/icon and scripted typography roles are defined per state with no default, so an unset context leaves them unresolved by design. Both attributes work on any subtree root too, so a nested island (e.g. a `data-theme="light"` card in a dark page, or a `dir="ltr"` block in an RTL page) fully overrides its context.
- **Fonts.** Load the named fonts yourself (Bricolage Grotesque, IBM Plex Sans Arabic, JetBrains Mono, Material Symbols) — the system declares the family stacks only.
- **Pin a version.** Track a released tag (e.g. `v0.1.0`).

## Releases

Versioned with a release cadence. `release.json.currentRelease` is the last shipped release; consumers pin a version.

## Targets

Web first (Blazor / JS). Non-web (MAUI/native) is planned — the token source is kept portable for that.