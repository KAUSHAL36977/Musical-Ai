# Improvised Master Frontend / UI/UX Transformation Plan — Musical-Ai (Improvised)

Version: 1.1 (Improvised)
Date: 2026-06-06

This document is an actionable, prioritized expansion of the previously-saved master plan. It translates the high-level strategy into immediate tactical tasks, a compact sprint-ready backlog for Phase 0/1, and concrete acceptance criteria.

---

## Executive Summary
- Goal: Evolve Musical-Ai into a polished, conversion-ready product by building a reusable design system, improving core creation flows (wizard & generation UX), hardening accessibility and performance, and enabling product/enterprise features in a staged roadmap.
- Success metrics: Time-to-first-success < 90s for 80% of users, Lighthouse desktop > 90, WCAG AA for core flows, Storybook coverage 90% of primitives.

## Key Improvements (What I improvised)
1. Add a Phase 0 sprint with concrete code tasks and file targets for immediate wins.
2. Provide a short 3-sprint roadmap (2-week sprint cadence) with exact tickets to unblock product demos.
3. Include an implementation checklist mapping tasks to repository locations and commands.
4. Add low-risk UX microcopy and empty-state templates to increase activation.
5. Provide recommended acceptance tests and CI hooks to validate regressions automatically.

## Immediate Phase 0 (1–2 weeks) — Sprint-ready backlog
- Task A — Fix blocking build/runtime issues (day 0–1)
  - Ensure `prisma` client is generated: run `npm run db:generate`.
  - Confirm `NextAuth` endpoints return JSON and `src/lib/prisma.ts` imports succeed.
  - Files to check: [prisma/schema.prisma](prisma/schema.prisma), [src/lib/prisma.ts](src/lib/prisma.ts), NextAuth config: [src/lib/auth.ts](src/lib/auth.ts).
- Task B — Add core UI primitives (day 1–3)
  - Create `src/components/ui` primitives: `Button`, `Input`, `Card`, `Toast`, `Progress`, `Slider`, `Label` and export a central `index.ts`.
  - Files to touch: `src/components/ui/*` and `src/components/wizard/*` imports.
- Task C — Quick Storybook scaffold (day 2–5)
  - Add Storybook basic config, and stories for `Button`, `Card`, `Input`.
  - Commands: `npx sb@latest init` (or use recommended minimal config).
- Task D — Generation UX progress states (day 3–7)
  - Implement staged progress UI in `src/components/wizard/GenerationProgress.tsx`.
  - Add microcopy for stages: "Analyzing input", "Composing", "Generating audio", "Finalizing".
- Task E — Header & credits indicator (day 4–7)
  - Add persistent credits balance in header; wire to session from `auth` callbacks.

## Sprint Plan (3 sprints, 2 weeks each)
- Sprint 1 (Phase 0 + Foundation)
  - Deliver: tokens file, UI primitives, Storybook baseline, generation progress UX, header credits.
  - Acceptance: app runs locally; core flows reachable; Storybook stories for Button/Card/Input.
- Sprint 2 (Design System + Wizard)
  - Deliver: tokens -> CSS vars, theme engine, wizard progressive steps + drafts, accessibility baseline fixes.
  - Acceptance: Lighthouse baseline +10% over Sprint 1; `axe` tests pass for wizard pages.
- Sprint 3 (Motion, Mobile, Polishing)
  - Deliver: motion tokens & micro-interactions, mobile-first responsive variants, visual polish on creation flow.
  - Acceptance: Lighthouse desktop >90, mobile >65; Storybook coverage target met.

## Implementation Checklist (Files, commands, tests)
- Files to create/update
  - [src/styles/tokens.ts](src/styles/tokens.ts) — export tokens as TS + CSS var generator.
  - [src/components/ui/index.tsx](src/components/ui/index.tsx) — central exports.
  - [src/components/wizard/GenerationProgress.tsx](src/components/wizard/GenerationProgress.tsx) — staged progress UI.
  - [src/components/wizard/MusicWizard.tsx](src/components/wizard/MusicWizard.tsx) — split into step components under `wizard/steps/`.
- Commands
  - Dev run: `npm install` then `npm run dev`.
  - Prisma: `npm run db:generate` and optionally `npm run db:migrate` (only with DB configured).
  - Storybook: `npx sb@latest init` then `npm run storybook`.
- Tests & CI
  - Add `axe-core` checks in Jest/Playwright for key routes.
  - Add visual snapshot testing via Storybook + Chromatic (or Percy).

## UX Microcopy & Empty-State Templates (improvised examples)
- Wizard empty state:
  - Title: "Create your first track"
  - Body: "Pick a vibe and a length — we'll handle the rest. Try 'Lo-fi lounge' for a quick demo."
  - CTA: "Create sample track" (primary)
- Generation progress microcopy
  - Stage 1: "Analyzing your prompt"
  - Stage 2: "Composing musical ideas"
  - Stage 3: "Rendering audio — this may take up to 2 minutes"
  - Completion: "Ready — listen, remix, or publish"

## Acceptance Tests (automatable)
- Smoke: hitting `/api/auth/session` returns 200 & JSON with shape { user?: { id, email }, credits?: number }.
- UI: Storybook stories render Button and Card with no console errors.
- Accessibility: `axe` config run on `/wizard` and passes critical rules.
- Performance Regression: baseline Lighthouse scores captured and included in PR checks.

## Security & Privacy Notes
- Avoid persisting sensitive prompt text in public logs by default; redact or hash before telemetry.
- Ensure `DATABASE_URL` is not committed; use environment management and secrets in CI.

## Risks & Mitigations
- Risk: Prisma schema drift after team changes → Mitigation: require `prisma generate` as part of pre-commit or CI check.
- Risk: Motion overuse causing accessibility issues → Mitigation: respect `prefers-reduced-motion` and provide a toggle.
- Risk: Long audio jobs blocking server threads → Mitigation: offload to worker queue and stream progress via WebSocket or SSE.

## Next Immediate Steps (ask before running)
1. Commit existing fixes (UI primitives + `prisma/schema.prisma`) into a feature branch.
2. If you want, I can run `npm run db:generate` here to confirm Prisma client state (ask before I run DB commands).
3. Scaffold Storybook and add 3 sample stories for `Button`, `Card`, `Input`.

---

Prepared and saved as an improvised actionable plan to both the repository (`docs/plan-musicalAiMain.improvised.md`) and session memory.

If you'd like, I can now create the initial Storybook scaffold and wire a `Button` story next.
