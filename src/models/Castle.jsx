import React from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshBasicMaterial } from 'three'
import { useThemeStore } from '../store/themeStore'
import castleSrc from './castle.glb'

export function Model(props) {
  const { nodes } = useGLTF(castleSrc)
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
        geometry={nodes.Castle.geometry} 
        material={structureMaterial} 
        position={[81.686, 4.556, -3.946]} 
        rotation={[Math.PI / 2, 0, Math.PI / 2]} 
        scale={[5.556, 5.556, 6.3]} 
      />
      <mesh 
        geometry={nodes.Lines023.geometry} 
        material={lineMaterial} 
      />
    </group>
  )
}

useGLTF.preload(castleSrc)