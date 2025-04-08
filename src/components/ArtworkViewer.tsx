// src/components/ArtworkViewer.tsx
'use client'; // Required for hooks like useState and dynamic imports in App Router

import dynamic from 'next/dynamic';
import { useMemo, useRef, useCallback, useState } from 'react';
import Link from 'next/link'; // Import Link for navigation

interface ArtworkViewerProps {
  slug: string;
  title: string;
  description: string;
  prevSlug?: string;
  nextSlug?: string;
}

export default function ArtworkViewer({ 
  slug, 
  title, 
  description, 
  prevSlug, 
  nextSlug 
}: ArtworkViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null); // Ref for the element to make fullscreen
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  // Use useMemo to ensure the dynamic import only happens when the slug changes
  const ArtworkComponent = useMemo(() => {
    // Dynamically import the component based on the slug
    // Assumes artwork components are located in src/artworks/[slug].tsx
    // We will create these actual artwork component files later
    return dynamic(() => import(`@/artworks/${slug}`).catch(() => DefaultArtworkComponent), {
      // Optional: Show a loading component while the artwork is loading
      loading: () => <p className="text-center">Loading artwork...</p>,
      // Optional: Disable Server-Side Rendering if the artwork relies on browser APIs
      ssr: false,
    });
  }, [slug]);

  // Fallback component if dynamic import fails
  const DefaultArtworkComponent = () => (
      <div className="text-center text-red-500">Error loading artwork: {slug}</div>
  );

  const handleFullscreen = useCallback(() => {
    if (viewerRef.current) {
      viewerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    }
  }, []);

  return (
    <div
      ref={viewerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black group"
      onMouseEnter={() => setIsOverlayVisible(true)}
      onMouseLeave={() => setIsOverlayVisible(false)}
    >
      {/* Render the dynamically loaded component */}      
      <ArtworkComponent />

      {/* Overlay container - visible on hover */}
      <div className={`absolute inset-0 flex items-center justify-between p-4 transition-opacity duration-300 ${isOverlayVisible ? 'opacity-70' : 'opacity-0'} hover:opacity-100`}>

        {/* Back to Gallery Link (Top Left) */}
        <Link 
          href="/gallery"
          className="absolute top-4 left-4 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm z-10"
          title="Back to Gallery"
        >
          &larr; Gallery
        </Link>

        {/* Previous Artwork Link (Left Center) */}
        {prevSlug && (
          <Link 
            href={`/artwork/${prevSlug}`}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full z-10"
            title="Previous Artwork"
          >
            &lt;
          </Link>
        )}

        {/* Next Artwork Link (Right Center) */}
        {nextSlug && (
          <Link 
            href={`/artwork/${nextSlug}`}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full z-10"
            title="Next Artwork"
          >
            &gt;
          </Link>
        )}

        {/* Placard (Bottom Left) */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 p-3 rounded max-w-xs z-10">
          <h2 className="text-lg font-semibold text-white mb-1">{title}</h2>
          <p className="text-sm text-gray-300">{description}</p>
        </div>

        {/* Fullscreen Button (Bottom Right) */}
        <button
          onClick={handleFullscreen}
          className="absolute bottom-4 right-4 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm z-10"
          title="Enter Fullscreen"
        >
          Fullscreen
        </button>
      </div>
    </div>
  );
}
