# Typography

The decided type identity — the creative source the primitive and semantic typography layers later
transcribe. Alongside color and layout, typography carries the system's recognizable identity.

Each decision lists the **decided value(s)** and a one-line **why**. Sizes and family names are
literal on purpose: identity is where raw values are chosen; later layers only reference them.

## Direction

- **Minimal / modern, sans-serif throughout** — no serif, no decorative faces.
  _Why: a clean grotesque reads as current and confident and lets color + layout do the expressive work._
- **Expressive headings over a quiet body** — a large, confident display ramp sits above calm,
  lightweight body text.
  _Why: the contrast between bold headings and a light body feels modern without making the whole page loud._
- **Multi-script from day one** — Latin and Arabic are first-class, each with its own family and
  its own spacing rules.
  _Why: every consuming app may ship in either script, so neither is an afterthought._

## Typefaces

The system is **multi-script**: Latin and Arabic each have their own family, plus a single mono for
code. Display and body share one family per script — hierarchy comes from size and weight, not a
second typeface. Font stacks are kept bare (family + generic only).

| Role | Family | Stack |
| -- | -- | -- |
| Latin — headings + body | **Bricolage Grotesque** | `'Bricolage Grotesque', sans-serif` |
| Arabic — headings + body | **IBM Plex Sans Arabic** | `'IBM Plex Sans Arabic', sans-serif` |
| Code (only) | **JetBrains Mono** | `'JetBrains Mono', monospace` |

- **One grotesque per script does both headings and body.**
  _Why: minimal systems get their hierarchy from size + weight; a second face would add noise without identity._
- **Script is chosen by direction** (`[dir="rtl"]` vs `[dir="ltr"]`), never blended into one
  mixed `font-family` stack.
  _Why: Latin and Arabic need different line-height and letter-spacing rules, so they are switched, not merged._
- **Mono is for code only** — code blocks and inline code — never for UI text.
  _Why: keeping mono out of the UI preserves the single, consistent type voice everywhere else._

## Type scale

- **Base: 16px = 1rem** (root). All sizes are given in both px and rem.
- **Two separate ramps** — an expressive heading ramp and a compact body ramp — because they do
  different jobs.
  _Why: headings carry impact and scale dramatically; body stays in a tight, readable band._

### Headings — `h1`–`h7`

Geometric ramp from 19 → 84, ≈ **×1.285 per step** (between a major third and a perfect fourth).

| Token | px | rem |
| -- | -- | -- |
| `h1` | 84 | 5.25 |
| `h2` | 65 | 4.0625 |
| `h3` | 51 | 3.1875 |
| `h4` | 40 | 2.5 |
| `h5` | 31 | 1.9375 |
| `h6` | 24 | 1.5 |
| `h7` | 19 | 1.1875 |

_Why: a wide, even geometric ramp gives confident display type with predictable, equal-feeling steps._

### Body — `body1`–`body5`

Hand-tuned steps (not a strict ratio); `body3` is the default reading size.

| Token | px | rem | Role |
| -- | -- | -- | -- |
| `body1` | 20 | 1.25 | context title (desktop) |
| `body2` | 18 | 1.125 | context title (tablet / mobile) |
| `body3` | 16 | 1 | **default text** |
| `body4` | 14 | 0.875 | labels |
| `body5` | 12 | 0.75 | helper text |

_Why: a narrow body band keeps running text calm and consistent; the two top steps cover context titles, the two bottom steps cover labels and helper text._

### Code — `code`, `code2`

Two sizes: a default for blocks and inline runs, and a smaller step for compact code labels.

| Token | px | rem | Role |
| -- | -- | -- | -- |
| `code` | 14 | 0.875 | code blocks / inline |
| `code2` | 12 | 0.75 | compact code label |

_Why: code is mostly one well-tuned size; the smaller step covers label-scale code (captions, chips) without borrowing a body size._

## Weights

Roles map identically across both scripts, with one exception — the default body and page-description
roles step up a level in Arabic (below). Every weight used sits in the **200–700** range that Bricolage
Grotesque and IBM Plex Sans Arabic both cover.

| Weight | Tokens |
| -- | -- |
| 700 | `h1`, `h2` |
| 600 | `h3`, `h4` |
| 500 | `h5`, `h6`, `h7` |
| 400 | `body1`, `body2` |
| 300 | `body3`, `body4` |
| 200 | `body5` |

- **Headings step down in weight as they step down in size** (700 → 600 → 500).
  _Why: the biggest type carries the most weight; smaller headings ease off so the hierarchy reads top-to-bottom._
- **Body uses light weights** (400 for context titles, 300 for default/labels, 200 for helper).
  _Why: a light body voice is what makes the type feel airy and modern under the heavier headings._
- **Arabic default body and page description step up one level (300 → 400).**
  _Why: IBM Plex Sans Arabic reads lighter than Bricolage Grotesque at the same nominal weight, so this Arabic reading text takes regular to match the Latin body's presence._

## Line-heights

Tight for headings, roomy for body — this is where "airy reading comfort" lives.

| Tier | Line-height |
| -- | -- |
| Headings (`h1`–`h7`) | 1.1 |
| Body (Latin) | 1.6 |
| Body (Arabic) | 1.7 |
| Code | 1.5 |

- **Headings sit at 1.1.**
  _Why: at these large sizes tight leading keeps multi-line headings cohesive instead of drifting apart._
- **Latin body sits at 1.6.**
  _Why: generous leading keeps reading relaxed and makes the fixed density feel airy._
- **Arabic body gets +0.1 (1.7).**
  _Why: Arabic letterforms are taller and carry diacritics, so they need a little more vertical room._

## Letter-spacing

| Context | Tracking |
| -- | -- |
| Headings (Latin) | −0.02em |
| All-caps / overline | +0.06em |
| Body & code | 0 |
| **Arabic (any size)** | **0** |

- **Latin headings tighten by −0.02em.**
  _Why: at display sizes the default gaps look loose; a slight pull makes the grotesque feel crisp._
- **All-caps runs widen by +0.06em.**
  _Why: capitals have no descenders to separate them, so they need extra air to stay legible._
- **Body and code stay at 0.**
  _Why: normal tracking is the most readable for running text and monospaced code._
- **Arabic is never letter-spaced.**
  _Why: Arabic is cursive and joined — tracking breaks the connections between letters._

## Responsive behavior

Type responds to viewport by **shifting which scale step a role uses**, reusing the one fixed ladder
— no fluid `calc()`, so the values stay portable to non-web targets.

**Headings — the "elevator":** five heading roles are visible at once, and each shifts **one step
down per breakpoint** across the seven-step ladder.

| Role | Desktop | Tablet | Mobile |
| -- | -- | -- | -- |
| Hero | `h1` | `h2` | `h3` |
| Page title | `h2` | `h3` | `h4` |
| Section title | `h3` | `h4` | `h5` |
| Subsection title | `h4` | `h5` | `h6` |
| Minor heading | `h5` | `h6` | `h7` |

_Why: one ladder serves every breakpoint; desktop uses steps `h1`–`h5`, mobile the bottom five (`h3`–`h7`), so nothing overflows the scale. The hero role sits at the ramp's top step (`h1`)._

**Body:** the responsive body roles are the **context title**, the **project title**, and the
**page description** — each is `body1` on desktop and **`body2` on tablet and mobile** (steps once
and holds). `body2`–`body5` (default, labels, helper) are the same size on every breakpoint.
  _Why: paragraph and UI text must stay readable on small screens; only the oversized top-of-page roles need to come down._

**Page-structure roles:** two body-scale roles carry the top of every page. The **project title**
(the top-bar wordmark) takes **heading** anatomy — heading family, `1.1` leading, `−0.02em` tracking
— at weight **600**, so the brand mark reads crisp and confident. The **page description** (the lede
under a page title) takes **body** anatomy — body family, `1.6`/`1.7` leading, `0` tracking — at
weight **300**, so it sits quiet and airy beneath the title. Both ride the body responsive step above
(`body1` → `body2`, once) and switch script like every other role.
  _Why: the wordmark and lede are reused on every page, so each earns a named role rather than borrowing the context title._

- **The seven-step ladder carries five heading levels, each shifted one step down per breakpoint.**
  _Why: the five roles run `h1`→`h5` on desktop and `h3`→`h7` on mobile; a sixth heading level would need a step below `h7` on mobile, which the ladder doesn't have._
- **Size step ≠ HTML element.** A page title stays an `<h1>` on every breakpoint; only the size
  step it renders at changes.
  _Why: document structure (and its accessibility/SEO meaning) must not change with the viewport._
- **Breakpoint pixel values are a layout concern** and live in `layout.md`, not here.
  _Why: this file fixes the type strategy; the literal breakpoints belong to the structural system._
