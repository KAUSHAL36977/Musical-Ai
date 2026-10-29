## 2025-05-18 - Accessible Audio Controls with Dynamic Labels and Status Announcements
**Learning:** Audio controls using icon-only buttons (Play/Pause, Seek) and range inputs (Sliders) lack clarity for screen readers unless descriptive `aria-label` attributes and screen reader live status (`aria-live="polite"`) updates are provided.
**Action:** Always add dynamic `aria-label`s to toggle controls (e.g. `aria-label={isPlaying ? 'Pause' : 'Play'}`) and `aria-label` descriptions for timeline and volume sliders.
