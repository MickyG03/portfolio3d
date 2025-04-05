import React from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshBasicMaterial } from 'three'
import { useThemeStore } from '../store/themeStore'
import towersSrc from './towers.glb'

export function Model(props) {
  const { nodes } = useGLTF(towersSrc)
  const { theme } = useThemeStore()

  // Extract colors from the gradient
  const gradientColors = theme.colors.background
    .match(/#[a-fA-F0-9]{6}/g)
    ?.map(color => color.toLowerCase()) || ['#d3d3d3', '#878787']

  const lineMaterial = new MeshBasicMaterial({ 
    color: theme.colors.text
  })

  const towerMaterial = new MeshBasicMaterial({ 
    color: gradientColors[1]
  })

  return (
    <group {...props} dispose={null}>
      <mesh 
        geometry={nodes.Lines001.geometry} 
        material={lineMaterial} 
        position={[3.696, -2.278, -0.027]} 
        scale={[1.412, 1.75, 1.406]} 
      />
      <mesh 
        geometry={nodes.Tower001.geometry} 
        material={towerMaterial} 
        position={[-6.374, 2.542, 0.161]} 
        rotation={[Math.PI / 2, 0, 0]} 
        scale={[3.065, 3.053, 3.8]} 
      />
    </group>
  )
}

useGLTF.preload(towersSrc)