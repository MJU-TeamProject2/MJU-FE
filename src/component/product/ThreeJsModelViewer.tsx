import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { ClothesItem, retrieveClothesDetail } from '@/api/clothesApi.ts'

const ThreeJsModelViewer: React.FC<{ objId: string; mtlId: string }> = ({
                                                                          objId,
                                                                          mtlId,
                                                                        }) => {
  const [objClothesItem, setObjClothesItem] = useState<ClothesItem | null>(null)
  const [mtlClothesItem, setMtlClothesItem] = useState<ClothesItem | null>(null)
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchClothesItems = async () => {
      const [obj, mtl] = await Promise.all([
        retrieveClothesDetail(objId),
        retrieveClothesDetail(mtlId),
      ])
      setObjClothesItem(obj)
      setMtlClothesItem(mtl)
    }
    fetchClothesItems()
  }, [])

  useEffect(() => {
    if (!mountRef.current) return
    if (objClothesItem == null || mtlClothesItem == null) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    // OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.screenSpacePanning = false
    controls.maxPolarAngle = Math.PI / 2

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(1, 1, 1).normalize()
    scene.add(directionalLight)

    // Model loading
    const mtlLoader = new MTLLoader()
    mtlLoader.load(mtlClothesItem.imageUrl, (materials) => {
      materials.preload()

      const objLoader = new OBJLoader()
      objLoader.setMaterials(materials)
      objLoader.load(
        objClothesItem.imageUrl,
        (object) => {
          object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = materials.create('material0')
              child.material.color.setRGB(0.8, 0.1, 0.1)
              child.material.specular.setRGB(1.0, 0.9, 0.9)
              child.material.shininess = 100
            }
          })
          object.scale.set(0.1, 0.1, 0.1)
          object.position.set(0, 0, 0)
          object.rotation.y = (Math.PI / 180) * -25

          const box = new THREE.Box3().setFromObject(object)
          const center = box.getCenter(new THREE.Vector3())
          object.position.sub(center)

          scene.add(object)

          camera.position.set(0, 0, 15)
          camera.lookAt(new THREE.Vector3(0, 0, 0))
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
          console.log('An error happened', error)
        },
      )
    })

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Window resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize, false)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      mountRef.current?.removeChild(renderer.domElement)
      controls.dispose() // OrbitControls 정리
    }
  }, [objClothesItem, mtlClothesItem])

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
}

export default ThreeJsModelViewer
