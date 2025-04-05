import React from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshBasicMaterial } from 'three'
import { useThemeStore } from '../store/themeStore'
import walls1Src from './walls1.glb'

export function Model(props) {
  const { nodes } = useGLTF(walls1Src)
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
        geometry={nodes.floor1.geometry} 
        material={floorMaterial} 
        position={[5.963, 0.91, -3.788]} 
        rotation={[0, 0, -Math.PI]} 
        scale={[-12.419, -0.139, -3.876]} 
      />
      <mesh 
        geometry={nodes.Lines002.geometry} 
        material={lineMaterial} 
        position={[0, -0.154, 0]} 
      />
      <mesh 
        geometry={nodes.Lines.geometry} 
        material={lineMaterial}
      />
      <mesh 
        geometry={nodes.Wall1.geometry} 
        material={wallMaterial} 
        position={[-4.04, 0, 0]} 
        rotation={[Math.PI / 2, 0, 0]} 
        scale={2.522} 
      />
      <mesh 
        geometry={nodes.Lines004.geometry} 
        material={lineMaterial} 
        position={[0, 0, -7.795]} 
      />
      <mesh 
        geometry={nodes.Wall1009.geometry} 
        material={wallMaterial} 
        position={[15.981, 0, -7.795]} 
        rotation={[Math.PI / 2, 0, 0]} 
        scale={2.522} 
      />
    </group>
  )
}

useGLTF.preload(walls1Src)