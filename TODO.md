# Project TODO List

## Phase 1: Core Setup & Landing Page
*Relevant Docs: [`SRS_art_gallery.md`](.documentation/SRS_art_gallery.md), [`UID_art_gallery.md`](.documentation/UID_art_gallery.md), [`PRD_art_gallery.md`](.documentation/PRD_art_gallery.md)*

- [x] Set up Next.js project structure (already done)
- [x] Configure TypeScript, ESLint, Tailwind CSS (already done)
- [x] Create basic layout component (e.g., `Layout.tsx`)
- [x] Implement landing page (`/`) with title, description, and "Enter Exhibition" button

## Phase 2: Gallery View
*Relevant Docs: [`SRS_art_gallery.md`](.documentation/SRS_art_gallery.md), [`UID_art_gallery.md`](.documentation/UID_art_gallery.md), [`PRD_art_gallery.md`](.documentation/PRD_art_gallery.md)*

- [x] Define data structure for artworks (e.g., `artworks.json` or JS module)
- [x] Create gallery page (`/gallery`)
- [x] Fetch and display artworks as a vertical list (titles/thumbnails)
- [x] Add hover effects/animations to gallery items
- [x] Implement navigation from landing page to gallery view

## Phase 3: Artwork Viewer
*Relevant Docs: [`SRS_art_gallery.md`](.documentation/SRS_art_gallery.md), [`UID_art_gallery.md`](.documentation/UID_art_gallery.md), [`PRD_art_gallery.md`](.documentation/PRD_art_gallery.md)*

- [x] Create dynamic route for individual artworks (`/artwork/[slug]`)
- [x] Implement Artwork Viewer component
- [x] Load and render placeholder/sample artwork code (e.g., simple Canvas animation)
- [x] Implement fullscreen mode for artwork viewer
- [x] Add minimal UI overlay (Description, Navigation, Return)
- [ ] Implement description toggle/display logic
- [x] Implement "Previous" and "Next" navigation between artworks
- [x] Implement return to gallery functionality (e.g., Escape key or button)
- [ ] Handle artwork-specific interactions (mouse/keyboard input)

## Phase 4: Styling & Polish
*Relevant Docs: [`UID_art_gallery.md`](.documentation/UID_art_gallery.md)*

- [ ] Apply visual design elements (dark theme, typography, transitions) based on UID
- [ ] Ensure responsive design for mobile and desktop
- [ ] Implement smooth page/component transitions (e.g., curtain reveal)

## Phase 5: Accessibility & Deployment
*Relevant Docs: [`UID_art_gallery.md`](.documentation/UID_art_gallery.md), [`SRS_art_gallery.md`](.documentation/SRS_art_gallery.md)*

- [ ] Implement keyboard navigation
- [ ] Add ARIA labels and ensure semantic HTML
- [ ] Test for contrast and readability
- [ ] Prepare for deployment (Vercel/Netlify)
- [ ] Final testing and bug fixes

## Phase 6: Add Actual Artworks
*Relevant Docs: [`PRD_art_gallery.md`](.documentation/PRD_art_gallery.md), [`SRS_art_gallery.md`](.documentation/SRS_art_gallery.md)*

- [ ] Integrate final code-based artworks into the structure
- [ ] Update artwork metadata (titles, descriptions, slugs)
- [ ] Test each artwork individually within the viewer 