# Motion

The decided motion identity — the creative source the primitive and semantic motion layers later
transcribe. Direction: minimal / modern → motion is **quiet, smooth, and purposeful**, never
decorative.

Each decision lists the **decided value(s)** and a one-line **why**. Values are literal on purpose:
identity is where raw values are chosen; later layers only reference them.

## Duration scale

A five-step scale in milliseconds; `base` is the default for most transitions.

| Token | ms | Use |
| -- | -- | -- |
| `instant` | 0 | no transition — the reduced-motion / immediate target |
| `fast` | 150 | hovers, focus, small state changes |
| `base` | 200 | **default — most transitions** |
| `slow` | 300 | larger surfaces, panels, expanding regions |
| `slower` | 500 | full-screen / modal enter |

- **Duration climbs with how much moves** — small state changes are quick, large surfaces take longer.
  _Why: a bigger change needs a little more time to stay legible; a small one should feel immediate._
- **The default is 200ms.**
  _Why: brisk enough to feel responsive, smooth enough to read as deliberate rather than abrupt._

## Easing curves

Four named curves cover entrances, exits, in-place changes, and continuous motion.

| Token | cubic-bezier | Use |
| -- | -- | -- |
| `standard` | `cubic-bezier(.2, 0, 0, 1)` | **default — most in-place transitions** |
| `decelerate` | `cubic-bezier(0, 0, 0, 1)` | elements entering the screen (ease-out) |
| `accelerate` | `cubic-bezier(.3, 0, 1, 1)` | elements leaving the screen (ease-in) |
| `linear` | `linear` | continuous motion — spinners, progress |

- **Entrances decelerate, exits accelerate.**
  _Why: things that arrive settle into place; things that leave speed away — matching how motion reads as natural._
- **In-place changes use the symmetric `standard` curve.**
  _Why: a change that doesn't enter or exit has no direction, so a balanced ease feels right._
- **Only continuous, looping motion is linear.**
  _Why: spinners and progress must move at a constant rate; eased loops would visibly pulse._

## Animation stance

- **Animate only what communicates** — state changes, entrances/exits, and feedback (hover, focus,
  press, selection, loading). Decorative or ambient motion is out.
  _Why: purposeful motion guides attention; decorative motion is the noise a quiet system avoids._
- **Animate cheap properties** — `opacity` and `transform` (and `color` for state feedback); avoid
  animating layout properties (width, height, top/left).
  _Why: opacity/transform are GPU-composited and stay smooth; animating layout causes jank._
- **Restraint is the default** — when unsure whether something should animate, it shouldn't.
  _Why: a calm, modern feel comes from motion being the exception, not the ambient state of the UI._
- **Respect `prefers-reduced-motion`** — when the user requests reduced motion, drop transforms and
  movement and collapse durations toward `instant`, keeping only very short `opacity` fades so state
  changes stay legible.
  _Why: honors a real accessibility need (vestibular motion sensitivity) without losing the cue that something changed._
