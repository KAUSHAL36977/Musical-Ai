## 2026-10-24 - Interactive Badge Accessibility Pattern
**Learning:** Decorative badges used as interactive filter tags (such as sub-genre tags) lack default keyboard focusability and screen reader semantics when assigned `onClick` handlers directly.
**Action:** Always wrap interactive `<Badge>` tags inside a `<button type="button" aria-pressed={isSelected}>` with `rounded-full` focus ring styles (`focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`) to ensure full keyboard navigation and screen reader support.
