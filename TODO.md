# Project TODO List

## Phase 1: Core Setup & Landing Page

- [x] Set up Next.js project structure (already done)
- [x] Configure TypeScript, ESLint, Tailwind CSS (already done)
- [ ] Create basic layout component (e.g., `Layout.tsx`)
- [ ] Implement landing page (`/`) with title, description, and "Enter Exhibition" button

## Phase 2: Gallery View

- [ ] Define data structure for artworks (e.g., `artworks.json` or JS module)
- [ ] Create gallery page (`/gallery`)
- [ ] Fetch and display artworks as a vertical list (titles/thumbnails)
- [ ] Add hover effects/animations to gallery items
- [ ] Implement navigation from landing page to gallery view

## Phase 3: Artwork Viewer

- [ ] Create dynamic route for individual artworks (`/artwork/[slug]`)
- [ ] Implement Artwork Viewer component
- [ ] Load and render placeholder/sample artwork code (e.g., simple Canvas animation)
- [ ] Implement fullscreen mode for artwork viewer
- [ ] Add minimal UI overlay (Description, Navigation, Return)
- [ ] Implement description toggle/display logic
- [ ] Implement "Previous" and "Next" navigation between artworks
- [ ] Implement return to gallery functionality (e.g., Escape key or button)
- [ ] Handle artwork-specific interactions (mouse/keyboard input)

## Phase 4: Styling & Polish

- [ ] Apply visual design elements (dark theme, typography, transitions) based on UID
- [ ] Ensure responsive design for mobile and desktop
- [ ] Implement smooth page/component transitions (e.g., curtain reveal)

## Phase 5: Accessibility & Deployment

- [ ] Implement keyboard navigation
- [ ] Add ARIA labels and ensure semantic HTML
- [ ] Test for contrast and readability
- [ ] Prepare for deployment (Vercel/Netlify)
- [ ] Final testing and bug fixes

## Phase 6: Add Actual Artworks

- [ ] Integrate final code-based artworks into the structure
- [ ] Update artwork metadata (titles, descriptions, slugs)
- [ ] Test each artwork individually within the viewer 