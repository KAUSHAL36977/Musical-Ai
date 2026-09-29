## 2025-05-20 - Accessible Audio Controls & Tooltips
**Learning:** Audio player controls with icon-only buttons (Play, Pause, Skip) and range sliders (Seek, Volume) are unannounced or poorly described on screen readers if missing explicit `aria-label` and `title` tooltips.
**Action:** Always provide explicit `aria-label` and `title` attributes on audio player action buttons and sliders to ensure both keyboard/screen-reader accessibility and hover tooltips for mouse users.
