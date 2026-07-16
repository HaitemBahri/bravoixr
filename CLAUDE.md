# bravoixr — Project Rules

Project-specific rules for this repo. Global workspace rules still apply.

## What this project is

The shared design identity system. See `README.md` for the full overview. In short: define design **tokens** and **taste** — colors, sizing, and typography — and deliver them as a **daisyUI + Tailwind theme** that skins rented component mechanics. The web target is daisyUI (a Tailwind v4 plugin): a consuming app installs Tailwind + daisyUI, then bravoixr's theme, which injects bravoixr's colors, sizes, and typography into daisyUI's theme variables and Tailwind's type scale. The token source is kept portable so a future non-web (MAUI/native) target can be generated from it.

## Hard rules

- **Tokens are the only source of values.** Never inline a raw value (color, size, radius) in component CSS or anywhere else — always reference a token. Sole exception: `@media` **conditions** can't read `var()`, so breakpoint px are mirrored literally in the media-query text (with a comment pointing to the `--breakpoint-*` primitives); values *inside* the block still use tokens.
- **Two tiers, kept separate.** Primitives (raw literal values) → semantic tokens (meaning). The theme consumes **semantic** tokens only, never primitives.
- **The theme is the public API.** Consuming projects install Tailwind + daisyUI and import bravoixr's **theme** (`index.css`), which maps bravoixr's semantic tokens onto daisyUI's theme variables and Tailwind's type scale. Consumers apply **daisyUI's** component classes, themed by bravoixr — they never assemble bravoixr's raw tokens into components. Semantic tokens remain the internal seam and a *supported escape hatch* for layout/spacing one-offs; primitives are never consumed directly. (Detail in **Consumption** below.)
- **Token values stay portable.** No `calc()`, `color-mix()`, relative color syntax, or nested `var()` math _inside a token's definition_ — store literal values so the token file can be exported to JSON/XAML later. Such functions are fine in theme CSS.
- **Rent the mechanics.** Do not implement modals, dropdowns, popovers, focus management, positioning, or accessibility. Use **daisyUI** (on Tailwind) and skin it through the theme.
- **daisyUI + Tailwind is the web target.** bravoixr names daisyUI (on Tailwind v4) as its component library and authors a daisyUI theme for it. daisyUI shares bravoixr's `data-theme` switch and its `--color-*` role names, so the mapping is direct. Non-web targets are not built; only the token *source* is kept portable for them.

## Structure

- `identity/` — human-readable design decisions, one Markdown file per category. The creative source the token layers transcribe from.
- `primitives/` — raw literal CSS custom properties (no meaning, no `var()`). The portable source of truth.
- `semantics/` — meaning mapped onto primitives (`--color-primary`, `--control-height`). The single seam the theme references. Dark theme is handled **inline** here (`[data-theme="dark"]`), no separate `themes/` folder.
- `components/` — legacy component classes (retired as public API; daisyUI owns components now). Kept pending removal with the preview rework.
- `index.css` — single entry point: bravoixr's theme, imported by a consuming app after the daisyUI plugin. (Precise theme-file layout is authored in BAH-1197.)

## Consumption

bravoixr is layered as a **public/internal contract**:

- **Primitives** (`--blue-600`) — raw values, no meaning. Internal; never consumed directly.
- **Semantic tokens** (`--color-primary`, `--control-height`) — meaning mapped onto primitives; single vars. The internal seam — and a *supported escape hatch* consumers may use for layout, spacing, and one-offs the theme doesn't cover (atomic tokens carry no combination risk).
- **The theme** (`index.css`) — bravoixr's semantic tokens mapped onto daisyUI's theme variables and Tailwind's type scale; the **public API**. Consuming projects install Tailwind + daisyUI, import this after the daisyUI plugin, and apply **daisyUI's** component classes — which then render in bravoixr's colors, sizing, and typography.

Consumers set `data-theme` (`light`/`dark`) and `dir` (`ltr`/`rtl`) — the same switch drives both bravoixr's tokens and daisyUI's theme — and load the named fonts themselves (the system declares family stacks only). Because the theme is the contract, the semantic-token wiring behind it can be refactored without breaking consumers.

Component classes (`components/`) are **retired** as public API — daisyUI owns components now. The files remain in the tree pending removal with the preview rework; do not author new ones.

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