# Palette's Journal

Critical UX and accessibility learnings from Musical AI.

## 2026-06-06 - Media player accessible controls & mute convenience
**Learning:** Audio player controls often rely solely on visual iconography (such as play, pause, skip, and volume indicators), leaving screen reader users without contextual cues. Additionally, volume sliders without a one-click mute/unmute toggle create friction for listeners who need quick silence.
**Action:** When creating or maintaining media player components, always pair icon-only controls with descriptive `aria-label` attributes and provide an interactive mute toggle button alongside volume sliders.
