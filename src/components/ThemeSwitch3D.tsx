import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useThemeStore } from '../store/themeStore';
import { Mesh } from 'three';
import { Text } from '@react-three/drei';

export const ThemeSwitch3D = () => {
  const switchRef = useRef<Mesh>(null);
  const { theme, currentTheme, setTheme, autoUpdate, toggleAutoUpdate } = useThemeStore();

  const handleClick = () => {
    if (autoUpdate) toggleAutoUpdate();
    const nextTheme = {
      morning: 'evening',
      evening: 'night',
      night: 'morning'
    }[currentTheme] as 'morning' | 'evening' | 'night';
    setTheme(nextTheme);
  };

  useFrame((state) => {
    if (switchRef.current) {
      switchRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group position={[2, 0, 0]}>
      <mesh
        ref={switchRef}
        onClick={handleClick}
        onPointerOver={(e) => (e.object.scale.x = 1.1)}
        onPointerOut={(e) => (e.object.scale.x = 1)}
      >
        <boxGeometry args={[1, 0.3, 0.1]} />
        <meshStandardMaterial
          color={theme.colors.primary}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.2}
        color={theme.colors.accent}
        anchorX="center"
        anchorY="middle"
      >
        {currentTheme}
      </Text>
    </group>
  );
};