import React, { useEffect } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { HeightType, SizeType } from '../types'
import { sizeScales, heightScales } from '../constants/scales'
import { ClothesItem } from '@/api/clothesApi'

export const useThreeScene = (
  containerRef: React.RefObject<HTMLDivElement>,
  objClothesItem: ClothesItem | null,
  mtlClothesItem: ClothesItem | null,
  modelRef: React.MutableRefObject<THREE.Object3D | null>,
  size: SizeType,
  height: HeightType
) => {
  useEffect(() => {
    if (!containerRef.current) return
    if (objClothesItem == null || mtlClothesItem == null) return

    const container = containerRef.current
    const renderWidth = container.clientWidth
    const renderHeight = container.clientHeight

    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#333333')

    const camera = new THREE.PerspectiveCamera(
      75,
      renderWidth / renderHeight,
      0.1,
      1000
    )

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(renderWidth, renderHeight)

    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }
    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.screenSpacePanning = false
    controls.maxPolarAngle = Math.PI / 2

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(1, 1, 1).normalize()
    scene.add(ambientLight, directionalLight)

    // Load 3D model
    const mtlLoader = new MTLLoader()
    mtlLoader.load(mtlClothesItem.objectUrl, (materials) => {
      materials.preload()
      const objLoader = new OBJLoader()
      objLoader.setMaterials(materials)
      objLoader.load(
        objClothesItem.objectUrl,
        (object) => {
          object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = materials.create('material0')
              child.material.specular.setRGB(1.0, 0.9, 0.9)
              child.material.shininess = 100
            }
          })

          const widthScale = sizeScales[size]
          const heightScale = heightScales[height]
          object.scale.set(widthScale, heightScale, widthScale)
          object.position.set(0, 0, 0)
          object.rotation.y = (Math.PI / 180) * -25

          const box = new THREE.Box3().setFromObject(object)
          const center = box.getCenter(new THREE.Vector3())
          object.position.sub(center)

          modelRef.current = object
          scene.add(object)

          camera.position.set(0, 0, 0.3)
          camera.lookAt(new THREE.Vector3(0, 0, 0))
        },
        (xhr) => console.log((xhr.loaded / xhr.total) * 100 + '% loaded'),
        (error) => console.log('An error happened', error)
      )
    })

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize, false)

    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      controls.dispose()
    }
  }, [objClothesItem, mtlClothesItem])
}
