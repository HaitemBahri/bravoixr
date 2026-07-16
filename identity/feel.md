# Feel

The cross-cutting taste of the system — the stances that don't belong to a single measurable
category but shape all of them. This file is identity-only: it has no token layer. Every other
identity file leans on the decisions recorded here.

Each decision lists the **decided value** and a one-line **why**.

## Aesthetic

- **Direction:** Modern & confident.
  _Why: the system should feel current and self-assured, not timid or decorative._
- **Depth:** Subtle — gently layered, never flat, never heavily shadowed.
  _Why: a little dimensionality reads as modern and polished without adding noise._
- **Where the identity lives:** the recognizable identity is carried by **color, typography, and
  layout** — not by feel-level quirks.
  _Why: those three categories do the expressive work; feel only sets structural taste._

## Density

- **One fixed density, applied everywhere** — no compact/comfortable variants.
  _Why: a single density keeps every consuming app consistent out of the box._
- **Normal control height: 40px.**
  _Why: comfortable to use and scan while staying efficient with space._

## Elevation stance

- **Hybrid** — **borders** separate resting surfaces (cards, inputs, panels); **shadows** are
  reserved for genuinely floating layers (modal, popover, menu, toast).
  _Why: borders stay crisp and render identically everywhere, so shadows keep their meaning of
  "this floats above the page."_
- **Borders are just visible** — clearly present, not hairline-faint and not heavy.
  _Why: enough to define structure without drawing attention to the lines themselves._
- Concrete border widths and the floating-layer shadow scale live in `layout.md`.
  _Why: those are measurable values; feel only sets the stance._

## Gradients

- **Gradients are part of the visual language** — used selectively in some areas instead of a flat
  solid fill.
  _Why: adds a modern, confident accent where a solid color would feel plain._
- **Gradients stay in the blue–teal family** — either one hue across two steps, or blue→teal at a
  matched step; never other hues.
  _Why: analogous hues blend cleanly and keep gradients quiet and on-brand._
- The exact ramps, stops, and direction live in `color.md`; feel only sets that gradients are in
  play and that they stay in the blue–teal family.
  _Why: keeps literal values in their own category._

## Component library

- **daisyUI on Tailwind.** The web target is daisyUI (a Tailwind v4 plugin). bravoixr authors a
  daisyUI theme mapping its colors, sizing, and typography onto daisyUI's theme variables and
  Tailwind's type scale; UI mechanics are rented from daisyUI and skinned by the theme.
  _Why: daisyUI shares bravoixr's `data-theme` switch and `--color-*` role names, so the identity maps
  directly while the token source stays portable for future non-web targets._
