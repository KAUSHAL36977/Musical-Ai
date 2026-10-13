## 2026-10-13 - Accessible Audio Player Controls

**Learning:** Custom audio player UI controls (play/pause, skip, volume, progress sliders) using icon-only buttons need explicit `aria-label` and `title` attributes, as well as dynamic state indicators (e.g. "Play track" vs "Pause track"), so screen readers and mouse users can understand interactive controls.

**Action:** Always provide descriptive `aria-label` and `title` props on icon-only control buttons and custom slider ranges in media components.
