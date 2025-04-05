import React from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshBasicMaterial } from 'three'
import { useThemeStore } from '../store/themeStore'
import walls2Src from './walls2.glb'

export function Model(props) {
  const { nodes } = useGLTF(walls2Src)
  const { theme } = useThemeStore()

  // Extract colors from the gradient
  const gradientColors = theme.colors.background
    .match(/#[a-fA-F0-9]{6}/g)
    ?.map(color => color.toLowerCase()) || ['#d3d3d3', '#878787']

  const lineMaterial = new MeshBasicMaterial({ 
    color: theme.colors.text
  })

  const wallMaterial = new MeshBasicMaterial({ 
    color: gradientColors[1]
  })

  const floorMaterial = new MeshBasicMaterial({ 
    color: gradientColors[0]
  })

  return (
    <group {...props} dispose={null}>
      <mesh 
        geometry={nodes.Lines018.geometry} 
        material={lineMaterial} 
        position={[53.478, -0.154, 0]} 
        scale={[1.399, 1, 1]} 
      />
      <mesh 
        geometry={nodes.floor1002.geometry} 
        material={floorMaterial} 
        position={[61.821, 0.91, -3.788]} 
        rotation={[0, 0, -Math.PI]} 
        scale={[-17.376, -0.139, -3.876]} 
      />
      <mesh 
        geometry={nodes.Lines019.geometry} 
        material={lineMaterial} 
        position={[50.917, 0, 0]} 
      />
      <mesh 
        geometry={nodes.Wall1010.geometry} 
        material={wallMaterial} 
        position={[46.877, 0, 0]} 
        rotation={[Math.PI / 2, 0, 0]} 
        scale={2.522} 
      />
      <mesh 
        geometry={nodes.Lines020.geometry} 
        material={lineMaterial} 
        position={[50.924, 0, -7.795]} 
      />
      <mesh 
        geometry={nodes.Wall1019.geometry} 
        material={wallMaterial} 
        position={[66.905, 0, -7.795]} 
        rotation={[Math.PI / 2, 0, 0]} 
        scale={2.522} 
      />
      <mesh 
        geometry={nodes.Wall1020.geometry} 
        material={wallMaterial} 
        position={[71.891, 0, 0]} 
        rotation={[Math.PI / 2, 0, 0]} 
        scale={2.522} 
      />
      <mesh 
        geometry={nodes.Lines021.geometry} 
        material={lineMaterial} 
      />
      <mesh 
        geometry={nodes.Wall1021.geometry} 
        material={wallMaterial} 
        position={[71.891, 0, -7.792]} 
        rotation={[Math.PI / 2, 0, 0]} 
        scale={2.522} 
      />
      <mesh 
        geometry={nodes.Lines022.geometry} 
        material={lineMaterial} 
        position={[0, 0, -7.792]} 
      />
    </group>
  )
}

useGLTF.preload(walls2Src)