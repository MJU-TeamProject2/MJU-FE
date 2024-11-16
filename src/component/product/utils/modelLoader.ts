import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { ClothesItem } from '@/api/clothesApi'
import { SceneManager } from '@/component/product/utils/SceneManager'
import { createMaterials } from '@/component/product/utils/materials'
import { heightScales, sizeScales } from '@/component/product/constants/scales'
import { HeightType, SizeType } from '@/component/product/types'
import React from 'react'

interface ModelLoaderConfig {
  sceneManager: SceneManager
  mtlClothesItem: ClothesItem
  objClothesItem: ClothesItem
  gender: string
  size: SizeType
  height: HeightType
  color: string
  modelRef: React.MutableRefObject<THREE.Object3D | null>
  onProgress: (progress: number) => void
  onError: (error: Error) => void
  onSuccess: () => void
}

export const loadModel = ({
  sceneManager,
  mtlClothesItem,
  objClothesItem,
  gender,
  size,
  height,
  color,
  modelRef,
  onProgress,
  onError,
  onSuccess,
}: ModelLoaderConfig) => {
  const mtlLoader = new MTLLoader()

  mtlLoader.load(
    mtlClothesItem.mtlUrl,
    (materials) => {
      materials.preload()
      onProgress(30)

      const objLoader = new OBJLoader()
      objLoader.setMaterials(materials)

      const modelUrl =
        gender === '남자'
          ? objClothesItem.objectUrl
          : objClothesItem.objectFemaleUrl

      objLoader.load(
        modelUrl,
        (object) => {
          if (modelRef.current) {
            sceneManager.removeFromScene(modelRef.current)
          }

          const materials = createMaterials(color)
          const baseScale = 1
          const sizeScale = sizeScales[size]
          const heightScale = heightScales[height]

          object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              const isClothGroup =
                child.name.includes('Group7196') ||
                child.name.includes('Group24890')

              child.material = isClothGroup
                ? materials.cloth
                : materials.mannequin
              const scale = isClothGroup ? sizeScale : heightScale
              child.scale.set(
                baseScale * scale,
                baseScale * scale,
                baseScale * scale
              )

              if (isClothGroup) {
                const value = gender === '여자' ? 150 : 110

                const yOffset = (heightScale - sizeScale) * value
                if (heightScale != sizeScale) {
                  const zOffset = 0.1
                  child.position.set(0, yOffset, zOffset)
                } else {
                  child.position.set(0, yOffset, 0)
                }
              }

              child.castShadow = true
              child.receiveShadow = true
            }
          })

          object.position.set(0, 0, 0)
          const box = new THREE.Box3().setFromObject(object)
          const center = box.getCenter(new THREE.Vector3())
          object.position.sub(center)

          modelRef.current = object
          sceneManager.addToScene(object)
          sceneManager.setCameraPosition(gender)

          onProgress(100)
          onSuccess()
        },
        (xhr) => {
          const objProgress = (xhr.loaded / xhr.total) * 70
          onProgress(30 + objProgress)
        }, // @ts-ignore
        (error) => onError(new Error(`OBJ 파일 로딩 실패: ${error.message}`))
      )
    },
    (xhr) => {
      const mtlProgress = (xhr.loaded / xhr.total) * 30
      onProgress(mtlProgress)
    }, // @ts-ignore
    (error) => onError(new Error(`MTL 파일 로딩 실패: ${error.message}`))
  )
}
