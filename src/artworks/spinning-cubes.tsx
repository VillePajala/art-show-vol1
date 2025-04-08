'use client'; // Needed if using hooks or interactivity

import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

// --- Shader Code --- //

// GLSL noise function (simplex noise alternative)
const glslNoise = `
    // Psuedo-random generator (from The Book of Shaders)
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    // 2D Noise based on pseudo-random generator
    float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        // Four corners in 2D of a tile
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        // Smooth interpolation (smoothstep)
        vec2 u = f * f * (3.0 - 2.0 * f);
        // vec2 u = smoothstep(0.,1.,f);

        // Mix the four corners
        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
    }

    // Fractional Brownian Motion (sum of noise layers)
    float fbm(vec2 st, int octaves, float persistence) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 0.0;
        for (int i = 0; i < octaves; i++) {
            value += amplitude * noise(st);
            st *= 2.0;
            amplitude *= persistence;
        }
        return value;
    }
`;

const vertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    uniform float uTime;
    uniform float uDeformAmplitude;
    uniform float uDeformFrequency;
    uniform int uNoiseOctaves;
    uniform float uNoisePersistence;

    ${glslNoise}

    void main() {
        vUv = uv;
        vNormal = normalMatrix * normal;
        vPosition = position;

        // Deform position using noise
        // Use original position to calculate noise offset to avoid feedback loop
        vec3 pos = position;
        float deformation = fbm(pos.xy * uDeformFrequency + uTime * 0.1, uNoiseOctaves, uNoisePersistence);
        deformation += fbm(pos.yz * uDeformFrequency + uTime * 0.08, uNoiseOctaves, uNoisePersistence);
        deformation += fbm(pos.xz * uDeformFrequency + uTime * 0.05, uNoiseOctaves, uNoisePersistence);

        vec3 deformedPosition = pos + normal * deformation * uDeformAmplitude;
        
        vec4 modelViewPosition = modelViewMatrix * vec4(deformedPosition, 1.0);
        gl_Position = projectionMatrix * modelViewPosition;
    }
`;

const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    uniform float uTime;
    uniform float uColorFrequency;
    uniform int uNoiseOctaves;
    uniform float uNoisePersistence;

    ${glslNoise}

    // Helper to create HSL color
    vec3 hsl2rgb(vec3 hsl) {
        vec3 rgb = clamp(abs(mod(hsl.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
        return hsl.z + hsl.y * (rgb - 0.5) * (1.0 - abs(2.0 * hsl.z - 1.0));
    }

    void main() {
        // Calculate noise for coloring
        float colorNoise = fbm(vPosition.xy * uColorFrequency + uTime * 0.05, uNoiseOctaves, uNoisePersistence);
        colorNoise += fbm(vUv * uColorFrequency * 2.0 + uTime * 0.1, uNoiseOctaves, uNoisePersistence);
        colorNoise = smoothstep(0.3, 0.7, colorNoise); // Adjust contrast

        // Map noise to hue
        float hue = mod(0.6 + colorNoise * 0.5 + uTime * 0.02, 1.0); // Base hue near blue/purple, shift with noise and time
        float saturation = 0.8;
        float lightness = mix(0.3, 0.7, smoothstep(0.0, 1.0, colorNoise)); // Vary lightness based on noise

        vec3 color = hsl2rgb(vec3(hue, saturation, lightness));

        // Add some subtle lighting effect based on normal
        float light = dot(normalize(vNormal), normalize(vec3(0.5, 0.5, 1.0)));
        light = clamp(light * 0.5 + 0.5, 0.0, 1.0);
        
        gl_FragColor = vec4(color * light, 1.0);
    }
`;

// --- Component --- //
export default function ShaderDeform() {
    const mountRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const meshRef = useRef<THREE.Mesh | null>(null);
    const animationFrameIdRef = useRef<number>();

    // Uniforms for the shader
    const uniforms = useMemo(() => ({
        uTime: { value: 0.0 },
        uDeformAmplitude: { value: 0.25 }, // How much the surface deforms
        uDeformFrequency: { value: 1.5 }, // How detailed the deformation noise is
        uColorFrequency: { value: 2.0 }, // How detailed the color noise is
        uNoiseOctaves: { value: 4 }, // Layers of noise
        uNoisePersistence: { value: 0.5 } // How much each noise layer contributes
    }), []);

    useEffect(() => {
        if (!mountRef.current) return;

        // --- Basic Three.js Setup --- //
        const currentMount = mountRef.current;
        const width = currentMount.clientWidth;
        const height = currentMount.clientHeight;

        rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        rendererRef.current.setSize(width, height);
        rendererRef.current.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(rendererRef.current.domElement);

        sceneRef.current = new THREE.Scene();

        cameraRef.current = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
        cameraRef.current.position.z = 2.5;

        // --- Geometry and Material --- //
        // Use Icosahedron for more vertices than a sphere for smoother deformation
        const geometry = new THREE.IcosahedronGeometry(1, 64); // Radius 1, detail 64
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms,
            // wireframe: true, // Optional: view as wireframe
        });

        meshRef.current = new THREE.Mesh(geometry, material);
        sceneRef.current.add(meshRef.current);

        // --- Animation Loop --- //
        const clock = new THREE.Clock();
        const animate = () => {
            if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !meshRef.current) return;

            const elapsedTime = clock.getElapsedTime();
            uniforms.uTime.value = elapsedTime;

            // Optional: Rotate the mesh slightly
            meshRef.current.rotation.y = elapsedTime * 0.1;
            meshRef.current.rotation.x = elapsedTime * 0.05;

            rendererRef.current.render(sceneRef.current, cameraRef.current);
            animationFrameIdRef.current = requestAnimationFrame(animate);
        };
        animate();

        // --- Resize Listener --- //
        const handleResize = () => {
            if (!rendererRef.current || !cameraRef.current || !currentMount) return;
            const newWidth = currentMount.clientWidth;
            const newHeight = currentMount.clientHeight;
            rendererRef.current.setSize(newWidth, newHeight);
            cameraRef.current.aspect = newWidth / newHeight;
            cameraRef.current.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        // --- Cleanup --- //
        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
            if (rendererRef.current) {
                 // Dispose of geometry, material, texture if needed
                geometry.dispose();
                material.dispose();
                if (currentMount && rendererRef.current.domElement) {
                    currentMount.removeChild(rendererRef.current.domElement);
                }
                rendererRef.current.dispose();
            }
        };

    }, [uniforms]); // Depend on uniforms object

    return (
        <div ref={mountRef} className="w-full h-full block" />
    );
} 