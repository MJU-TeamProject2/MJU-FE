import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { SceneManager } from '@/domain/product/utils/SceneManager'
import { createMaterials } from '@/domain/product/utils/materials'
import React from 'react'
import {
  heightScales,
  HeightType,
  sizeScales,
  SizeType,
} from '@/constants/scales'
import { Product } from '@/components/types/domain.types'

interface ModelLoaderConfig {
  sceneManager: SceneManager
  mtlClothesItem: Product
  objClothesItem: Product
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
      console.log(mtlClothesItem.mtlUrl)
      console.log(mtlClothesItem.objectUrl)
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

          const materials = {
            ...createMaterials(color),
          }

          const baseScale = 1
          const sizeScale = sizeScales[size]
          const heightScale = heightScales[height]

          object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              let material
              let scale = heightScale
              if (child.name == 'cloth') {
                material = materials.cloth
                scale = sizeScale
                if (gender === '여자') {
                  const yOffset = Math.abs(heightScale - sizeScale) * 50
                  child.position.set(0, yOffset, 0)
                } else {
                  const yOffset = Math.abs(heightScale - sizeScale) * 110
                  child.position.set(0, yOffset, 0)
                }
                child.material = material
              }
              child.scale.set(
                baseScale * scale,
                baseScale * scale,
                baseScale * scale
              )

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
