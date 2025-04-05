import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Leaf } from './Leaf';

const windCount = 3;
const windGeometry = new THREE.BufferGeometry();

const positions = new Float32Array(windCount * 6);
const velocities = new Float32Array(windCount);
const opacities = new Float32Array(windCount * 2).fill(0);
const phases = new Float32Array(windCount);

const heights = [0.5, 1.5, 2.5];

for (let i = 0; i < windCount; i++) {
  const x = 10 + i * 2;
  const y = heights[i];
  const z = -2;
  
  positions[i * 6] = x;
  positions[i * 6 + 1] = y;
  positions[i * 6 + 2] = z;
  
  positions[i * 6 + 3] = x + 2;
  positions[i * 6 + 4] = y;
  positions[i * 6 + 5] = z;

  velocities[i] = 0.05;
  phases[i] = i * Math.PI / 3;
}

windGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
windGeometry.setAttribute('opacity', new THREE.Float32BufferAttribute(opacities, 1));

const windMaterial = new THREE.ShaderMaterial({
  uniforms: {
    color: { value: new THREE.Color('#E6E6FA') },
    glowColor: { value: new THREE.Color('#F8F8FF') },
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

export const Wind = () => {
  const windRef = useRef<THREE.LineSegments>(null);
  const timeRef = useRef(0);
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
    if (!windRef.current) return;

    timeRef.current += delta;

    if (isUnmountingRef.current) {
      fadeRef.current.value = Math.max(fadeRef.current.value - delta * 2, 0);
      if (fadeRef.current.value <= 0) return;
    } else {
      fadeRef.current.value = Math.min(fadeRef.current.value + delta * 0.5, 0.6);
    }

    const positions = windRef.current.geometry.attributes.position.array as Float32Array;
    const opacities = windRef.current.geometry.attributes.opacity.array as Float32Array;

    for (let i = 0; i < windCount; i++) {
      positions[i * 6] -= velocities[i];
      positions[i * 6 + 3] -= velocities[i];

      const waveAmplitude = 0.1;
      const waveFrequency = 2;
      const wave = Math.sin(timeRef.current * waveFrequency + phases[i]) * waveAmplitude;
      
      positions[i * 6 + 1] = heights[i] + wave;
      positions[i * 6 + 4] = heights[i] + wave;

      const fadeStartX = -8;
      const fadeEndX = -10;
      const lineEndX = positions[i * 6 + 3];
      
      let lineOpacity = fadeRef.current.value;
      if (lineEndX < fadeStartX && lineEndX > fadeEndX) {
        const fadeProgress = (lineEndX - fadeEndX) / (fadeStartX - fadeEndX);
        lineOpacity *= fadeProgress;
      }

      opacities[i * 2] = lineOpacity;
      opacities[i * 2 + 1] = lineOpacity;

      if (positions[i * 6 + 3] < fadeEndX) {
        positions[i * 6] = 10;
        positions[i * 6 + 3] = 12;
        positions[i * 6 + 1] = heights[i];
        positions[i * 6 + 4] = heights[i];
      }
    }

    windRef.current.geometry.attributes.position.needsUpdate = true;
    windRef.current.geometry.attributes.opacity.needsUpdate = true;
  });

  return (
    <group position={[0, 0, -2]}>
      <lineSegments ref={windRef} geometry={windGeometry} material={windMaterial} />
      <Leaf 
        initialPosition={[8, 1.5, -2]} 
        speed={0.04}
        fadeSpeed={0.5}
        isUnmounting={isUnmountingRef.current}
      />
      <Leaf 
        initialPosition={[10, 2, -2]} 
        speed={0.03}
        fadeSpeed={0.5}
        isUnmounting={isUnmountingRef.current}
      />
    </group>
  );
};