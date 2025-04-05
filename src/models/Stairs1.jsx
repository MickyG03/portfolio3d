import React from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshBasicMaterial } from 'three'
import { useThemeStore } from '../store/themeStore'
import stairs1Src from './stairs1.glb'

export function Model(props) {
  const { nodes } = useGLTF(stairs1Src)
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
        geometry={nodes.Lines005.geometry} 
        material={lineMaterial} 
        position={[-0.174, 0, 0]} 
      />
      <mesh 
        geometry={nodes.Lines006.geometry} 
        material={lineMaterial} 
      />
      <mesh 
        geometry={nodes.Lines007.geometry} 
        material={lineMaterial} 
      />
      <mesh 
        geometry={nodes.Lines008.geometry} 
        material={lineMaterial} 
        position={[0, 0, -5.498]} 
      />
      <mesh 
        geometry={nodes.pillar001.geometry} 
        material={structureMaterial} 
        position={[19.66, -1.03, -0.97]} 
        scale={[0.625, 0.312, 0.625]} 
      />
      <mesh 
        geometry={nodes.pillar002.geometry} 
        material={structureMaterial} 
        position={[19.66, -1.03, -6.468]} 
        scale={[0.625, 0.312, 0.625]} 
      />
      <mesh 
        geometry={nodes.stairs.geometry} 
        material={structureMaterial} 
        position={[18.179, 1.255, -3.676]} 
        rotation={[0, -Math.PI / 2, 0]} 
        scale={[2.5, 0.237, 0.237]} 
      />
      <mesh 
        geometry={nodes.wall001.geometry} 
        material={structureMaterial} 
        position={[18.97, 0.135, -3.878]} 
        rotation={[Math.PI / 2, 0, -Math.PI / 2]} 
        scale={[4.14, 3.52, 2.763]} 
      />
    </group>
  )
}

useGLTF.preload(stairs1Src)