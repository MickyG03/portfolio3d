import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const snowCount = 300;
const snowGeometry = new THREE.BufferGeometry();

const positions = new Float32Array(snowCount * 3);
const velocities = new Float32Array(snowCount);
const horizontalMovement = new Float32Array(snowCount);
const opacities = new Float32Array(snowCount).fill(0);

for (let i = 0; i < snowCount; i++) {
  const x = (Math.random() - 0.5) * 20;
  const y = Math.random() * 20 - 10;
  const z = (Math.random() - 0.5) * 20;
  
  positions[i * 3] = x;
  positions[i * 3 + 1] = y;
  positions[i * 3 + 2] = z;

  velocities[i] = 0.01 + Math.random() * 0.01;
  horizontalMovement[i] = (Math.random() - 0.5) * 0.01;
}

snowGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
snowGeometry.setAttribute('opacity', new THREE.Float32BufferAttribute(opacities, 1));

const snowMaterial = new THREE.ShaderMaterial({
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
      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});

export const Snow = () => {
  const snowRef = useRef<THREE.Points>(null);
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
    if (!snowRef.current) return;

    if (isUnmountingRef.current) {
      fadeRef.current.value = Math.max(fadeRef.current.value - delta * 2, 0);
      if (fadeRef.current.value <= 0) return;
    } else {
      fadeRef.current.value = Math.min(fadeRef.current.value + delta * 0.5, 0.6);
    }

    const positions = snowRef.current.geometry.attributes.position.array as Float32Array;
    const opacities = snowRef.current.geometry.attributes.opacity.array as Float32Array;

    for (let i = 0; i < snowCount; i++) {
      positions[i * 3 + 1] -= velocities[i];
      positions[i * 3] += horizontalMovement[i];

      opacities[i] = fadeRef.current.value;

      if (positions[i * 3 + 1] < -10) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      }
    }

    snowRef.current.geometry.attributes.position.needsUpdate = true;
    snowRef.current.geometry.attributes.opacity.needsUpdate = true;
  });

  return (
    <points ref={snowRef} geometry={snowGeometry} material={snowMaterial} />
  );
};