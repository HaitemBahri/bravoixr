# Icons

The decided icon identity — the creative source the primitive and semantic icon layers later
transcribe. Icons are a measurable category parallel to typography: a single variable icon font,
governed by fixed axes and a size scale.

Each decision lists the **decided value(s)** and a one-line **why**. Values are literal on purpose:
identity is where raw values are chosen; later layers only reference them.

## Set & style

- **Google Material Symbols** (variable font), **Rounded** style.
  _Why: one comprehensive, well-maintained variable set; the rounded cut echoes the gently-rounded
  radius scale (md 8 / lg 12) and the modern, confident feel._
- **Single set, no mixing** — no second icon library alongside it.
  _Why: one set keeps every glyph visually consistent in stroke, corner, and metrics._

## Variable-font axes

Material Symbols exposes four axes. The system fixes them as follows.

| Axis | Value | Why |
| -- | -- | -- |
| **Weight (`wght`)** | 400 | Material's regular; enough presence to read at 16–20px and hold its own beside the light (300) body text. |
| **Fill (`FILL`)** | 0 (outlined), always | Outlined everywhere; selection/active state is shown by color or background, never by filling the glyph — keeps the icon language calm and uniform. |
| **Optical size (`opsz`)** | match the rendered px size (floor 20) | Setting opsz to the icon's actual size keeps stroke weight optically even across the scale; 16px icons use opsz 20, the axis floor. |
| **Grade (`GRAD`)** | 0 light · −25 dark | Reducing grade in dark mode counters stroke halation on dark surfaces, so glyphs don't read heavier than in light. |

## Size scale

A four-step scale, every step a multiple of the 4px base.

| Token | px | Use |
| -- | -- | -- |
| `sm` | 16 | inline with small text / dense rows |
| `md` | 20 | **default — inside 40px controls, beside body text** |
| `lg` | 24 | standalone / toolbar actions |
| `xl` | 32 | feature / empty-state icons |

_Why: md 20 sits one step above the 16px default body size so icons read as deliberate without
crowding text, and centers cleanly in the 40px control; the scale spans dense rows up to
feature icons without offering more steps than needed._

## Usage & alignment

- **Icons inherit the current text color** (`currentColor`) by default.
  _Why: an icon beside text should match that text's color in every state and theme without a
  separate color rule._
- **Vertically centered on the text they accompany**, with an **8px gap** (spacing step 3) between
  icon and label.
  _Why: optical centering keeps icon+label pairs aligned; one fixed gap keeps spacing consistent._
- **Inside a 40px control, the default `md` (20px) icon is optically centered.**
  _Why: 20px in a 40px control leaves balanced room on both sides at one fixed density._
