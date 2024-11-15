import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { HeightType, SizeType } from '../types'
import { sizeScales, heightScales } from '../constants/scales'
import { ClothesItem } from '@/api/clothesApi'

interface UseThreeSceneReturn {
  loadingProgress: number
  error: Error | null
}

export const useThreeScene = (
  containerRef: React.RefObject<HTMLDivElement>,
  objClothesItem: ClothesItem | null,
  mtlClothesItem: ClothesItem | null,
  modelRef: React.MutableRefObject<THREE.Object3D | null>,
  size: SizeType,
  height: HeightType
): UseThreeSceneReturn => {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [error, setError] = useState<Error | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    if (!objClothesItem || !mtlClothesItem) return

    setLoadingProgress(0)

    const container = containerRef.current
    const renderWidth = container.clientWidth
    const renderHeight = container.clientHeight

    // Scene 설정
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#4a4a4a')

    const camera = new THREE.PerspectiveCamera(
      75,
      renderWidth / renderHeight,
      0.1,
      1000
    )

    if (!rendererRef.current) {
      rendererRef.current = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      })
    }
    const renderer = rendererRef.current
    renderer.setSize(renderWidth, renderHeight)

    // 개선된 렌더링 설정
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0
    renderer.outputColorSpace = THREE.SRGBColorSpace

    if (!container.querySelector('canvas')) {
      container.appendChild(renderer.domElement)
    }

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.screenSpacePanning = false
    controls.maxPolarAngle = Math.PI / 2

    // 조명 설정
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(1, 1, 1).normalize()

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4)
    fillLight.position.set(-1, 0.5, -1).normalize()

    const backLight = new THREE.DirectionalLight(0xffffff, 0.3)
    backLight.position.set(0, -1, -1).normalize()

    scene.add(ambientLight, directionalLight, fillLight, backLight)

    const mtlLoader = new MTLLoader()
    mtlLoader.load(
      mtlClothesItem.mtlUrl,
      (materials) => {
        materials.preload()
        setLoadingProgress(30)

        const objLoader = new OBJLoader()
        objLoader.setMaterials(materials)

        objLoader.load(
          objClothesItem.objectUrl,
          (object) => {
            if (modelRef.current) {
              scene.remove(modelRef.current)
            }

            // 재질 설정
            object.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                // MeshStandardMaterial 사용 (더 물리적으로 정확한 렌더링)
                const material = new THREE.MeshStandardMaterial({
                  color: 0xdddddd,
                  roughness: 0.7, // 거칠기 (높을수록 덜 반짝임)
                  metalness: 0.1, // 금속성 (0에 가까울수록 비금속)
                  transparent: true,
                  opacity: 0.95,
                })

                child.material = material
                child.castShadow = true
                child.receiveShadow = true
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

            camera.position.set(0, 15, 20)
            camera.lookAt(new THREE.Vector3(0, 30, 0))

            setLoadingProgress(100)
            setError(null)
          },
          (xhr) => {
            const objProgress = (xhr.loaded / xhr.total) * 70
            setLoadingProgress(30 + objProgress)
          },
          (err) => {
            console.error('OBJ loading error:', err)
            // @ts-ignore
            setError(new Error(`OBJ 파일 로딩 실패: ${err.message}`))
            setLoadingProgress(0)
          }
        )
      },
      (xhr) => {
        const mtlProgress = (xhr.loaded / xhr.total) * 30
        setLoadingProgress(mtlProgress)
      },
      (err) => {
        console.error('MTL loading error:', err)
        // @ts-ignore
        setError(new Error(`MTL 파일 로딩 실패: ${err.message}`))
        setLoadingProgress(0)
      }
    )

    let animationFrameId: number
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

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
      cancelAnimationFrame(animationFrameId)
      controls.dispose()

      if (modelRef.current) {
        scene.remove(modelRef.current)
        modelRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose()
            if (child.material instanceof THREE.Material) {
              child.material.dispose()
            }
          }
        })
      }
    }
  }, [objClothesItem, mtlClothesItem, size, height])

  return {
    loadingProgress,
    error,
  }
}
