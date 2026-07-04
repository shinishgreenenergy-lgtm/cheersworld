# Cheers Wisdom Homepage v2 — Design

**Date:** 2026-07-04
**Source:** "Cheers Wisdom Digital Headquarters — Homepage Enhancement Specification v2.0"
**Scope:** Spec Phases 1 + 2 combined. Phase 3 (interactive research explorer, academy, developer portal, media centre, advanced search, collaboration map) is explicitly out of scope for this cycle.

## Goal

Transform the homepage from a startup landing page into an enterprise-grade **AI Human Intelligence Platform** homepage that establishes credibility with governments, hospitals, researchers, universities, enterprises, schools, investors, and media. The page must read as *one platform powering multiple domains*, not a collection of unrelated products.

## Decisions (locked with owner)

1. **Scope:** Phases 1 + 2 together, one build cycle.
2. **Page architecture:** Single homepage, no subpages this cycle. Nav items link to homepage anchors where a section exists; everything else renders as a non-clickable "Soon" state. No dead `#` links.
3. **Canonical solutions lineup (7):** Cheers Health, Cheers Digital, Cheers Mining, Cheers Drive, Cheers Presence, Cheers Finance, Cheers Sports. Replaces Wellthy / Fashion / Research naming everywhere.
4. **Hero visual:** Keep the WebGL glass brain as the central platform node; add an orbital ring of 8 animated domain nodes around it (DOM/SVG overlay).
5. **Hero headline:** "One AI Platform. Multiple Human Outcomes."
6. **Content policy:** Structure now, real content later. Only verifiably real content ships (existing partners, testimonials, collaborations, honest counts). Everything unavailable shows "Coming Soon" — never fabricated numbers, papers, people, or outcomes. All content lives in `src/lib/content/` so real data drops in without touching components.
7. **Architecture approach:** Evolve in place — extend the existing section/component/content patterns; consolidate overlapping spec sections; lazy-load heavy visuals. Zero new dependencies.

## Information architecture

16 homepage blocks covering all 20 spec sections. Ordering follows a credibility arc: *who we are → what we believe → the science → the platform → the proof → the people → engage.*

| # | Block | Anchor | Covers spec § | Status |
|---|-------|--------|---------------|--------|
| 1 | Header + mega menu | — | 1 | upgrade |
| 2 | Hero | `#top` | 2 | upgrade |
| 3 | Trust bar | `#trust` | 3 | upgrade |
| 4 | About + timeline | `#about` | 4 | upgrade |
| 5 | Five Dimensions | `#dimensions` | 5 | upgrade |
| 6 | Scientific Foundation wheel | `#science` | 6 + 9 (merged) | new |
| 7 | Platform hub-and-spoke | `#solutions` | 7 | replaces Products |
| 8 | Platform Architecture flow | `#architecture` | 8 | new |
| 9 | Research | `#research` | 10 + 14 (merged) | new |
| 10 | Evidence | `#evidence` | 11 + 15 (merged) | new |
| 11 | Dashboards | `#dashboards` | 12 | new |
| 12 | Government | `#government` | 13 | new |
| 13 | Testimonials | `#testimonials` | 16 | upgrade |
| 14 | Team | `#team` | 17 | new |
| 15 | Gallery | `#gallery` | 18 | new |
| 16 | Knowledge Centre / CTA / Footer | `#knowledge`, `#contact` | 19 + 20 | new/upgrade |

**Consolidation rationale:** spec §6 (Science) and §9 (Scientific Foundation) enumerate the same disciplines; §10 (Research Preview) and §14 (Publications) both render publication cards; §11 (Evidence Preview) and §15 (Case Studies) both follow Challenge → Platform → Outcome → Evidence. Shipping them separately would duplicate content and weaken the enterprise impression.

## Block designs

### 1 · Header / mega menu
- Seven groups matching the spec: **Platform, Science, Research, Solutions, Industries, Evidence, Company**. Contact remains the header CTA button. Existing glass panel design is retained; this is a content restructure.
- Group contents follow the spec lists (Platform: overview, four engines, analytics, reports, AI architecture, responsible AI, security, integrations; Science: 8 disciplines; Research: studies, trials, publications, papers, patents, whitepapers, universities, research team; Solutions: 7 solutions × 5 facets; Industries: 9 industries; Evidence: outcomes by domain, case studies, ROI, success stories; Company: story, vision, mission, leadership, advisors, team, gallery, media, careers, contact).
- **Coming-soon pattern:** a nav item without an `href` renders muted with a small "Soon" chip and is not a link. Items with an `href` point at a real homepage anchor.
- **Solutions panel:** each of the 7 solutions is a row with five compact facet links (Overview → `#solutions`; Research / Evidence / Demo / Use Cases → Soon).
- **Search:** ⌘K command palette, hand-rolled (~100 lines), indexing nav items + homepage sections; opens from a header search icon. Client-side only.
- Sticky behavior unchanged. Breadcrumbs deferred until subpages exist.
- Mega menu becomes keyboard-operable (focus/Escape handling), not hover-only.

### 2 · Hero
- Badge: "Human Intelligence Platform". Headline: **"One AI Platform. Multiple Human Outcomes."**
- Supporting copy communicates: one AI platform → multiple domains → continuous understanding → adaptive interventions.
- **Philosophy loop (signature element):** animated ribbon of six nodes — Observe → Understand → Predict → Intervene → Measure → Improve — active node pulses and auto-advances, looping; reduced-motion renders it static. Sits under the hero copy. The motif is reused in the Architecture block.
- **Visual:** WebGL glass brain retained as the hub. A DOM/SVG orbital ring of 8 domain nodes (Healthcare, Education, Mining, Transportation, Government, Finance, Sports, Social Wellbeing) surrounds the canvas: animated connection lines with traveling pulses, gentle float, hover highlights a node's connection, subtle scroll parallax. Because the ring is DOM, the existing WebGL → WebP fallback path is unaffected.
- CTAs: primary "Explore the Platform" → `#solutions`; secondary "Request a Demo" → `#contact`.

### 3 · Trust bar
- Partner logos grouped: **Clinical** (NIMS Jaipur, NIMS Hyderabad, Medtrina, Renova, Ujala Cygnus), **Academic** (Sancheti School, Modern School, Amity), **Research** (Faubert Lab, CIIPS, Amity Cognitive Computing Lab), **Government** (Coming Soon), **Technology** (Coming Soon).
- Metrics band: honest counts derived from the real partner lists (5 hospitals, 2 schools, 3 research labs) animated with NumberFlow. Publications, Clinical Studies, AI Interactions, Countries, Patents, Awards render "Coming Soon" chips until the owner supplies real numbers.

### 4 · About + timeline
- Mission / Vision / Platform Philosophy as three cards (copy adapted from existing About + spec framing).
- Horizontal scroll-driven company timeline: 2019 → Research → Clinical Trials → School Pilots → Government Pilots → Multi-domain Platform → Future Vision. Milestones are data objects; owner refines dates/labels later.

### 5 · Five Dimensions
- Interactive selector over Physical, Mental, Social, Cyber, Financial. The active dimension fills a detail panel: definition, why it matters, AI assessment, intervention approach, related solutions, research/evidence links (anchor or Soon).
- Definition and why-it-matters copy is definitional (safe to author); assessment/intervention copy describes platform capability without inventing outcomes.

### 6 · Scientific Foundation wheel
- Interactive SVG wheel: 8 discipline segments (Situational Awareness, Neuroscience, Behaviour Science, Psychology, Human Factors, Decision Science, Digital Phenotyping, Outcome Science) around an "AI + Continuous Learning" core.
- Hover/tap a segment → explainer card beside the wheel (what the discipline is, how the platform uses it). Dedicated science pages are Soon.

### 7 · Platform hub-and-spoke
- Central "Human Intelligence Platform" node; animated SVG connections fan out to 7 solution cards on scroll into view.
- Card: icon, name, tagline, domain, five facet links (Overview anchor; others Soon).

### 8 · Platform Architecture flow
- Assessment → Situational Awareness → Behaviour Intelligence → Prediction → Intervention → Reports → Analytics → Continuous Learning, with a drawn return path closing the loop.
- Horizontal on desktop, vertical on mobile; stages reveal sequentially on scroll; each stage has icon + one-line explanation.

### 9 · Research
- Tabs: **Publications / Studies & Trials / Patents / Collaborations**.
- Publication card schema (Nature-style): title, authors, journal, year, DOI, status badge (Published / In Review / In Preparation), download link — every field optional. A `kind` field (journal / conference / poster / whitepaper) lets the Publications tab cover spec §10's conference papers, posters, and whitepapers with one card type.
- Until real papers exist: Studies & Trials lists real in-progress work (e.g. clinical study with NIMS Jaipur, NeuroTrackerX collaboration with Faubert Lab); Publications and Patents show designed "Coming Soon" cards; Collaborations lists the real institutions.

### 10 · Evidence
- 7 domain cards: Healthcare, Education, Mining, Transportation, Finance, Sports, Government.
- Each expands to Challenge → Platform → Outcome → Evidence. Challenge/Platform copy is descriptive of the problem space and product approach; Outcome/Evidence are "Coming Soon" until real data exists.

### 11 · Dashboards
- Tabbed device-frame previews, coded as React mock UIs, each labeled **"Illustrative preview"**: Hospital, School, Mining, Fleet, Government, Research.
- Heaviest new block → lazy-loaded, mounts near viewport only.

### 12 · Government
- Program-area grid: Healthcare, Education, Road Safety, Mining, Smart Cities, Police, Public Health.
- Implementation journey diagram: Problem → Pilot → Implementation → Reports → Expected Outcomes.
- CTA: "Talk to our government team" → `#contact`.

### 13 · Testimonials
- Keeps the three real quotes (Dr. Sundeep Mishra / Ujala Cygnus; Principal / Modern School; trial patient / Jaipur) with category chips (Doctor, Educator, Patient).
- Card design is video-ready (poster + play → modal video) and activates per-item when a video file is provided. Only categories with content render.

### 14 · Team
- Grouped grid: Leadership, Scientific Advisors, Clinical Experts, Engineering, Research, Operations.
- Card: photo (initials fallback), name, role, affiliation, optional link. Ships with structure and graceful placeholder states until the owner supplies bios. Careers CTA included.

### 15 · Gallery
- Filterable masonry over 8 categories (Hospitals, Schools, Conferences, Research, Workshops, Government Meetings, Awards, Media Coverage), driven by a data array pointing at `/public/gallery/`.
- Ships with a tasteful "Gallery coming soon" empty state until photos are added.

### 16 · Knowledge Centre + CTA + Footer
- Knowledge Centre (replaces blog): topic tiles (AI, Healthcare, Cyber Safety, Behaviour Science, Finance, Sports, Road Safety) — Soon; **Glossary** of ~10 real definitional terms (authored in this cycle); **FAQ** accordion of ~6 answers drafted from verifiable site facts (owner reviews); Videos — Soon.
- CTA block: retained, copy updated to platform positioning.
- Footer expands to spec columns: Products, Science, Research, Industries, Resources, Knowledge Centre, Trust Centre (Privacy, Responsible AI, Accessibility), Media, Investors, Careers — using the same no-dead-link Soon pattern — plus a newsletter signup via Netlify Forms (compatible with static export).

## Technical design

### Content model
- Split `src/lib/content.ts` into `src/lib/content/` modules (`nav.ts`, `hero.ts`, `trust.ts`, `about.ts`, `dimensions.ts`, `science.ts`, `platform.ts`, `research.ts`, `evidence.ts`, `dashboards.ts`, `government.ts`, `testimonials.ts`, `team.ts`, `gallery.ts`, `knowledge.ts`, `footer.ts`) with an `index.ts` barrel preserving existing import paths.
- All content typed. Core shared type: a link whose `href` is absent renders as a "Soon" chip — dead links are impossible by construction.

### Components
- One file per section in `src/components/sections/` (upgrade in place where the section exists).
- Signature visuals as dedicated components: `PhilosophyLoop`, `DomainRing`, `ScienceWheel`, `HubSpoke`, `ArchitectureFlow`, `CompanyTimeline`; dashboard mocks under `src/components/dashboards/`.
- Reuse existing primitives: `Reveal`, `SectionHeading`, `Marquee`, `Button`, `Icon`, TINTS palette, glass utility classes. No visual-language reset.

### Performance
- Dashboards, ScienceWheel, and Gallery load via `next/dynamic` and mount only near the viewport.
- WebGL brain and its WebP fallback are untouched.
- All animation via the installed Motion library; every animated component honors `prefers-reduced-motion`.
- Zero new npm dependencies.

### Accessibility
- Mega menu keyboard-operable (Tab/Escape), search palette with focus trap and ARIA, diagram/wheel hotspots are real `<button>`s, one `h2` per section, WebGL canvas keeps text alternatives.

### Error handling / content safety
- Coming-soon rendering driven by absent `href`/data — no dead links, no fabricated content paths.
- Team/Gallery/Publications render designed empty states when arrays are empty.
- Newsletter form uses Netlify Forms attributes baked into static HTML; no client JS required for submission.

### Verification
- `next build` (static export) passes; ESLint clean.
- Playwright smoke pass: desktop + mobile screenshots of every block, zero console errors, every nav anchor resolves to an existing section, Soon items are not links, reduced-motion render sanity check.

## Out of scope (this cycle)
- Any subpages (platform, science, research, solution detail pages).
- Real publications/metrics/team/gallery/video content — owner supplies later via `src/lib/content/`.
- Breadcrumbs, advanced search beyond the ⌘K palette, interactive world map, knowledge graph (spec Phase 3).
