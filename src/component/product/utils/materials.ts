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
    mannequin: new THREE.MeshStandardMaterial({
      color: 0xfff6e0,
      roughness: 0.7,
      metalness: 0.2,
      transparent: true,
      opacity: 0.95,
    }),
  }

  return materials
}
