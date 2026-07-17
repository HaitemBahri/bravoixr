# bravoixr — Project Rules

Project-specific rules for this repo. Global workspace rules still apply.

Project page → https://app.notion.com/p/3877e19de5c280eb803bd89e214880da

## What this project is

The shared design identity system. See `README.md` for the full overview. In short: define design **tokens** and **taste**, and write thin **component classes** for reused elements — rent all component mechanics from libraries. The system is framework-agnostic: it names no component library; each consuming app maps the tokens onto whatever library it uses.

## Hard rules

- **Tokens are the only source of values.** Never inline a raw value (color, size, radius) in component CSS or anywhere else — always reference a token. Sole exception: `@media` **conditions** can't read `var()`, so breakpoint px are mirrored literally in the media-query text (with a comment pointing to the `--bravoixr-breakpoint-*` primitives); values *inside* the block still use tokens.
- **Two tiers, kept separate.** Primitives (raw literal values) → semantic tokens (meaning). Component classes consume **semantic** tokens only, never primitives.
- **Classes are the public API.** Consuming projects apply bravoixr's **classes**, not its raw tokens. Classes are built exclusively from semantic tokens and bundle the correct combinations, so consumers can't assemble invalid pairings. Semantic tokens are the internal seam and a *supported escape hatch* for layout/spacing/one-offs no class covers; primitives are never consumed directly. (Detail in **Consumption** below.)
- **Token values stay portable.** No `calc()`, `color-mix()`, relative color syntax, or nested `var()` math _inside a token's definition_ — store literal values so the token file can be exported to JSON/XAML later. Such functions are fine in component CSS.
- **Rent the mechanics.** Do not implement modals, dropdowns, popovers, focus management, positioning, or accessibility. Use a component library (or a headless lib) and skin it.
- **Component class only when reused 2+ times.** No speculative components. One-off styling stays as plain scoped CSS.
- **Classes carry no conditionals.** A component class in `components/` never contains `[data-theme]`, `[dir]`, `:lang`, or `@media`. All context value-switching (theme, script, viewport) lives in `semantics/` by re-pointing role tokens; classes stay flow-relative and context-agnostic. (Detail in **Authoring a class** below.)
- **Framework-agnostic.** bravoixr names no component library or base theme. Mapping the semantic tokens onto a library's own theme variables is each consuming app's responsibility, done on its side — not in this repo.

## Structure

The design identity system lives at `apps/bravoixr/` (deployable, per the global monorepo `apps/<app>/` convention); its preview site is the sibling app `apps/preview/`, with no versioning of its own. Paths below are relative to `apps/bravoixr/`.

- `identity/` — human-readable design decisions, one Markdown file per category. The creative source the token layers transcribe from.
- `primitives/` — raw literal CSS custom properties (no meaning, no `var()`). The portable source of truth.
- `semantics/` — meaning mapped onto primitives (`--bravoixr-color-primary`, `--bravoixr-btn-height`). The single seam components reference. Dark theme is handled **inline** here (`[data-theme="dark"]`), no separate `themes/` folder.
- `components/` — thin component classes for reused elements, consuming semantic tokens.
- `index.css` — single entry point. Import order is fixed: **`primitives/` → `semantics/` → `components/`**.

## Consumption

bravoixr is layered as a **public/internal contract**:

- **Primitives** (`--bravoixr-blue-600`) — raw values, no meaning. Internal; never consumed directly.
- **Semantic tokens** (`--bravoixr-color-primary`, `--bravoixr-control-height`) — meaning mapped onto primitives; single vars. The internal seam — and a *supported escape hatch* consumers may use for layout, spacing, and one-offs no class covers (atomic tokens carry no combination risk).
- **Classes** — built exclusively from semantic tokens; the **public API**. Consuming projects apply these. Because a class bundles the correct combination, consumers can't produce invalid pairings (low-contrast text on a fill, mismatched control anatomy).

Class types:

- **Component classes** (`.btn`, `.input`, `.card`) — reused elements.
- **Combination classes** (e.g. `.surface-raised` setting background + text + border together) — how safe colour pairings are delivered, so consumers never hand-assemble colour roles.

The **component class only when reused 2+ times / no speculative** rule still governs; the class catalogue grows with real reuse. Because classes are the contract, semantic-token wiring can be refactored without breaking consumers. Consumers still set `data-theme` / `dir` for theming and load the named fonts themselves (the system declares family stacks only).

### Authoring a class (layer-3 rules)

Every class in `components/` follows these four rules:

- **Semantic tokens only.** Reference semantic tokens — never primitives, never raw literal values.
- **No conditionals in the class.** No `[data-theme]`, `[dir]`, `:lang`, or `@media` inside `components/`. All context value-switching (theme light/dark, script en/ar, viewport desktop/tablet/mobile) lives in `semantics/` by re-pointing role tokens.
- **Flow-relative.** Use logical properties (`padding-inline`, `margin-inline`, `border-inline`, `inset-inline`, `*-block`) so RTL mirrors automatically from `dir`; never physical `left` / `right` / `top` / `bottom` sides.
- **Corollary.** If a class needs a value that varies by context, add or elevate a semantic role token rather than adding a conditional to the class.

## Categories

Five measurable categories carry through `identity/`, `primitives/`, and `semantics/` as same-named files: **color, typography, layout, motion, icons**. Two further categories are `identity/`-only with no token file: **feel** (density, taste rules) and **media** (decorative-artwork direction).

- `layout` is the combined structural/spatial system: spacing, sizing, radius, border widths, elevation (shadows), and z-index / layers.
- **Surface boundary:** surface *colors* live in `color` (they theme in dark mode); surface *shadow + stacking* live in `layout`.
- **Cross-category rule:** a semantic category file references only the matching primitive category (semantic `color.css` → primitive color tokens only, etc.).

## Releases

`release.json.currentRelease` is the source of truth for the active release (`vMAJOR.MINOR.PATCH`). Update it only during an explicit release cut.

Future releases use the app-scoped naming: tag `bravoixr/vX.Y.Z`, release branch `release/bravoixr/vX.Y.Z`, Linear milestone `bravoixr vX.Y.Z`. Existing `v0.1.0`/`v0.2.0` tags, branches, and milestones are left as-is — naming rules apply going forward only. `preview` has no independent version or release of its own.

## Working agreements

- **Where rules live.** Always record any new rule, preference, convention, or remembered fact for this project in **this local `CLAUDE.md`** — never in the global `~/.claude` folder (no `~/.claude/projects/.../memory` files, no edits to the global `CLAUDE.md`).
- **No unapproved additions.** Deliver only what was explicitly discussed and approved. Do not introduce extra sections, values, or decisions on initiative — even if they seem in-scope or helpful. If something else seems warranted, propose it and ask before writing it in; confirm taste/scope decisions up front rather than authoring them speculatively.