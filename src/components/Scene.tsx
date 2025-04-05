import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useThemeStore } from '../store/themeStore';
import { useWeatherStore } from '../store/weatherStore';
import { Mesh } from 'three';
import { ThemeSwitch3D } from './ThemeSwitch3D';
import { Rain } from './Rain';
import { Wind } from './Wind';
import { Snow } from './Snow';

export const Scene = () => {
  const meshRef = useRef<Mesh>(null);
  const { theme } = useThemeStore();
  const { currentWeather } = useWeatherStore();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={theme.colors.accent}
          roughness={0.5}
          metalness={0.8}
        />
      </mesh>
      <ThemeSwitch3D />
      {currentWeather === 'rainy' && <Rain />}
      {currentWeather === 'windy' && <Wind />}
      {currentWeather === 'snowy' && <Snow />}
    </>
  );
};