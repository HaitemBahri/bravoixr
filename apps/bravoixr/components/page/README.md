# Page Components

The page canvas and its chrome — the document shell, the bands above and below it, and the content column between them.

Titles and descriptions are props, not slots — `PageMainContainer`, `PageSection` and `PageSubSection` each take `title` and `description`.

Every text prop is bilingual: `string | { en, ar }`. A plain string is script-agnostic and shows under either direction; a pair ships both scripts and CSS drops the one that does not match `dir`, so the swap needs no reload and no JavaScript. See [Bilingual text](#bilingual-text) below.

```
Page                          <body> — consumer owns <html>/<head>
├── PageHeader                1fr auto 1fr grid
│   ├── PageBrand             claims column 1
│   ├── PageNav               <nav>, claims column 2
│   └── PageActions           claims column 3
├── PageMain                  <main> — full-bleed row, then capped row
│   ├── PageHero              full-bleed band, replaces the container title
│   ├── PageMainContainer     capped column — <h1> title, description
│   │   └── PageSection       <h2> — title, description
│   │       └── PageSubSection  <h3> — title, description
│   └── PageMainAside         rail beside the container, in the capped row
└── PageFooter
    ├── PageFooterMain
    │   ├── PageFooterBrand
    │   └── PageFooterNav     one per column: title + links
    │       └── PageFooterNavItem
    └── PageFooterBottom
```

## Props and slots

| Component | Renders | Props | Slot |
| -- | -- | -- | -- |
| `Page` | `<body>` | — | header, main, footer |
| `PageHeader` | `<header>` | — | header regions |
| `PageBrand` | `<div>`, column 1 | — | logo / name |
| `PageNav` | `<nav>`, column 2 | — | links |
| `PageActions` | `<div>`, column 3 | — | buttons, toggles |
| `PageMain` | `<main>` | — | hero, container, aside |
| `PageHero` | `<section>` | `title?`, `description?` (bilingual) — title is the `<h1>` | media, calls to action |
| `PageMainContainer` | `<div>` | `title?`, `description?` (bilingual) — title is the `<h1>` | sections |
| `PageSection` | `<section>` | `title?`, `description?` (bilingual) — `<h2>` | content, subsections |
| `PageSubSection` | `<section>` | `title?`, `description?` (bilingual) — `<h3>` | content |
| `PageMainAside` | `<aside>` | — | rail content |
| `PageFooter` | `<footer>` | — | main, bottom |
| `PageFooterMain` | `<div>` | — | brand, navs |
| `PageFooterBrand` | `<div>` | — | logo / tagline |
| `PageFooterNav` | `<nav>` | `title` (required, bilingual) | nav items |
| `PageFooterNavItem` | `<a>` | `href` (required) | link text |
| `PageFooterBottom` | `<div>` | — | copyright, version |

## Bilingual text

Every text prop takes `string | { en: string; ar: string }`:

```astro
<PageSection title="Design Tokens" />

<PageSection
  title={{ en: 'Design Tokens', ar: 'رموز التصميم' }}
  description={{ en: 'The design identity.', ar: 'الهوية البصرية.' }}
/>
```

A pair renders **both** scripts, each in its own `<span>`; `--bravoixr-script-latin` and `--bravoixr-script-arabic` in `semantics/typography.css` resolve from the ambient `dir` so exactly one is `display: contents` and the other `display: none`. The hidden script is not rendered, announced, selected or copied, and flipping `dir` on any ancestor swaps it live — no reload, no JavaScript.

A plain string is treated as script-agnostic and renders bare in both directions. Use it for proper nouns, numerals and anything that should not change.

Four consequences worth knowing:

- **Both strings ship in the HTML.** Harmless for an app; on a public page it is duplicated content in the markup.
- **Attributes cannot switch.** An attribute has no box for CSS to drop, so `PageFooterNav`'s `aria-label` takes the Latin string in both directions, and `DisplayCardImage`'s `alt` stays a plain string. This is a ceiling of the mechanism, not a gap.
- **The spans carry no `dir` of their own.** One that did would re-resolve the switching roles from its own `[dir]` block and never hide.
- **`dir` is required, as everywhere else in the system.** The switching roles are defined only inside the `[dir]` blocks, with no `:root` default — the same rule the scripted typography roles follow. Without `dir` the roles do not resolve, `display` falls back to its initial value, and **both** scripts render one after the other. That is the designed failure: an unset context shows everything rather than silently hiding content.

## Decisions

1. **`Page` renders `<body>` only.** The consumer keeps `<html>`/`<head>`, `data-theme`, `dir` and fonts.
2. **Header regions claim their own grid column** — no named slots, so a region can't land in the wrong place. `PageNav` renders `<nav>`.
3. **`PageHero` is a direct child of `PageMain`**, so it can bleed edge to edge. On a page with a hero, the hero carries the `<h1>` and the container's `title`/`description` are left unset.
4. **`PageMainContainer` owns the page `<h1>`.** Container and aside share the capped row, sized by
   `--bravoixr-page-aside-columns` (`1fr`, a spacing-10 gap track, `--bravoixr-page-sidebar-size` 280px); below 1024px it
   re-points to `1fr` in `semantics/layout.css`, stacking the aside under the container.
