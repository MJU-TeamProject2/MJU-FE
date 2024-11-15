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

    setLoadingProgress(0) // 로딩 시작 시 0으로 초기화

    const container = containerRef.current
    const renderWidth = container.clientWidth
    const renderHeight = container.clientHeight

    // Scene 설정
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#333333')

    // Camera 설정
    const camera = new THREE.PerspectiveCamera(
      75,
      renderWidth / renderHeight,
      0.1,
      1000
    )

    // Renderer 설정
    if (!rendererRef.current) {
      rendererRef.current = new THREE.WebGLRenderer({ antialias: true })
    }
    const renderer = rendererRef.current
    renderer.setSize(renderWidth, renderHeight)

    // renderer DOM 요소 추가
    if (!container.querySelector('canvas')) {
      container.appendChild(renderer.domElement)
    }

    // Controls 설정
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.screenSpacePanning = false
    controls.maxPolarAngle = Math.PI / 2

    // Lighting 설정
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(1, 1, 1).normalize()
    scene.add(ambientLight, directionalLight)

    // MTL 로딩
    console.log('Loading MTL from:', mtlClothesItem.mtlUrl) // mtlUrl이 맞는지 확인
    const mtlLoader = new MTLLoader()
    mtlLoader.load(
      mtlClothesItem.mtlUrl, // objectUrl이 아닌 mtlUrl 사용
      (materials) => {
        materials.preload()
        setLoadingProgress(30) // MTL 로딩 완료

        // OBJ 로딩
        console.log('Loading OBJ from:', objClothesItem.objectUrl)
        const objLoader = new OBJLoader()
        objLoader.setMaterials(materials)

        objLoader.load(
          objClothesItem.objectUrl,
          (object) => {
            // 기존 모델 제거
            if (modelRef.current) {
              scene.remove(modelRef.current)
            }

            object.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                child.material = materials.create('material0')
                if ('specular' in child.material) {
                  child.material.specular.setRGB(1.0, 0.9, 0.9)
                  child.material.shininess = 100
                }
              }
            })

            // 스케일 및 위치 조정
            const widthScale = sizeScales[size]
            const heightScale = heightScales[height]
            object.scale.set(widthScale, heightScale, widthScale)
            object.position.set(0, 0, 0)
            object.rotation.y = (Math.PI / 180) * -25

            // 모델 중앙 정렬
            const box = new THREE.Box3().setFromObject(object)
            const center = box.getCenter(new THREE.Vector3())
            object.position.sub(center)

            modelRef.current = object
            scene.add(object)

            // 카메라 위치 설정
            camera.position.set(0, 0, 0.3)
            camera.lookAt(new THREE.Vector3(0, 0, 0))

            setLoadingProgress(100) // 로딩 완료
            setError(null)
          },
          // OBJ 로딩 진행률
          (xhr) => {
            const objProgress = (xhr.loaded / xhr.total) * 70 // OBJ 로딩은 30-100%
            setLoadingProgress(30 + objProgress) // MTL 30% + OBJ 진행률
          },
          // OBJ 로딩 에러
          (err) => {
            console.error('OBJ loading error:', err)
            // @ts-ignore
            setError(new Error(`OBJ 파일 로딩 실패: ${err.message}`))
            setLoadingProgress(0)
          }
        )
      },
      // MTL 로딩 진행률
      (xhr) => {
        const mtlProgress = (xhr.loaded / xhr.total) * 30 // MTL 로딩은 0-30%
        setLoadingProgress(mtlProgress)
      },
      // MTL 로딩 에러
      (err) => {
        console.error('MTL loading error:', err)
        // @ts-ignore
        setError(new Error(`MTL 파일 로딩 실패: ${err.message}`))
        setLoadingProgress(0)
      }
    )

    // 애니메이션 루프
    let animationFrameId: number
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // 윈도우 리사이즈 핸들러
    const handleResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize, false)

    // 클린업
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
