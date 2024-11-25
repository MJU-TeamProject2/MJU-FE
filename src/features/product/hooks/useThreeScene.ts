import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { ClothesItem } from '@/services/clothesApi'
import { SceneManager } from '@/features/product/utils/SceneManager'
import { loadModel } from '@/features/product/utils/modelLoader'
import { createLights } from '@/features/product/utils/lights'
import { GenderType, HeightType, SizeType } from '@/constants/scales'

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
  height: HeightType,
  gender: GenderType,
  color: string = '#99D9EA'
): UseThreeSceneReturn => {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [error, setError] = useState<Error | null>(null)
  const sceneManagerRef = useRef<SceneManager | null>(null)

  useEffect(() => {
    if (!containerRef.current || !objClothesItem || !mtlClothesItem) return

    setLoadingProgress(0)
    setError(null)

    const container = containerRef.current

    if (!sceneManagerRef.current) {
      sceneManagerRef.current = new SceneManager(container)
    }

    const sceneManager = sceneManagerRef.current

    const lights = createLights()
    lights.forEach((light) => sceneManager.addToScene(light))

    loadModel({
      sceneManager,
      mtlClothesItem,
      objClothesItem,
      gender,
      size,
      height,
      color,
      modelRef,
      onProgress: setLoadingProgress,
      onError: (err) => {
        console.error(err)
        setError(err)
        setLoadingProgress(0)
      },
      onSuccess: () => setError(null),
    })

    let animationFrameId: number
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      sceneManager.animate()
    }
    animate()

    const handleResize = () => {
      const { clientWidth, clientHeight } = container
      sceneManager.handleResize(clientWidth, clientHeight)
    }
    window.addEventListener('resize', handleResize, false)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)

      if (modelRef.current) {
        sceneManager.removeFromScene(modelRef.current)
        modelRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose()
            if (child.material instanceof THREE.Material) {
              child.material.dispose()
            }
          }
        })
      }

      lights.forEach((light) => sceneManager.removeFromScene(light))
    }
  }, [objClothesItem, mtlClothesItem, size, height, color, gender])

  return {
    loadingProgress,
    error,
  }
}
