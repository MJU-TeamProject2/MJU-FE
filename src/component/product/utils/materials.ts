import * as THREE from 'three'

export const createMaterials = (color: string) => {
  const materials = {
    cloth: new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: 0.9,
      metalness: 0.05,
      transparent: true,
      opacity: 0.9,
    }),
  }
  return materials
}
