# Page Components

The page canvas and its chrome — the document shell, the bands above and below it, and the content column between them.

Titles and descriptions are props, not slots — `PageMainContainer`, `PageSection` and `PageSubSection` each take `title` and `description`.

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

## Decisions

1. **`Page` renders `<body>` only.** The consumer keeps `<html>`/`<head>`, `data-theme`, `dir` and fonts.
2. **Header regions claim their own grid column** — no named slots, so a region can't land in the wrong place. `PageNav` renders `<nav>`.
3. **`PageHero` is a direct child of `PageMain`**, so it can bleed edge to edge. On a page with a hero, the container's `title`/`description` are left unset.
4. **`PageMainContainer` owns the page `<h1>`.** Container and aside share the capped row. The aside's width and its stacking breakpoint come from `semantics/` tokens (no `@media` in the component).
