import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-16 lg:p-24 text-center">
      <div className="max-w-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
          Art Show Vol. 1
        </h1>
        <p className="mb-8 text-base md:text-lg font-sans">
          A minimalist, web-based solo art exhibition showcasing generative
          artwork created entirely with code. Each piece runs directly in the
          user's browser, emphasizing the aesthetics of computation and live
          execution.
        </p>
        <Link
          href="/gallery" // Link to the gallery page (will be created later)
          className="inline-block px-6 py-3 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300 font-sans"
        >
          Enter Exhibition
        </Link>
      </div>
    </main>
  );
}
