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
    // Main container: Re-add justify-center to vertically center the aspect box
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4 sm:p-8">
      {/* 
        Viewer Container:
        - w-full: Takes width available in centered parent.
        - max-w-5xl: Limits maximum width.
        - aspect-square: Forces height to match width (can change ratio e.g., aspect-[3/4])
      */}
      <div className="w-full max-w-5xl aspect-square">
        {/* ArtworkViewer should fill this aspect-ratio container */}
        <ArtworkViewer
          slug={slug}
          description={artwork.description}
          title={artwork.title}
          prevSlug={prevArtwork?.slug}
          nextSlug={nextArtwork?.slug}
        />
      </div>
    </div>
  );
} 