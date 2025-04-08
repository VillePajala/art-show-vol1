// src/lib/artworks.ts
export interface Artwork {
  slug: string;
  title: string;
  description: string;
  // We'll add a field for the actual artwork component later
  // component: React.ComponentType;
}

export const artworks: Artwork[] = [
  // Example artwork - replace with real ones later
  {
    slug: "spinning-cubes",
    title: "Spinning Cubes",
    description: "A simple animation of rotating cubes using Three.js.",
  },
  {
    slug: "particle-flow",
    title: "Particle Flow",
    description: "Generative particles flowing across the screen.",
  },
  // Add more artworks here...
]; 