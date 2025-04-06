import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const particleCount = 2000;
const particleGeometry = new THREE.BufferGeometry();

const positions = new Float32Array(particleCount * 3);
const velocities = new Float32Array(particleCount);
const opacities = new Float32Array(particleCount).fill(0);

// Create a wider field of particles
const fieldLength = 100; // Length along x-axis
const fieldWidth = 40;   // Width along z-axis

// Initialize particles across the entire width
for (let i = 0; i < particleCount; i++) {
  const x = (Math.random() - 0.5) * fieldLength;
  const y = Math.random() * 0.2; // Keep particles close to ground
  const z = (Math.random() - 0.5) * fieldWidth;
  
  positions[i * 3] = x;
  positions[i * 3 + 1] = y;
  positions[i * 3 + 2] = z;

  velocities[i] = 0.015 + Math.random() * 0.005; // Slightly slower, more uniform speed
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particleGeometry.setAttribute('opacity', new THREE.Float32BufferAttribute(opacities, 1));

const particleMaterial = new THREE.ShaderMaterial({
  uniforms: {
    color: { value: new THREE.Color('#FFFFFF') },
    glowColor: { value: new THREE.Color('#F6F6FF') },
  },
  vertexShader: `
    attribute float opacity;
    varying vec3 vPosition;
    varying float vOpacity;
    void main() {
      vPosition = position;
      vOpacity = opacity;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = 3.0;
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    uniform vec3 glowColor;
    varying vec3 vPosition;
    varying float vOpacity;
    
    void main() {
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      if (dist > 0.5) discard;
      
      float alpha = vOpacity * smoothstep(0.5, 0.3, dist);
      vec3 finalColor = mix(color, glowColor, 0.3);
      gl_FragColor = vec4(finalColor, alpha * 0.4);
    }
  `,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});

export const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const fadeRef = useRef({ value: 0 });
  const timeRef = useRef(0);
  const isUnmountingRef = useRef(false);

  useEffect(() => {
    fadeRef.current.value = 0;
    isUnmountingRef.current = false;

    return () => {
      isUnmountingRef.current = true;
    };
  }, []);

  useFrame((_, delta) => {
    if (!particlesRef.current) return;

    timeRef.current += delta;

    if (isUnmountingRef.current) {
      fadeRef.current.value = Math.max(fadeRef.current.value - delta * 2, 0);
      if (fadeRef.current.value <= 0) return;
    } else {
      fadeRef.current.value = Math.min(fadeRef.current.value + delta * 0.5, 0.8);
    }

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const opacities = particlesRef.current.geometry.attributes.opacity.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      // Move particles along x-axis
      positions[i * 3] += velocities[i];
      
      // Add very subtle vertical drift
      positions[i * 3 + 1] += Math.sin(timeRef.current + i) * 0.0002;
      
      // Smooth opacity transition based on position
      const xPos = positions[i * 3];
      const distanceFromCenter = Math.abs(xPos);
      const maxDistance = fieldLength / 2;
      
      // Create a smooth opacity curve that peaks in the middle
      const opacityFactor = 1 - (distanceFromCenter / maxDistance);
      opacities[i] = fadeRef.current.value * Math.pow(opacityFactor, 2);

      // Reset particle position when it reaches the right side
      if (positions[i * 3] > fieldLength/2) {
        positions[i * 3] = -fieldLength/2;
        positions[i * 3 + 1] = Math.random() * 0.2;
        positions[i * 3 + 2] = (Math.random() - 0.5) * fieldWidth;
        
        // Ensure smooth opacity transition at reset
        opacities[i] = 0;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.geometry.attributes.opacity.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} geometry={particleGeometry} material={particleMaterial} />
  );
};