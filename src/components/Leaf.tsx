import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const leafShape = new THREE.Shape();
leafShape.moveTo(0, 0);
leafShape.bezierCurveTo(0.1, 0.1, 0.2, 0.1, 0.3, 0);
leafShape.bezierCurveTo(0.2, -0.1, 0.1, -0.1, 0, 0);

const leafGeometry = new THREE.ShapeGeometry(leafShape);
leafGeometry.scale(0.0005, 0.0005, 0.0005);

interface LeafProps {
  initialPosition: [number, number, number];
  speed: number;
  fadeSpeed: number;
  isUnmounting: boolean;
}

export const Leaf = ({ initialPosition, speed, fadeSpeed, isUnmounting }: LeafProps) => {
  const leafRef = useRef<THREE.Mesh>(null);
  const fadeRef = useRef({ value: 0 });

  useEffect(() => {
    fadeRef.current.value = 0;
  }, []);

  useFrame((_, delta) => {
    if (!leafRef.current) return;
    
    if (isUnmounting) {
      fadeRef.current.value = Math.max(fadeRef.current.value - delta * 2, 0);
      if (fadeRef.current.value <= 0) return;
    } else {
      fadeRef.current.value = Math.min(fadeRef.current.value + delta * fadeSpeed, 0.6);
    }
    
    leafRef.current.position.x -= speed;
    leafRef.current.rotation.z += delta * 0.5;
    
    if (leafRef.current.position.x < -10) {
      leafRef.current.position.x = 10;
      leafRef.current.position.y = initialPosition[1];
    }

    if (leafRef.current.material instanceof THREE.Material) {
      leafRef.current.material.opacity = fadeRef.current.value;
    }
  });

  return (
    <mesh ref={leafRef} position={initialPosition}>
      <shapeGeometry args={[leafShape]} />
      <meshStandardMaterial 
        color="#E6E6FA"
        transparent
        opacity={0}
        side={THREE.DoubleSide}
        emissive="#F8F8FF"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};