# bravoixr

Shared **Astro component library** imported by my software projects to keep their design consistent.

## What this is

A set of `.astro` components — with typed props, slots and their own scoped styles — built on a design token system that defines the values and styling making my software recognizably _mine_.

Two halves:

- **Tokens** define the identity: colour, typography, layout, motion, icons.
- **Components** consume them, so a project imports a component rather than assembling classes and hoping the combination is valid.

## Contents

- **Identity decisions** (`identity/`) — human-readable Markdown documenting the design taste, one file per category. The source everything else transcribes from.
- **Design tokens** — two tiers in separate folders: `primitives/` (raw literal values) → `semantics/` (meaning). The portable source of truth.
- **daisyUI theme bridge** (`daisyui/`) — maps semantic tokens onto daisyUI's theme CSS variables, so any daisyUI component in use renders in bravoixr's identity.
- **Components** (`components/`) — grouped by family: `page/` for the canvas and its chrome, `container/` for arrangement, `display/` for presenting content.

## Principles

- **Own the tokens, the taste, and the components.** Components are designed on their own terms rather than wrapping a pre-existing stylesheet.
- **Use daisyUI only where it earns its place.** If a component can be written without it, none of its classes are used. Where daisyUI supplies genuine behaviour — modals, dropdowns, popovers, focus management, positioning, accessibility — it is rented rather than reimplemented. Static layout is not a reason to reach for it.
- **One value per concept**, referenced everywhere — never inline a raw value.
- **Component only when reused** (2+ times) — never speculatively.
- **A component's styling is its own.** Scoped to the component, unreachable from outside, so a consumer cannot accidentally depend on internals.
- **CSS is the token source today; portable to JSON/Style Dictionary** when a non-web (e.g. MAUI) target appears.

## Layers

| Layer | Job |
| --- | --- |
| Primitive tokens | Raw values, no meaning (`--bravoixr-blue-600`) |
| Semantic tokens | Meaning mapped onto primitives (`--bravoixr-color-primary`, `--bravoixr-spacing-5`) |
| daisyUI theme bridge | Maps semantic tokens onto daisyUI's own theme CSS variables (`--color-primary`, `--radius-field`) |
| Components | `.astro` components consuming semantic tokens — the public API |

## Structure

```
apps/bravoixr-astro/     the component library
  identity/      design decisions, one Markdown file per category
  primitives/    raw literal CSS values (color, typography, layout, motion, icons)
  semantics/     meaning mapped onto primitives (+ inline dark theme)
  daisyui/       bridges semantic tokens onto daisyUI's theme CSS-variable contract
  components/    Astro components, grouped page/ container/ display/
  index.css      token entry — import order: primitives → semantics → daisyui
apps/preview-astro/      preview site for the tokens and components
```

Five measurable categories (color, typography, layout, motion, icons) run through `identity/`, `primitives/` and `semantics/`. **Feel** (density, taste) and **media** (decorative-artwork direction) are `identity/`-only. `layout` combines spacing, sizing, radius, borders, elevation and z-index.

## Consuming bravoixr

Load **daisyUI** and Tailwind, import the token entry point, then import components:

```astro
---
import 'bravoixr/index.css';
import Page from 'bravoixr/components/page/Page.astro';
import PageBody from 'bravoixr/components/page/PageBody.astro';
import DisplayCard from 'bravoixr/components/display/DisplayCard.astro';
---

<html lang="en" dir="ltr" data-theme="light">
  <head>…</head>
  <Page>
    <PageBody title="Colour" description="Brand, status and accent ramps.">
      <DisplayCard>…</DisplayCard>
    </PageBody>
  </Page>
</html>
```

- **Components first.** Each bundles the correct combination of tokens, so you can't assemble an invalid pairing.
- **Tokens are the escape hatch.** For layout, spacing and one-offs no component covers, reference the semantic tokens directly (`gap: var(--bravoixr-spacing-5)`). Never reference primitives.
- **Theming is explicit.** Always set both `data-theme` (`light` or `dark`) and `dir` (`ltr` or `rtl`) on the root element — the themed colour/icon and scripted typography roles are defined per state with no default, so an unset context leaves them unresolved by design. Both attributes work on any subtree root too, so a nested island fully overrides its context.
- **Fonts.** Load the named fonts yourself (Bricolage Grotesque, IBM Plex Sans Arabic, JetBrains Mono, Material Symbols) — the system declares the family stacks only.

## Legacy

`apps/bravoixr/` holds the original CSS class system and `apps/preview/` its preview site. The component library began as a class-by-class migration of it; that approach was retired in favour of designing components on their own terms, so those classes are no longer a reference. Both apps remain in the repo untouched while their disposition is decided.

## Releases

Undecided while the legacy app's future is open. `apps/bravoixr/release.json` records `v0.4.5` for the CSS system; the Astro package is not yet versioned or published.

## Targets

Web first, via Astro. Non-web (MAUI/native) is planned — the token source is kept portable for that.
