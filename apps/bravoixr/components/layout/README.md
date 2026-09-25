# Layout Components

Content-agnostic layout primitives. They control layout, spacing, sizing, alignment and responsive behaviour, and never carry application-specific UI or business logic. Each answers one question:

| Component | Answers |
| -- | -- |
| `LayoutContainer` | Where does content sit horizontally? |
| `LayoutStack` | How do things sit vertically? |
| `LayoutCluster` | How do things sit horizontally? |
| `LayoutGrid` | How do things occupy a grid? |
| `LayoutSplit` | How do two regions divide space? |
| `LayoutCenter` | How is something centred? |

## Props and slots

Every component renders one `<div>` with a default slot.

| Component | Props (default first) | Behaviour |
| -- | -- | -- |
| `LayoutContainer` | `width`: `page` \| `prose` · `align`: `center` \| `start` \| `end` | Caps the content box at `--bravoixr-page-max` or `--bravoixr-measure-prose`, with spacing-10 inline gutters outside the cap; `align` sets its inline position via auto margins |
| `LayoutStack` | `gap`: `5` · `align`: `stretch` \| `start` \| `center` \| `end` | Block-axis flex column |
| `LayoutCluster` | `gap`: `5` · `justify`: `start` \| `center` \| `end` \| `between` · `align`: `center` \| `start` \| `end` \| `baseline` | Inline-axis flex row that wraps |
| `LayoutGrid` | `gap`: `5` | `repeat(auto-fill, minmax(min(--bravoixr-container-column-min, 100%), 1fr))` |
| `LayoutSplit` | `gap`: `5` · `side`: `start` \| `end` | Two children: the side pane (first child for `start`, last for `end`) is based at `--bravoixr-page-sidebar-size`; the main pane grows and keeps `min-inline-size: 50%`, so the pair stacks when it can't fit side by side |
| `LayoutCenter` | `axis`: `both` \| `inline` \| `block` | Grid that centres its children on the chosen axis |

## Shared rules

- **Gap** is a spacing step `1`–`12` and maps to `--bravoixr-spacing-N`. It's set as `--bravoixr-layout-gap` on the root on every render, so a nested primitive never inherits its parent's gap.
- **Variants** reach the CSS through `data-` attributes (`data-align`, `data-side`, …), never through classes.
- **No `@media`.** Responsiveness comes from the space available: auto-fill in `LayoutGrid`, wrapping in `LayoutCluster` and `LayoutSplit`.
- **Block size is the ancestor's job.** Nothing declares a height. `LayoutCenter` on the block axis only centres when its parent gives it a definite height.
- **Only `LayoutSplit` styles slotted content.** It sizes its two children through `:global()`. The rest use `gap` and alignment only.

## Replaces `container/`

| Old | New |
| -- | -- |
| `ContainerGrid` | `LayoutGrid` |
| `ContainerStack` (`axis="row"`) | `LayoutCluster` (with `align="start"` to match) |
| `ContainerStack` (`axis="column"`) | `LayoutStack` |
