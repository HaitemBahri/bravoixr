# bravoixr — Project Rules

Project-specific rules for this repo. Global workspace rules still apply.

Project page → https://app.notion.com/p/3877e19de5c280eb803bd89e214880da

## What this project is

An **Astro component library** built on bravoixr's own design tokens — components to import and reuse across projects, plus the token layers that give them a single visual identity.

Two halves:

- **Tokens** — `primitives/` (raw literal values) → `semantics/` (meaning). The design identity, and the only source of values any component reads.
- **Components** — `.astro` files with typed props, slots, and their own scoped styles. The public API.

**No runtime dependencies.** The library is tokens and `.astro` files. It has no CSS framework, no component library and no build plugin behind it; `astro` is a peer dependency and nothing else. A consumer loads the token entry point and imports components — that is the whole contract.

## Hard rules

- **Tokens are the only source of values.** Never inline a raw value (color, size, radius) — always reference a token. Two exceptions: `@media` **conditions** can't read `var()`, so breakpoint px are mirrored literally in the query text (values *inside* the block still use tokens); and a layout keyword supplied by a consumer prop (`row`/`column`) is structure, not a design value.
- **Two tiers, kept separate.** Primitives (raw literal values) → semantic tokens (meaning). Components consume **semantic** tokens only, never primitives.
- **Components are the public API.** Consumers import components, not classes. Each is built from semantic tokens so an invalid combination can't be assembled. Semantic tokens are also a *supported escape hatch* for layout, spacing and one-offs no component covers; primitives are never consumed directly.
- **Mechanics are authored, not rented.** No CSS framework, no component library, no utility classes — including for behaviour that is genuinely hard to build (modals, dropdowns, popovers, focus management, positioning). If a component needs such mechanics, write them. Adding a runtime dependency is a decision for the user, not a default an agent may reach for.
- **The library ships no CSS reset.** There is nothing zeroing browser defaults, so any element with a default margin — `p`, `h1`–`h6`, `figure`, `blockquote`, `ul` — must declare its own. An element rendered without one inherits the browser's, which is almost never what the design intends.
- **Token values stay portable.** No `calc()`, `color-mix()`, relative color syntax or nested `var()` math *inside a token's definition* — store literal values so the token files can be exported to JSON/XAML later. Such functions are fine in component CSS.
- **One-off styling stays in the consumer.** A component is warranted when it carries real structure or taste worth reusing, not when it wraps a single declaration. This is a judgement about the component, not a use count — a library exists to be reused elsewhere, so waiting for a second in-repo use is the wrong gate.
- **bravoixr's own tokens are namespaced `--bravoixr-*`.** Every custom property bravoixr defines, in both tiers, is prefixed — keeping it visibly distinct from any variable a consuming project defines.

## Structure

The library is `apps/bravoixr/`; its preview site is the sibling app `apps/preview/`. Both are npm workspace members. Paths below are relative to `apps/bravoixr/`.

- `identity/` — human-readable design decisions, one Markdown file per category. The creative source the token layers transcribe from.
- `primitives/` — raw literal CSS custom properties (no meaning, no `var()`). The portable source of truth.
- `semantics/` — meaning mapped onto primitives (`--bravoixr-color-primary`). The single seam components reference. Dark theme is handled **inline** here (`[data-theme="dark"]`), no separate `themes/` folder.
- `components/` — the Astro components, grouped by family. See **Authoring an Astro component** below.
- `index.css` — single entry point for the token layers. Import order is fixed: **`primitives/` → `semantics/`**.

## Consumption

Consumers import the token entry point, then the components they need:

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

## Authoring an Astro component (`apps/bravoixr/components/`)

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
- **Nothing a component renders carries a class.** A class in the DOM is a public selector a consumer can target and override, so a component's CSS lives in its own `<style>` block and is reachable from nowhere else. Style bare element selectors and let Astro's scoping do the work — `h2 { … }` compiles to `h2[data-astro-cid-…]`, which nothing outside can address. There are no exceptions.
- **Declare margins explicitly.** The library ships no reset, so every element with a browser default margin needs its own declaration — see the hard rule above.
- **Slotted content is never styled by the component.** Content passed through a `<slot />` is rendered by the consumer and never carries the scope attribute, so a scoped `p { … }` reaches the component's own paragraph and leaves a consumer's alone. This is what makes bare element selectors safe; any rule that *must* reach slotted content needs an explicit `:global()`.
- **A prop-driven variant reaches the CSS through a `data-` attribute, not a class.** `<div data-axis={axis}>` with `div[data-axis="column"] { … }` compiles to `div[data-astro-cid-…][data-axis="column"]` — the rule stays in the component's own `<style>` and stays scoped. Where the value is arbitrary rather than one of a few known states, set a custom property on the root instead — `<div style={`--swatch-color: ${color}`}>`, read as `var(--swatch-color)`. Prefer that to Astro's `define:vars`, which stamps the same declaration onto *every* element in the template; custom properties inherit, so the root alone is enough.
- **A child may key off an ancestor's variant.** Where a variant is owned by a parent and cannot be passed down as a prop, `:global([data-side]) figure { … }` compiles to a scoped descendant rule. That is a layout variant, not an ambient-context conditional, and stays within these rules.
- **Known exception — `Page.astro`.** Astro exempts `html`/`body` selectors from scoping, so Page's canvas rule emits as a global `body { … }`, and its box-sizing rule is deliberately `:global()` so it reaches every descendant. Both are unavoidable for that component; no other component may rely on either mechanism.

## Categories

Five measurable categories carry through `identity/`, `primitives/` and `semantics/` as same-named files: **color, typography, layout, motion, icons**. Two further categories are `identity/`-only with no token file: **feel** (density, taste rules) and **media** (decorative-artwork direction).

- `layout` is the combined structural/spatial system: spacing, sizing, radius, border widths, elevation (shadows), and z-index / layers.
- **Surface boundary:** surface *colors* live in `color` (they theme in dark mode); surface *shadow + stacking* live in `layout`.
- **Cross-category rule:** a semantic category file references only the matching primitive category (semantic `color.css` → primitive color tokens only, etc.).

## Releases

**Undecided, and deliberately so.** The package carries no `version` and is not published. Whether it ships to npm, under what name, and what its first version is are open questions. Do not start a release cut until they are answered.

There is no CI in this repo — release automation was removed with the legacy app it was scoped to.

## Working agreements

- **Where rules live.** Always record any new rule, preference, convention or remembered fact for this project in **this local `CLAUDE.md`** — never in the global `~/.claude` folder (no `~/.claude/projects/.../memory` files, no edits to the global `CLAUDE.md`).
- **The preview is off-limits.** Never add anything to `apps/preview` — any section, any page, any content — without an explicit instruction. Building a component is not permission to demo it; a new component ships on its own and the user decides if, when and where it appears.
- **Confirm taste, not scope.** Where a decision is the user's aesthetic call — spacing rhythm, a colour role, whether a label is uppercase — propose it and wait rather than authoring it speculatively. Where the work itself has been agreed, build all of it without stopping to re-ask; an agreed roster is an instruction to execute, not a list to re-litigate one item at a time.
