# bravoixr — Project Rules

Project-specific rules for this repo. Global workspace rules still apply.

Project page → https://app.notion.com/p/3877e19de5c280eb803bd89e214880da
Legacy usage instructions → https://app.notion.com/p/3b17e19de5c28154bec8c701d67a9b3f (documents the **old CSS class system** in `apps/bravoixr`, not the Astro library; kept only until that app's disposition is decided)

## What this project is

An **Astro component library** built on bravoixr's own design tokens — components to import and reuse across projects, plus the token layers that give them a single visual identity.

Two halves:

- **Tokens** — `primitives/` (raw literal values) → `semantics/` (meaning). The design identity, and the only source of values any component reads.
- **Components** — `.astro` files with typed props, slots, and their own scoped styles. The public API.

**This is no longer a migration.** The repo began as a CSS class system (`apps/bravoixr`) with the Astro work porting it class by class. That framing is retired: components are designed on their own terms. The old classes are **not a reference** — do not read them, match them, or transcribe from them unless explicitly told to use or duplicate a specific one.

The token layers are unaffected by that change. They stay, and they are still the only source of values.

## Hard rules

- **Tokens are the only source of values.** Never inline a raw value (color, size, radius) — always reference a token. Two exceptions: `@media` **conditions** can't read `var()`, so breakpoint px are mirrored literally in the query text (values *inside* the block still use tokens); and a layout keyword supplied by a consumer prop (`row`/`column`) is structure, not a design value.
- **Two tiers, kept separate.** Primitives (raw literal values) → semantic tokens (meaning). Components consume **semantic** tokens only, never primitives.
- **Components are the public API.** Consumers import components, not classes. Each is built from semantic tokens so an invalid combination can't be assembled. Semantic tokens are also a *supported escape hatch* for layout, spacing and one-offs no component covers; primitives are never consumed directly.
- **Use daisyUI only where it earns its place.** If a component can be written without daisyUI, use **none** of its classes. Where daisyUI supplies genuine behaviour that would be costly and error-prone to reimplement — modals, dropdowns, popovers, focus management, positioning, accessibility — rent it rather than build it, and say so in the component. Static layout is not a reason to reach for it: renting there buys constraint without mechanism.
- **Token values stay portable.** No `calc()`, `color-mix()`, relative color syntax or nested `var()` math *inside a token's definition* — store literal values so the token files can be exported to JSON/XAML later. Such functions are fine in component CSS.
- **Component only when reused 2+ times.** No speculative components. One-off styling stays as plain scoped CSS in the consumer.
- **bravoixr's own tokens are namespaced `--bravoixr-*`.** Every custom property bravoixr defines, in both tiers, is prefixed — keeping it visibly distinct from daisyUI's or any other library's variables.

## Structure

The library is `apps/bravoixr-astro/`; its preview site is the sibling app `apps/preview-astro/`. Both are npm workspace members. Paths below are relative to `apps/bravoixr-astro/`.

- `identity/` — human-readable design decisions, one Markdown file per category. The creative source the token layers transcribe from.
- `primitives/` — raw literal CSS custom properties (no meaning, no `var()`). The portable source of truth.
- `semantics/` — meaning mapped onto primitives (`--bravoixr-color-primary`). The single seam components reference. Dark theme is handled **inline** here (`[data-theme="dark"]`), no separate `themes/` folder.
- `daisyui/` — bridges bravoixr's `--bravoixr-*` tokens onto daisyUI's theme CSS-variable contract, under the same `[data-theme]` states `semantics/color.css` uses. Isolates all daisyUI coupling to this one layer.
- `components/` — the Astro components, grouped by family. See **Authoring an Astro component** below.
- `index.css` — single entry point for the token layers. Import order is fixed: **`primitives/` → `semantics/` → `daisyui/`**.

**Legacy.** `apps/bravoixr/` (the old CSS class system) and `apps/preview/` (its preview) remain in the repo, untouched and not workspace members. They are **not a reference** for new work. What happens to them is undecided and deliberately deferred — until then, leave both alone.

## Consumption

Consumers load daisyUI and Tailwind, import the token entry point, then import the components they need:

```astro
---
import 'bravoixr/index.css';
import Page from 'bravoixr/components/page/Page.astro';
import DisplayCard from 'bravoixr/components/display/DisplayCard.astro';
---
```

- **Components first.** Build UI from components; each bundles the correct combination of tokens.
- **Semantic tokens are the escape hatch.** For layout, spacing and one-offs no component covers, reference them directly (`gap: var(--bravoixr-spacing-5)`). Never reference primitives.
- **Theming is explicit.** Always set both `data-theme` (`light`/`dark`) and `dir` (`ltr`/`rtl`) on the root element — themed colour/icon roles and scripted typography roles are defined per state with **no default**, so an unset context leaves them unresolved by design. Both attributes also work on any subtree root, so a nested island fully overrides its context.
- **Fonts are the consumer's job.** Load the named fonts yourself (Bricolage Grotesque, IBM Plex Sans Arabic, JetBrains Mono, Material Symbols) — the system declares family stacks only.

## Authoring an Astro component (`apps/bravoixr-astro/components/`)

**Layout.** Components are grouped by family, one folder each, and each component's name carries its family — `page/PageBody.astro`, `display/DisplayCardTitle.astro`. Three families exist, splitting by what a component is *for*:

| Folder | Role |
| -- | -- |
| `page/` | the page canvas and its chrome |
| `container/` | arrangement — no appearance of their own |
| `display/` | presentation of content |

**Family folders are kebab-case; component files stay PascalCase.** The two casings in one path are deliberate: the folder is a path segment, so the workspace tie-breaker gives it kebab-case, while the filename *is* the identifier you import. `.astro` files cannot be re-exported through a JS barrel, so there is no index file and consumers import the full path.

Note Astro derives a component's scope hash from its **file path**, so moving a component changes every `data-astro-cid-…` it emits, in both the HTML and the CSS. Nothing renders differently, but a pure file move produces a wholesale diff in the built output — compare by canonicalising the ids rather than byte-for-byte.

Every component follows these rules:

- **Semantic tokens only.** Reference semantic tokens — never primitives, never raw literal values.
- **No ambient-context conditionals.** No `[data-theme]`, `[dir]`, `:lang` or `@media` inside a component. All context value-switching (theme, script, viewport) lives in `semantics/` by re-pointing role tokens. If a component needs a value that varies by context, add or elevate a semantic role token rather than branching.
- **Flow-relative.** Use logical properties (`padding-inline`, `margin-block`, `inset-inline`, `border-inline`) so RTL mirrors automatically from `dir`; never physical `left`/`right`/`top`/`bottom`.
- **A component's CSS lives in its own `<style>` block and is not reachable from outside it.** Nothing a component renders carries a class for bravoixr's own styling: a class in the DOM is a public selector a consumer can target and override. Style bare element selectors and let Astro's scoping do the work — `h2 { … }` compiles to `h2[data-astro-cid-…]`, which nothing outside can address.
- **Rented daisyUI classes are the exception.** Where a component genuinely rents daisyUI behaviour, its class stays on the markup as daisyUI's public API. That is the only reason a class should appear.
- **Slotted content is never styled by the component.** Content passed through a `<slot />` is rendered by the consumer and never carries the scope attribute, so a scoped `p { … }` reaches the component's own paragraph and leaves a consumer's alone. This is what makes bare element selectors safe; any rule that *must* reach slotted content needs an explicit `:global()`.
- **A prop-driven variant reaches the CSS through a `data-` attribute, not a class.** `<div data-axis={axis}>` with `div[data-axis="column"] { … }` compiles to `div[data-astro-cid-…][data-axis="column"]` — the rule stays in the component's own `<style>` and stays scoped. Where the value is arbitrary rather than one of a few known states, set a custom property on the root instead — `<div style={`--swatch-color: ${color}`}>`, read as `var(--swatch-color)`. Prefer that to Astro's `define:vars`, which stamps the same declaration onto *every* element in the template; custom properties inherit, so the root alone is enough.
- **Known exception — `Page.astro`.** Astro exempts `html`/`body` selectors from scoping, so Page's canvas rule emits as a global `body { … }`, and its box-sizing rule is deliberately `:global()` so it reaches every descendant. Both are unavoidable for that component; no other component may rely on either mechanism.

## Categories

Five measurable categories carry through `identity/`, `primitives/` and `semantics/` as same-named files: **color, typography, layout, motion, icons**. Two further categories are `identity/`-only with no token file: **feel** (density, taste rules) and **media** (decorative-artwork direction).

- `layout` is the combined structural/spatial system: spacing, sizing, radius, border widths, elevation (shadows), and z-index / layers.
- **Surface boundary:** surface *colors* live in `color` (they theme in dark mode); surface *shadow + stacking* live in `layout`.
- **Cross-category rule:** a semantic category file references only the matching primitive category (semantic `color.css` → primitive color tokens only, etc.).

## Releases

**Undecided, and deliberately so.** `apps/bravoixr/release.json` records `v0.4.5` for the legacy CSS system; the Astro package carries no `version` at all. Which becomes the library's version source — and whether the package is published, under what name — is settled when the legacy app's disposition is. Do not start a release cut for the Astro library until that is decided.

`.github/workflows/linear-release.yml` still filters on `include_paths: apps/bravoixr/**`, so it does not see the Astro app. Left as-is for the same reason.

## Working agreements

- **Where rules live.** Always record any new rule, preference, convention or remembered fact for this project in **this local `CLAUDE.md`** — never in the global `~/.claude` folder (no `~/.claude/projects/.../memory` files, no edits to the global `CLAUDE.md`).
- **The old CSS classes are not a reference.** Do not read, match or transcribe from `apps/bravoixr/components/*.css` when designing a component. If a specific old class should be used or duplicated, the user will name it.
- **The preview is off-limits.** Never add anything to `apps/preview-astro` — any section, any page — without an explicit instruction. Building a component is not permission to demo it; a new component ships on its own and the user decides if, when and where it appears.
- **No unapproved additions.** Deliver only what was explicitly discussed and approved. Do not introduce extra sections, values or decisions on initiative — even if they seem in-scope or helpful. If something else seems warranted, propose it and ask before writing it in; confirm taste/scope decisions up front rather than authoring them speculatively.
