import { artworks, Artwork } from "@/lib/artworks";
import Link from "next/link";
import ArtworkViewer from "@/components/ArtworkViewer";

// This tells Next.js to pre-render these pages at build time
export async function generateStaticParams() {
  return artworks.map((artwork) => ({
    slug: artwork.slug,
  }));
}

// Define the props type, including the dynamic slug parameter
interface ArtworkPageProps {
  params: {
    slug: string;
  };
}

export default function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = params;
  const currentIndex = artworks.findIndex((art) => art.slug === slug);

  if (currentIndex === -1) {
    // Handle case where artwork is not found (optional, could redirect or show 404)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <p className="text-xl mb-4">Artwork not found</p>
        <Link href="/gallery" className="text-gray-400 hover:text-white">
          &larr; Back to Gallery
        </Link>
      </div>
    );
  }

  const artwork = artworks[currentIndex];
  const prevArtwork = artworks[currentIndex - 1]; // Will be undefined if currentIndex is 0
  const nextArtwork = artworks[currentIndex + 1]; // Will be undefined if it's the last artwork

  return (
    // Removed padding, added bg-black to make it fullscreen dark
    <div className="min-h-screen flex flex-col items-center bg-black">
      {/* Artwork Viewer takes up the entire screen */}
      <div className="flex-grow w-full h-full flex items-center justify-center">
        <ArtworkViewer
          slug={slug}
          description={artwork.description}
          title={artwork.title} // Pass title as well for the overlay
          prevSlug={prevArtwork?.slug}
          nextSlug={nextArtwork?.slug}
        />
      </div>
    </div>
  );
} 