'use client'; // Needed if using hooks or interactivity

import React, { useRef, useEffect, useCallback, useMemo } from 'react';

// Particle properties interface
interface ParticleProps {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
}

// Component
export default function ParticleFlow() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<ParticleProps[]>([]);
    const mousePosRef = useMemo(() => ({ current: { x: null as number | null, y: null as number | null } }), []);
    const animationFrameIdRef = useRef<number>();
    const lastTimestampRef = useRef<number>(0);

    // --- Simulation Parameters --- 
    const numParticles = 150;
    const connectDistance = 100; // Max distance to draw a line between particles
    const mouseInfluenceRadius = 120; // Radius around mouse to affect particles
    const baseSpeed = 15; // Pixels per second
    const repulsionStrength = 50; // How strongly particles repel mouse (pixels/sec^2 adjusted by distance)
    const particleColor = "hsla(190, 100%, 70%, 0.8)"; // Cyan tone
    const lineColor = "hsla(190, 100%, 70%, 0.1)"; // Faint cyan lines
    // ---------------------------

    // Function to initialize particles
    const initializeParticles = useCallback((width: number, height: number) => {
        particlesRef.current = [];
        for (let i = 0; i < numParticles; i++) {
            particlesRef.current.push({
                id: i,
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * baseSpeed * 2,
                vy: (Math.random() - 0.5) * baseSpeed * 2,
                radius: Math.random() * 1.5 + 1,
                color: particleColor,
            });
        }
    }, [numParticles, baseSpeed, particleColor]); // Include dependencies

    // --- Main Animation Loop --- 
    const animate = useCallback((timestamp: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        // Calculate delta time for frame-rate independent physics
        if (lastTimestampRef.current === 0) {
            lastTimestampRef.current = timestamp;
        }
        const deltaTime = (timestamp - lastTimestampRef.current) / 1000; // seconds
        lastTimestampRef.current = timestamp;

        // Responsive Canvas Size
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            // Re-initialize particles if canvas size changes significantly (optional)
            // Consider debouncing this if resize happens frequently
             initializeParticles(width, height);
        }

        ctx.clearRect(0, 0, width, height);

        const mouseX = mousePosRef.current.x;
        const mouseY = mousePosRef.current.y;

        // Update and draw particles
        particlesRef.current.forEach(p => {
            // --- Mouse interaction (repulsion) ---
            if (mouseX !== null && mouseY !== null) {
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const distSq = dx * dx + dy * dy;
                const influenceRadiusSq = mouseInfluenceRadius * mouseInfluenceRadius;

                if (distSq < influenceRadiusSq && distSq > 0) {
                    const dist = Math.sqrt(distSq);
                    const forceFactor = 1 - (dist / mouseInfluenceRadius); // Stronger force closer to center
                    const forceX = (dx / dist) * repulsionStrength * forceFactor;
                    const forceY = (dy / dist) * repulsionStrength * forceFactor;
                    
                    // Apply force (acceleration = force / mass, assume mass=1)
                    p.vx += forceX * deltaTime;
                    p.vy += forceY * deltaTime;
                }
            }

             // Limit speed to prevent runaway particles
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            const maxSpeed = baseSpeed * 3; 
            if (speed > maxSpeed) {
                p.vx = (p.vx / speed) * maxSpeed;
                p.vy = (p.vy / speed) * maxSpeed;
            }

            // --- Movement ---
            p.x += p.vx * deltaTime;
            p.y += p.vy * deltaTime;

            // --- Boundary Wrapping ---
            if (p.x < -p.radius) p.x = width + p.radius;
            if (p.x > width + p.radius) p.x = -p.radius;
            if (p.y < -p.radius) p.y = height + p.radius;
            if (p.y > height + p.radius) p.y = -p.radius;

            // --- Draw Particle ---
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });

        // --- Draw Connections ---
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particlesRef.current.length; i++) {
            for (let j = i + 1; j < particlesRef.current.length; j++) {
                const p1 = particlesRef.current[i];
                const p2 = particlesRef.current[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distSq = dx * dx + dy * dy; // Use squared distance for performance
                const connectDistanceSq = connectDistance * connectDistance;

                if (distSq < connectDistanceSq) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }

        animationFrameIdRef.current = requestAnimationFrame(animate);
    }, [connectDistance, mouseInfluenceRadius, repulsionStrength, baseSpeed, particleColor, lineColor, initializeParticles, mousePosRef]); // Add dependencies for useCallback

    // --- Effect for Setup & Cleanup --- 
    useEffect((): (() => void) | void => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Initial setup
        initializeParticles(canvas.offsetWidth, canvas.offsetHeight);
        lastTimestampRef.current = 0; // Reset timestamp for first frame calculation
        animationFrameIdRef.current = requestAnimationFrame(animate);

        // --- Event Listeners ---
        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mousePosRef.current = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            };
        };
        const handleMouseLeave = () => {
            mousePosRef.current = { x: null, y: null };
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        // Optional: Add touch listeners here if needed

        // --- Cleanup ---
        const cleanup = () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
        return cleanup;

    }, [animate, initializeParticles, mousePosRef]); // Add animate and initializeParticles as dependencies

    return (
        <canvas ref={canvasRef} className="w-full h-full block bg-transparent" />
        // Ensure canvas is display: block and fills container, transparent background
    );
} 