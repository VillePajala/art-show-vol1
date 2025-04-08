import Link from "next/link";
import { artworks } from "@/lib/artworks";

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center min-h-screen">
      <h1 className="text-3xl font-bold mb-12 text-center font-serif">
        Gallery
      </h1>

      <div className="flex flex-col items-center space-y-6 w-full max-w-md">
        {artworks.map((artwork) => (
          <Link
            key={artwork.slug}
            href={`/artwork/${artwork.slug}`}
            className="block w-full text-center text-xl font-sans text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200 py-4 rounded-md"
          >
            {artwork.title}
          </Link>
        ))}
      </div>

      <div className="mt-auto pt-12 text-center">
        <Link href="/" className="text-gray-400 hover:text-white font-sans">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
} 