import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { ClothesItem, retrieveClothesDetail } from '@/api/clothesApi'
import { GenderType, HeightType, SizeType } from '@/component/product/types'
import { heightScales, sizeScales } from '@/component/product/constants/scales'
import { useThreeScene } from '@/component/product/hook/useThreeScene'
import { ControlPanel } from '@/component/product/components/ControlPanel'

interface ThreeJsModelViewerProps {
  objId: string
  mtlId: string
}

const ThreeJsModelViewer: React.FC<ThreeJsModelViewerProps> = ({
  objId,
  mtlId,
}) => {
  const [objClothesItem, setObjClothesItem] = useState<ClothesItem | null>(null)
  const [mtlClothesItem, setMtlClothesItem] = useState<ClothesItem | null>(null)
  const mountRef = useRef<HTMLDivElement>(null)
  const modelRef = useRef<THREE.Object3D | null>(null)

  const [gender, setGender] = useState<GenderType>('남자')
  const [size, setSize] = useState<SizeType>('M')
  const [height, setHeight] = useState<HeightType>('170~')

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
  }, [objId, mtlId])

  useEffect(() => {
    if (modelRef.current) {
      const widthScale = sizeScales[size]
      const heightScale = heightScales[height]
      modelRef.current.scale.set(widthScale, heightScale, widthScale)
    }
  }, [size, height])

  const updateModelColor = (selectedGender: GenderType) => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          console.log(selectedGender)
        }
      })
    }
  }

  const handleGenderChange = (newGender: GenderType) => {
    setGender(newGender)
    updateModelColor(newGender)
  }

  useThreeScene(
    mountRef,
    objClothesItem,
    mtlClothesItem,
    modelRef,
    size,
    height
  )

  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh' }}>
      <div
        ref={mountRef}
        style={{
          width: '50%',
          height: '100%',
          backgroundColor: '#333',
        }}
      />
      <ControlPanel
        gender={gender}
        size={size}
        height={height}
        onGenderChange={handleGenderChange}
        onSizeChange={setSize}
        onHeightChange={setHeight}
      />
    </div>
  )
}

export default ThreeJsModelViewer
