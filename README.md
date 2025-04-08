# Code Art Exhibition

A minimalist, web-based solo art exhibition showcasing generative artwork created entirely with code. Each piece runs directly in the user's browser and is meant to be experienced interactively and fullscreen, emphasizing the aesthetics of computation and live execution.

## About

This project is a digital art gallery that displays generative artwork created with code. The artworks are self-contained code components rendered in the browser, offering an immersive, fullscreen experience for each piece.

## Features

- Single-page web application with dynamic routing for each artwork
- Artworks execute live in the browser
- Fullscreen, immersive experience per artwork
- Scroll-based or click-based navigation between artworks
- Brief descriptions for each piece
- Minimal UI to maintain focus on the artwork

## Technical Stack

- Next.js framework
- React
- TypeScript
- Tailwind CSS
- HTML Canvas for rendering artworks
- Deployed on Vercel

## Installation

```bash
# Clone the repository
git clone https://github.com/VillePajala/art-show-vol1.git

# Navigate to project directory
cd art-show-vol1

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the exhibition.

## Project Structure

- `/app`: Main application pages
- `/app/artwork/[slug]`: Dynamic routes for individual artworks
- `/components`: Reusable React components
- `/artworks`: Individual artwork components and their configurations
- `/styles`: CSS styling

## Target Audience

Art enthusiasts, digital art lovers, creative coders, and curious web users who are interested in the intersection of art and code.

## License

MIT
