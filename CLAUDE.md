# bravoixr — Project Rules

Project-specific rules for this repo. Global workspace rules still apply.

## What this project is

The shared design identity system. See `README.md` for the full overview. In short: define design **tokens** and **taste**, and write thin **component classes** for reused elements — rent all component mechanics from libraries. The system is framework-agnostic: it names no component library; each consuming app maps the tokens onto whatever library it uses.

## Hard rules

- **Tokens are the only source of values.** Never inline a raw value (color, size, radius) in component CSS or anywhere else — always reference a token.
- **Two tiers, kept separate.** Primitives (raw literal values) → semantic tokens (meaning). Component classes consume **semantic** tokens only, never primitives.
- **Token values stay portable.** No `calc()`, `color-mix()`, relative color syntax, or nested `var()` math _inside a token's definition_ — store literal values so the token file can be exported to JSON/XAML later. Such functions are fine in component CSS.
- **Rent the mechanics.** Do not implement modals, dropdowns, popovers, focus management, positioning, or accessibility. Use a component library (or a headless lib) and skin it.
- **Component class only when reused 2+ times.** No speculative components. One-off styling stays as plain scoped CSS.
- **Framework-agnostic.** bravoixr names no component library or base theme. Mapping the semantic tokens onto a library's own theme variables is each consuming app's responsibility, done on its side — not in this repo.

## Structure

- `identity/` — human-readable design decisions, one Markdown file per category. The creative source the token layers transcribe from.
- `primitives/` — raw literal CSS custom properties (no meaning, no `var()`). The portable source of truth.
- `semantics/` — meaning mapped onto primitives (`--color-primary`, `--btn-height`). The single seam components reference. Dark theme is handled **inline** here (`[data-theme="dark"]`), no separate `themes/` folder.
- `components/` — thin component classes for reused elements, consuming semantic tokens.
- `index.css` — single entry point. Import order is fixed: **`primitives/` → `semantics/` → `components/`**.

## Categories

Five measurable categories carry through `identity/`, `primitives/`, and `semantics/` as same-named files: **color, typography, layout, motion, icons**. Two further categories are `identity/`-only with no token file: **feel** (density, taste rules) and **media** (decorative-artwork direction).

- `layout` is the combined structural/spatial system: spacing, sizing, radius, border widths, elevation (shadows), and z-index / layers.
- **Surface boundary:** surface *colors* live in `color` (they theme in dark mode); surface *shadow + stacking* live in `layout`.
- **Cross-category rule:** a semantic category file references only the matching primitive category (semantic `color.css` → primitive color tokens only, etc.).

## Releases

`release.json.currentRelease` is the source of truth for the active release (`vMAJOR.MINOR.PATCH`). Update it only during an explicit release cut.

## Working agreements

- **Where rules live.** Always record any new rule, preference, convention, or remembered fact for this project in **this local `CLAUDE.md`** — never in the global `~/.claude` folder (no `~/.claude/projects/.../memory` files, no edits to the global `CLAUDE.md`).
- **No unapproved additions.** Deliver only what was explicitly discussed and approved. Do not introduce extra sections, values, or decisions on initiative — even if they seem in-scope or helpful. If something else seems warranted, propose it and ask before writing it in; confirm taste/scope decisions up front rather than authoring them speculatively.