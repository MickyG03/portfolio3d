import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const rainCount = 200;
const rainGeometry = new THREE.BufferGeometry();

const positions = new Float32Array(rainCount * 6);
const velocities = new Float32Array(rainCount);
const opacities = new Float32Array(rainCount * 2).fill(0);

for (let i = 0; i < rainCount; i++) {
  const x = (Math.random() - 0.5) * 20;
  const y = Math.random() * 20;
  const z = (Math.random() - 0.5) * 20;
  
  positions[i * 6] = x;
  positions[i * 6 + 1] = y;
  positions[i * 6 + 2] = z;
  
  positions[i * 6 + 3] = x;
  positions[i * 6 + 4] = y - 0.15;
  positions[i * 6 + 5] = z;

  velocities[i] = 0.03 + Math.random() * 0.02;
}

rainGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
rainGeometry.setAttribute('opacity', new THREE.Float32BufferAttribute(opacities, 1));

const rainMaterial = new THREE.ShaderMaterial({
  uniforms: {
    color: { value: new THREE.Color('#FFB07F') },
    glowColor: { value: new THREE.Color('#FFE4C4') },
  },
  vertexShader: `
    attribute float opacity;
    varying vec3 vPosition;
    varying float vOpacity;
    void main() {
      vPosition = position;
      vOpacity = opacity;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    uniform vec3 glowColor;
    varying vec3 vPosition;
    varying float vOpacity;
    
    void main() {
      vec3 finalColor = mix(color, glowColor, 0.3);
      gl_FragColor = vec4(finalColor, vOpacity);
    }
  `,
  transparent: true,
  blending: THREE.AdditiveBlending,
});

export const Rain = () => {
  const rainRef = useRef<THREE.LineSegments>(null);
  const fadeRef = useRef({ value: 0 });
  const isUnmountingRef = useRef(false);

  useEffect(() => {
    fadeRef.current.value = 0;
    isUnmountingRef.current = false;

    return () => {
      isUnmountingRef.current = true;
    };
  }, []);

  useFrame((_, delta) => {
    if (!rainRef.current) return;

    if (isUnmountingRef.current) {
      fadeRef.current.value = Math.max(fadeRef.current.value - delta * 2, 0);
      if (fadeRef.current.value <= 0) return;
    } else {
      fadeRef.current.value = Math.min(fadeRef.current.value + delta * 0.5, 0.6);
    }

    const positions = rainRef.current.geometry.attributes.position.array as Float32Array;
    const opacities = rainRef.current.geometry.attributes.opacity.array as Float32Array;

    for (let i = 0; i < rainCount; i++) {
      positions[i * 6 + 1] -= velocities[i];
      positions[i * 6 + 4] -= velocities[i];

      opacities[i * 2] = fadeRef.current.value;
      opacities[i * 2 + 1] = fadeRef.current.value;

      if (positions[i * 6 + 4] < -10) {
        positions[i * 6 + 1] = 10;
        positions[i * 6 + 4] = 9.85;
      }
    }

    rainRef.current.geometry.attributes.position.needsUpdate = true;
    rainRef.current.geometry.attributes.opacity.needsUpdate = true;
  });

  return (
    <lineSegments ref={rainRef} geometry={rainGeometry} material={rainMaterial} />
  );
};