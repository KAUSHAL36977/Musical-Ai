# Palette's UX & Accessibility Journal

## 2026-10-10 - Audio Player ARIA Labels
**Learning:** Icon-only media buttons (Play/Pause, Skip) and range sliders without visible labels fail screen reader accessibility tests unless explicitly labeled with `aria-label` attributes reflecting their action or current state.
**Action:** Always verify icon-only controls and custom sliders have descriptive `aria-label` attributes (and dynamic labels where appropriate, e.g., Play vs. Pause).
