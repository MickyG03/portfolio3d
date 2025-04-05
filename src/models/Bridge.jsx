import React from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshBasicMaterial } from 'three'
import { useThemeStore } from '../store/themeStore'
import bridgeSrc from './bridge.glb'

export function Model(props) {
  const { nodes } = useGLTF(bridgeSrc)
  const { theme } = useThemeStore()

  // Extract colors from the gradient
  const gradientColors = theme.colors.background
    .match(/#[a-fA-F0-9]{6}/g)
    ?.map(color => color.toLowerCase()) || ['#d3d3d3', '#878787']

  const lineMaterial = new MeshBasicMaterial({ 
    color: theme.colors.text
  })

  const structureMaterial = new MeshBasicMaterial({ 
    color: gradientColors[1]
  })

  return (
    <group {...props} dispose={null}>
      <mesh 
        geometry={nodes.Lines013.geometry} 
        material={lineMaterial} 
        position={[25.831, 1.576, -0.845]} 
        scale={[0.937, 1, 0.755]} 
      />
      <mesh 
        geometry={nodes.floor1001.geometry} 
        material={structureMaterial} 
        position={[31.418, 2.639, -3.706]} 
        rotation={[0, 0, -Math.PI]} 
        scale={[-11.635, -0.139, -2.927]} 
      />
      <mesh 
        geometry={nodes.pillar005.geometry} 
        material={structureMaterial} 
        position={[26.419, -0.964, -0.821]} 
        rotation={[Math.PI, 0, Math.PI]} 
        scale={[0.438, 0.219, 0.438]} 
      />
      <mesh 
        geometry={nodes.pillar006.geometry} 
        material={structureMaterial} 
        position={[26.419, -0.964, -6.588]} 
        rotation={[Math.PI, 0, Math.PI]} 
        scale={[0.438, 0.219, 0.438]} 
      />
      <mesh 
        geometry={nodes.Lines014.geometry} 
        material={lineMaterial} 
        position={[40.206, -0.242, -1.501]} 
        rotation={[Math.PI, 0, Math.PI]} 
        scale={0.701} 
      />
      <mesh 
        geometry={nodes.Lines015.geometry} 
        material={lineMaterial} 
        position={[40.206, -0.242, -7.268]} 
        rotation={[Math.PI, 0, Math.PI]} 
        scale={0.701} 
      />
      <mesh 
        geometry={nodes.pillar007.geometry} 
        material={structureMaterial} 
        position={[35.7, -0.964, -6.588]} 
        rotation={[Math.PI, 0, Math.PI]} 
        scale={[0.438, 0.219, 0.438]} 
      />
      <mesh 
        geometry={nodes.pillar008.geometry} 
        material={structureMaterial} 
        position={[35.7, -0.964, -0.821]} 
        rotation={[Math.PI, 0, Math.PI]} 
        scale={[0.438, 0.219, 0.438]} 
      />
      <mesh 
        geometry={nodes.Lines016.geometry} 
        material={lineMaterial} 
        position={[49.487, -0.242, -7.268]} 
        rotation={[Math.PI, 0, Math.PI]} 
        scale={0.701} 
      />
      <mesh 
        geometry={nodes.Lines017.geometry} 
        material={lineMaterial} 
        position={[49.487, -0.242, -1.501]} 
        rotation={[Math.PI, 0, Math.PI]} 
        scale={0.701} 
      />
      <mesh 
        geometry={nodes.pillar025.geometry} 
        material={structureMaterial} 
        position={[31.515, 3.758, -6.608]} 
        rotation={[0, Math.PI / 2, 0]} 
        scale={[0.01, 0.01, 11.672]} 
      />
      <mesh 
        geometry={nodes.pillar009.geometry} 
        material={structureMaterial} 
        position={[31.515, 3.758, -0.782]} 
        rotation={[0, Math.PI / 2, 0]} 
        scale={[0.01, 0.01, 11.672]} 
      />
    </group>
  )
}

useGLTF.preload(bridgeSrc)