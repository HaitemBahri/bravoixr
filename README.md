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
- **Components** (`components/`) — grouped by family: `page/` for the canvas and its chrome, `container/` for arrangement, `display/` for presenting content.

## Principles

- **Own the tokens, the taste, and the components.** Components are designed on their own terms rather than wrapping a pre-existing stylesheet.
- **No runtime dependencies.** No CSS framework, no component library, no build plugin — `astro` is a peer dependency and nothing else. Mechanics are authored rather than rented.
- **One value per concept**, referenced everywhere — never inline a raw value.
- **A component's styling is its own.** Scoped to the component and reachable from nowhere else, so a consumer cannot accidentally depend on internals. Nothing a component renders carries a class.
- **No CSS reset ships with the library.** Every element declares the margins it wants rather than relying on one.
- **CSS is the token source today; portable to JSON/Style Dictionary** when a non-web (e.g. MAUI) target appears.

## Layers

| Layer | Job |
| --- | --- |
| Primitive tokens | Raw values, no meaning (`--bravoixr-blue-600`) |
| Semantic tokens | Meaning mapped onto primitives (`--bravoixr-color-primary`, `--bravoixr-spacing-5`) |
| Components | `.astro` components consuming semantic tokens — the public API |

## Structure

```
apps/bravoixr/     the component library
  identity/      design decisions, one Markdown file per category
  primitives/    raw literal CSS values (color, typography, layout, motion, icons)
  semantics/     meaning mapped onto primitives (+ inline dark theme)
  components/    Astro components, grouped page/ container/ display/
  index.css      token entry — import order: primitives → semantics
apps/preview/      preview site for the tokens and components
```

Five measurable categories (color, typography, layout, motion, icons) run through `identity/`, `primitives/` and `semantics/`. **Feel** (density, taste) and **media** (decorative-artwork direction) are `identity/`-only. `layout` combines spacing, sizing, radius, borders, elevation and z-index.

## Consuming bravoixr

Import the token entry point, then the components:

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

## Releases

Undecided. The package carries no `version` and is not published; whether it ships to npm, under what name, and what its first version is are open questions.

## Targets

Web first, via Astro. Non-web (MAUI/native) is planned — the token source is kept portable for that.
