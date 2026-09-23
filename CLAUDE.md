# bravoixr — Project Rules

Project-specific rules for this repo. Global workspace rules still apply.

Project page → https://app.notion.com/p/3877e19de5c280eb803bd89e214880da
Consumer usage instructions → https://app.notion.com/p/3b17e19de5c28154bec8c701d67a9b3f (canonical, always-current usage doc for other projects — kept in sync with each release)

## What this project is

The shared design identity system. See `README.md` for the full overview. In short: define design **tokens** and **taste**, then apply them two ways: feed them into **daisyUI**'s theme-variable contract so daisyUI's own component classes render in bravoixr's identity, and write thin **component classes** (or small gap-override rules) for elements daisyUI doesn't cover or taste it doesn't expose. daisyUI is bravoixr's adopted component library — mechanics are rented from it, not reimplemented.

## Hard rules

- **Tokens are the only source of values.** Never inline a raw value (color, size, radius) in component CSS or anywhere else — always reference a token. Sole exception: `@media` **conditions** can't read `var()`, so breakpoint px are mirrored literally in the media-query text (with a comment pointing to the `--bravoixr-breakpoint-*` primitives); values *inside* the block still use tokens.
- **Two tiers, kept separate.** Primitives (raw literal values) → semantic tokens (meaning). Component classes consume **semantic** tokens only, never primitives.
- **Classes are the public API — daisyUI's for migrated components, bravoixr's for the rest.** For a component daisyUI covers and bravoixr has migrated (currently: `button`, `input`, `toggle`), consumers apply **daisyUI's own classes**; bravoixr never reimplements what it already themes. For everything else, consumers apply **bravoixr's classes**, built exclusively from semantic tokens so consumers can't assemble invalid pairings. Either way, semantic tokens are the internal seam and a *supported escape hatch* for layout/spacing/one-offs no class covers; primitives are never consumed directly. (Detail in **Consumption** below.)
- **Consuming markup builds from classes, not scattered utilities.** Screens (preview or any consumer) are built from daisyUI's own classes first, bravoixr's own classes for what daisyUI doesn't cover — never a pile of raw Tailwind utility classes standing in for a class. If a daisyUI class needs different or additional styling, author a bravoixr class with the **identical name**: bravoixr's plain, unlayered CSS always beats daisyUI's layered CSS regardless of load order (see **Consumption**), so this re-skins deterministically with no specificity fights. Reuse a daisyUI class name only when you actually want that class's real semantics re-skinned — never for an unrelated purpose (that was the bug behind the old `.card`-as-swatch-box misuse).
- **Token values stay portable.** No `calc()`, `color-mix()`, relative color syntax, or nested `var()` math _inside a token's definition_ — store literal values so the token file can be exported to JSON/XAML later. Such functions are fine in component CSS.
- **Rent the mechanics.** Component mechanics (modals, dropdowns, popovers, focus management, positioning, accessibility) are rented from **daisyUI**, bravoixr's adopted component library — never reimplemented. bravoixr skins daisyUI via the theme bridge (`daisyui/theme.css`) and, where needed, small override rules against daisyUI's own selectors.
- **Component class only when reused 2+ times.** No speculative components. One-off styling stays as plain scoped CSS.
- **Classes carry no conditionals.** A component class in `components/` never contains `[data-theme]`, `[dir]`, `:lang`, or `@media`. All context value-switching (theme, script, viewport) lives in `semantics/` by re-pointing role tokens; classes stay flow-relative and context-agnostic. (Detail in **Authoring a class** below.)
- **daisyUI is the adopted component library.** bravoixr names daisyUI explicitly and is no longer framework-agnostic (an intentional reversal of the prior stance) — the theme bridge and gap-override rules both target daisyUI's actual selectors and CSS-variable contract, not a generic abstraction.
- **bravoixr's own tokens are namespaced `--bravoixr-*`.** Every CSS custom property bravoixr defines (both primitive and semantic tiers) is prefixed, keeping it visibly distinct from daisyUI's (or any other rented library's) own CSS variables.

## Structure

The design identity system lives at `apps/bravoixr/` (deployable, per the global monorepo `apps/<app>/` convention); its preview site is the sibling app `apps/preview/`, with no versioning of its own. Paths below are relative to `apps/bravoixr/`.

**Astro migration — in progress.** Two further apps are growing alongside the originals: `apps/bravoixr-astro/` (the system as an Astro package, absorbing each component as it migrates from a CSS class to an `.astro` component) and `apps/preview-astro/` (its preview). All four coexist until the migration completes, at which point `apps/bravoixr/` and `apps/preview/` are deleted and `bravoixr-astro` is renamed to `bravoixr`. Only the two new apps are npm workspace members — `apps/bravoixr/` and `apps/preview/` have no `package.json` and are not part of the workspace.

**Freeze rule.** `apps/bravoixr-astro/` holds verbatim copies of `identity/`, `primitives/`, `semantics/` and `daisyui/`. Those four folders are **frozen in `apps/bravoixr/`** for the duration of the migration: no token, identity or bridge edit lands there. All such work goes to `apps/bravoixr-astro/` only. This removes copy drift by construction — there is exactly one editable copy.

- `identity/` — human-readable design decisions, one Markdown file per category. The creative source the token layers transcribe from.
- `primitives/` — raw literal CSS custom properties (no meaning, no `var()`). The portable source of truth.
- `semantics/` — meaning mapped onto primitives (`--bravoixr-color-primary`, `--bravoixr-btn-height`). The single seam components reference. Dark theme is handled **inline** here (`[data-theme="dark"]`), no separate `themes/` folder.
- `daisyui/` — bridges bravoixr's `--bravoixr-*` tokens onto daisyUI's own theme CSS-variable contract (`--color-primary`, `--radius-field`, etc.), under the same `[data-theme]` states `semantics/color.css` uses. Isolates all daisyUI coupling to this one layer. Filled in incrementally as components migrate — currently covers what `.btn`/`.input` (`--radius-field`, `--size-field`), `.toggle`/`.checkbox`/`.radio` (`--radius-selector`, `--size-selector`), and `.card` (`--radius-box`) each need, plus the shared `--color-*` role tokens every migrated component reads.
- `components/` — for elements daisyUI doesn't cover (`page`, `text`, `icon`, and the still-unmigrated `card`), plus small gap-override rules against daisyUI's own selectors where a migrated component's taste doesn't fit daisyUI's theme variables, or where an unmigrated component's anatomy reuses a daisyUI part internally. Currently `button`/`input`/`toggle` need no gap-override at all — each is consumed as pure daisyUI. `card` is one such case: its base class is a gap-override on daisyUI's `.card` (trimmed to just padding/background/color). Its anatomy classes split further: `card-title` deliberately reuses daisyUI's own `.card-title` class, keeping its flex layout (`display:flex`/`align-items`/`gap`) and re-skinning only typography; `card-description` and `card-header` have no daisyUI equivalent and stay full bravoixr implementations. `card-footer` and `card-media` were previously listed here as having no equivalent, which is inaccurate — daisyUI ships `.card-actions` (`display:flex; flex-wrap:wrap; gap`), differing from `card-footer` only in `justify-content` and the auto-margin pin, and it rounds and clips a first-child `<figure>` to the card's radius, switching which corners between the stacked and `.card-side` layouts. The Astro components rent both (see `CardFooter` and `CardImage` in `apps/bravoixr-astro/`); the CSS classes in this app predate that finding and are unchanged under the freeze rule. `page` is the other: its topbar and footer bars (`.navbar`, `.footer`) gap-override daisyUI's own selectors of the same name — redeclaring layout so the box model is self-contained, plus bravoixr's own full-bleed sizing and surface fill — while reusing daisyUI's `.navbar-start`/`-center`/`-end` and `.footer-title`/`.link`/`.link-hover` sub-parts as-is; every other `page-*` class has no daisyUI equivalent. Consumes semantic tokens only.
- `index.css` — single entry point. Import order is fixed: **`primitives/` → `semantics/` → `daisyui/` → `components/`**.

## Consumption

**During the Astro migration, this section describes `apps/bravoixr/`, which remains the only consumable form.** `apps/bravoixr-astro/` is private, unpublished and resolvable only through a local workspace link — nothing consumes it yet, and consumers keep applying the classes below unchanged. The typed-component API replaces this section at cutover, not before.

bravoixr is layered as a **public/internal contract**, split across two delivery mechanisms depending on whether a component has migrated to daisyUI:

- **Primitives** (`--bravoixr-blue-600`) — raw values, no meaning. Internal; never consumed directly.
- **Semantic tokens** (`--bravoixr-color-primary`, `--bravoixr-control-height`) — meaning mapped onto primitives; single vars. The internal seam — and a *supported escape hatch* consumers may use for layout, spacing, and one-offs no class covers (atomic tokens carry no combination risk).
- **daisyUI's own classes** — the public API for migrated components (currently: `button` — `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-success`, `.btn-warning`, `.btn-error`, `.btn-ghost`, `.btn-square`; `input` — `.input`, `.input-primary`, `.input-secondary`, `.input-success`, `.input-warning`, `.input-error`; `toggle` — `.toggle`/`.checkbox`/`.radio`, each with `-primary`/`-secondary`/`-success`/`-warning`/`-error`). bravoixr feeds its tokens into daisyUI's theme contract (`daisyui/theme.css`) so these classes render in bravoixr's identity with no bravoixr-authored class needed; only a few gap-override rules remain in `components/` for taste daisyUI's theme variables don't expose.
- **bravoixr's own classes** — the public API for everything else: elements daisyUI doesn't cover (`page`, `text`, `icon`), and components not yet fully migrated (`card` — its base class is a daisyUI gap-override; `card-title` similarly reuses and re-skins daisyUI's own class, while `card-description`, `card-header`, `card-footer`, and `card-media` are full bravoixr implementations with no daisyUI equivalent). `page` itself has no daisyUI equivalent, but its topbar and footer bars gap-override daisyUI's `.navbar` and `.footer` selectors the same way.

Consuming a migrated component means loading daisyUI (e.g. via CDN, pinned to a major version) **before** bravoixr's stylesheet, then applying daisyUI's classes directly:

```html
<link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
<link rel="stylesheet" href="bravoixr/index.css">

<button class="btn btn-primary">Save</button>
```

This works without CSS specificity tricks: daisyUI's CSS ships inside Tailwind's cascade layers, and bravoixr's plain, unlayered CSS always wins over layered rules regardless of load order.

Class types (bravoixr's own, non-migrated components only):

- **Component classes** (`.card`) — reused elements.
- **Combination classes** (e.g. `.surface-raised` setting background + text + border together) — how safe colour pairings are delivered, so consumers never hand-assemble colour roles.

The **component class only when reused 2+ times / no speculative** rule still governs; the class catalogue grows with real reuse. Because classes (bravoixr's own, and daisyUI's for migrated components) are the contract, semantic-token wiring can be refactored without breaking consumers. Consumers still set `data-theme` / `dir` for theming and load the named fonts themselves (the system declares family stacks only).

### Authoring a class or override (layer-3 rules)

Every class in `components/` — bravoixr's own classes and gap-override rules against daisyUI's selectors alike — follows these four rules:

- **Semantic tokens only.** Reference semantic tokens — never primitives, never raw literal values.
- **No conditionals in the class.** No `[data-theme]`, `[dir]`, `:lang`, or `@media` inside `components/`. All context value-switching (theme light/dark, script en/ar, viewport desktop/tablet/mobile) lives in `semantics/` by re-pointing role tokens.
- **Flow-relative.** Use logical properties (`padding-inline`, `margin-inline`, `border-inline`, `inset-inline`, `*-block`) so RTL mirrors automatically from `dir`; never physical `left` / `right` / `top` / `bottom` sides.
- **Corollary.** If a class needs a value that varies by context, add or elevate a semantic role token rather than adding a conditional to the class.

### Authoring an Astro component (`apps/bravoixr-astro/components/`)

**Layout.** Components are grouped by family, one folder each: `components/page/` (the page canvas and its chrome) and `components/container/` (`ContainerStack`, `ContainerGrid` — arrangement only, no appearance of their own), with `components/card/`, `components/text/`, `components/icon/` as those land. **Family folders are kebab-case; component files stay PascalCase** — `components/page/PageBody.astro`. The two casings in one path are deliberate: the folder is a path segment, so the workspace tie-breaker gives it kebab-case, while the filename *is* the identifier you import. `.astro` files cannot be re-exported through a JS barrel, so there is no index file and consumers import the full path.

Note Astro derives a component's scope hash from its **file path**, so moving a component changes every `data-astro-cid-…` it emits, in both the HTML and the CSS. Nothing renders differently, but a pure file move produces a wholesale diff in the built output — compare by canonicalising the ids rather than byte-for-byte, and expect any snapshot of built CSS to need regenerating.

The four rules above carry over unchanged — semantic tokens only, no conditionals, flow-relative, elevate a role token rather than branching. Astro components add one more:

- **A component's CSS lives in its own `<style>` block and is not reachable from outside it.** Nothing the component renders carries a class for bravoixr's own styling: a class in the DOM is a public selector a consumer can target and override. Style bare element selectors and let Astro's scoping do the work — `h2 { … }` compiles to `h2[data-astro-cid-…]`, which nothing outside the component can address.
- **Rented classes are exempt.** daisyUI's own classes (`.navbar-start`, `.footer-title`, `.link`, …) stay on the markup as daisyUI's public API, per **Rent the mechanics**. The rule governs bravoixr-authored CSS, not the library's.
- **Slotted content is never styled by the component.** Content passed through a `<slot />` is rendered by the consumer and never carries the scope attribute, so a scoped `p { … }` reaches the component's own description and leaves a consumer's `<p>` alone. This is what makes bare element selectors safe; it also means any rule that *must* reach slotted content needs an explicit `:global()`.
- **Known exception — `Page.astro`.** Astro exempts `html`/`body` selectors from scoping, so Page's canvas rule emits as a global `body { … }`, and its box-sizing rule is deliberately `:global()` so it reaches every descendant. Both are unavoidable for that component; no other component may rely on either mechanism.
- **A prop-driven variant reaches the CSS through a `data-` attribute, not a class.** A class on a rendered element is a public selector a consumer can target, which the first rule forbids. `<div data-axis={axis}>` with `div[data-axis="column"] { … }` compiles to `div[data-astro-cid-…][data-axis="column"]` — the rule stays in the component's own `<style>` and stays scoped to it. Use `define:vars` instead where the value is arbitrary rather than one of a few known states.
- **A layout keyword from a prop is the one exception to Tokens are the only source of values.** `row`/`column` and the like are structure the consumer chooses, not design values; everything such a rule *sets* still comes from semantic tokens.
- **Layout variants keyed on a rented ancestor class are permitted.** The banned conditionals above are *ambient context* — theme, script, viewport — which must stay in `semantics/` by re-pointing role tokens. A layout variant is different: the consumer chooses it explicitly through a prop, it does not vary by context, and both branches still read semantic tokens. Where the variant class is card-level but the affected box is a child component, the child keys off the rented class — e.g. `CardImage` uses `:global(.card-side) figure { … }`, compiling to `.card-side figure[data-astro-cid-…]`, because `Card` must own `.card-side` and cannot pass it down.

## Categories

Five measurable categories carry through `identity/`, `primitives/`, and `semantics/` as same-named files: **color, typography, layout, motion, icons**. Two further categories are `identity/`-only with no token file: **feel** (density, taste rules) and **media** (decorative-artwork direction).

- `layout` is the combined structural/spatial system: spacing, sizing, radius, border widths, elevation (shadows), and z-index / layers.
- **Surface boundary:** surface *colors* live in `color` (they theme in dark mode); surface *shadow + stacking* live in `layout`.
- **Cross-category rule:** a semantic category file references only the matching primitive category (semantic `color.css` → primitive color tokens only, etc.).

## Releases

`release.json.currentRelease` is the source of truth for the active release (`vMAJOR.MINOR.PATCH`). Update it only during an explicit release cut.

**During the Astro migration:** neither `apps/bravoixr-astro/` nor `apps/preview-astro/` carries a `version` field in its `package.json`, deliberately — so no native manifest competes with `release.json`, which stays the sole version source of truth. The shift to `package.json` happens at cutover, not before. Note also that `.github/workflows/linear-release.yml` filters on `include_paths: apps/bravoixr/**`, which does not match `apps/bravoixr-astro/**`; this is left as-is because the cutover rename restores the glob on its own.

**Keep the consumer usage-instructions page in sync.** As part of each release cut, update the Notion page linked above in place — rename its title to `Bravoixr vX.Y.Z` and refresh its content to match the new release, including its **Overridden classes** (gap-overrides on daisyUI selectors) and **bravoixr's own classes** (no daisyUI equivalent) sections — re-derive both from `apps/bravoixr/components/*.css` each time rather than hand-copying the previous release's lists, since classes get added or migrated over time. Same page, same URL, so the links in this file and README.md never go stale.

Future releases use the app-scoped naming: tag `bravoixr/vX.Y.Z`, release branch `release/bravoixr/vX.Y.Z`, Linear milestone `bravoixr vX.Y.Z`. Existing `v0.1.0`/`v0.2.0` tags, branches, and milestones are left as-is — naming rules apply going forward only. `preview` has no independent version or release of its own.

## Working agreements

- **Where rules live.** Always record any new rule, preference, convention, or remembered fact for this project in **this local `CLAUDE.md`** — never in the global `~/.claude` folder (no `~/.claude/projects/.../memory` files, no edits to the global `CLAUDE.md`).
- **No unapproved additions.** Deliver only what was explicitly discussed and approved. Do not introduce extra sections, values, or decisions on initiative — even if they seem in-scope or helpful. If something else seems warranted, propose it and ask before writing it in; confirm taste/scope decisions up front rather than authoring them speculatively.