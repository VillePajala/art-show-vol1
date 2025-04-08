'use client';
import React, { useRef, useEffect } from 'react';

export default function MoirePattern() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameIdRef = useRef<number>();
    const startTimeRef = useRef<number>(performance.now());

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const animate = (timestamp: number) => {
            const elapsedTime = timestamp - startTimeRef.current;
            const angle = elapsedTime / 3000; // Rotate slowly
            const numLines = 30;
            const spacing = 15;

            const width = canvas.width = canvas.offsetWidth;
            const height = canvas.height = canvas.offsetHeight;
            const centerX = width / 2;
            const centerY = height / 2;

            ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = "hsla(60, 100%, 70%, 0.5)"; // Yellow tone
            ctx.lineWidth = 1;

            // Draw first set of rotating lines
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle);
            for (let i = -numLines; i <= numLines; i++) {
                ctx.beginPath();
                ctx.moveTo(i * spacing, -height);
                ctx.lineTo(i * spacing, height);
                ctx.stroke();
            }
            ctx.restore();

            // Draw second set of rotating lines (slightly different angle)
             ctx.strokeStyle = "hsla(240, 100%, 70%, 0.5)"; // Blue tone
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(-angle * 1.1); // Rotate opposite direction, slightly faster
             for (let i = -numLines; i <= numLines; i++) {
                ctx.beginPath();
                ctx.moveTo(-width, i * spacing);
                ctx.lineTo(width, i * spacing);
                ctx.stroke();
            }
            ctx.restore();

            animationFrameIdRef.current = requestAnimationFrame(animate);
        };

        animationFrameIdRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, []);

    return (
        <canvas ref={canvasRef} className="w-full h-full block bg-transparent" />
    );
} 