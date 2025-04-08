# Software Requirements Specification

## System Design
- A single-page web app structure with dynamic routing for each artwork
- No backend or server-side storage; all content is served statically or executed client-side
- Artworks are self-contained code components rendered in the browser
- Emphasis on fullscreen, immersive experience per artwork
- Scroll-based or click-based navigation for switching between artworks

## Architecture pattern
- Monolithic Next.js app using file-based routing
- Static site generation (SSG) for initial content
- Dynamic imports for code artworks to optimize loading
- Component-based structure for gallery, artworks, and layout

## State management
- Minimal state using React local component state and Context API if needed
- UI state such as fullscreen mode, navigation status, and description toggle managed locally

## Data flow
- Artworks and their metadata (title, description, etc.) stored in a static JSON or JS config file
- Metadata is passed as props to components
- No API calls or data persistence required

## Technical Stack
- Next.js (React framework)
- JavaScript / TypeScript (optional)
- Tailwind CSS or styled-components for design (based on preference)
- HTML Canvas or WebGL for rendering artworks (based on artwork complexity)
- Vercel or Netlify for static deployment

## Authentication Process
- None required — fully public site
- No user accounts, login, or authentication needed

## Route Design
- `/` — Landing page with welcome message and "Enter Exhibition"
- `/gallery` — Vertical list view of artworks
- `/artwork/[slug]` — Dynamic route rendering each artwork fullscreen

## API Design
- No external API used
- Static data file (e.g., `artworks.json`) acts as pseudo-API to store artwork metadata
- Internal module system for loading artwork code modules dynamically

## Database Design ERD
- Not applicable — no backend or persistent data
