// src/lib/artworks.ts
export interface Artwork {
  slug: string;
  title: string;
  description: string;
  // We'll add a field for the actual artwork component later
  // component: React.ComponentType;
}

export const artworks: Artwork[] = [
  {
    slug: "spinning-cubes",
    title: "Deformed Reality",
    description: "A 3D shape continuously deformed and colored by noise shaders.",
  },
  {
    slug: "particle-flow",
    title: "Particle Flow",
    description: "Generative particles connecting and reacting to the mouse.",
  },
  {
    slug: "moire-pattern",
    title: "Moire Pattern",
    description: "Overlapping rotating lines creating shifting moire patterns.",
  },
  // Add more artworks here...
]; 