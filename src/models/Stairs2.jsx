import React from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshBasicMaterial } from 'three'
import { useThemeStore } from '../store/themeStore'
import stairs2Src from './stairs2.glb'

export function Model(props) {
  const { nodes } = useGLTF(stairs2Src)
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
        geometry={nodes.Lines009.geometry} 
        material={lineMaterial} 
        position={[63.132, 0, -7.429]} 
        rotation={[Math.PI, 0, Math.PI]} 
      />
      <mesh 
        geometry={nodes.Lines010.geometry} 
        material={lineMaterial} 
        position={[25.013, 0.024, 0.085]} 
      />
      <mesh 
        geometry={nodes.Lines011.geometry} 
        material={lineMaterial} 
        position={[62.959, 0, -7.429]} 
        rotation={[Math.PI, 0, Math.PI]} 
      />
      <mesh 
        geometry={nodes.Lines012.geometry} 
        material={lineMaterial} 
        position={[62.959, 0, -1.93]} 
        rotation={[Math.PI, 0, Math.PI]} 
      />
      <mesh 
        geometry={nodes.pillar003.geometry} 
        material={structureMaterial} 
        position={[43.299, -1.03, -6.459]} 
        rotation={[Math.PI, 0, Math.PI]} 
        scale={[0.625, 0.312, 0.625]} 
      />
      <mesh 
        geometry={nodes.pillar004.geometry} 
        material={structureMaterial} 
        position={[43.299, -1.03, -0.961]} 
        rotation={[Math.PI, 0, Math.PI]} 
        scale={[0.625, 0.312, 0.625]} 
      />
      <mesh 
        geometry={nodes.stairs001.geometry} 
        material={structureMaterial} 
        position={[44.78, 1.255, -3.753]} 
        rotation={[0, Math.PI / 2, 0]} 
        scale={[2.5, 0.237, 0.237]} 
      />
      <mesh 
        geometry={nodes.wall002.geometry} 
        material={structureMaterial} 
        position={[18.97, 0.135, -3.878]} 
        rotation={[Math.PI / 2, 0, -Math.PI / 2]} 
        scale={[4.14, 3.52, 2.763]} 
      />
    </group>
  )
}

useGLTF.preload(stairs2Src)