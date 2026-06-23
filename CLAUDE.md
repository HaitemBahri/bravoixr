# bravoixr — Project Rules

Project-specific rules for this repo. Global workspace rules still apply.

## What this project is

The shared design identity system. See `README.md` for the full overview. In short: define design **tokens** and **taste**, write thin **component classes** for reused elements, and **bridge** the tokens into Syncfusion's theme — rent all component mechanics from libraries.

## Hard rules

- **Tokens are the only source of values.** Never inline a raw value (color, size, radius) in component CSS or anywhere else — always reference a token.
- **Two tiers, kept separate.** Primitives (raw literal values) → semantic tokens (meaning). Component classes and the Syncfusion bridge consume **semantic** tokens only, never primitives.
- **Token values stay portable.** No `calc()`, `color-mix()`, relative color syntax, or nested `var()` math _inside a token's definition_ — store literal values so the token file can be exported to JSON/XAML later. Such functions are fine in component CSS.
- **Rent the mechanics.** Do not implement modals, dropdowns, popovers, focus management, positioning, or accessibility. Use Syncfusion (or a headless lib) and skin it.
- **Component class only when reused 2+ times.** No speculative components. One-off styling stays as plain scoped CSS.
- **Syncfusion is themed via the bridge layer**, not by restyling individual components. Pick one base theme, map tokens onto its variables once.

## Structure

- `tokens/` — CSS custom properties (primitives + semantic). The portable source of truth.
- `components/` — component classes for reused elements.
- `syncfusion-bridge.*` — token → Syncfusion theme variable mapping.
- `docs/` — design decisions and identity rationale.

## Releases

`release.json.currentRelease` is the source of truth for the active release (`vMAJOR.MINOR.PATCH`). Update it only during an explicit release cut.