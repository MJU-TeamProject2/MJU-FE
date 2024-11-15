import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { ClothesItem, retrieveClothesDetail } from '@/api/clothesApi'
import { GenderType, HeightType, SizeType } from '@/component/product/types'
import { useThreeScene } from '@/component/product/hook/useThreeScene'
import { ControlPanel } from '@/component/product/components/ControlPanel'
import PaintLoading from '@/component/product/components/PaintLoading'
import {
  Container,
  ErrorCard,
  ErrorOverlay,
  PreviewContainer,
} from '@/component/product/styles/moderViewerStyle'

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
  const containerRef = useRef<HTMLDivElement>(null)
  const modelRef = useRef<THREE.Object3D | null>(null)

  const [gender, setGender] = useState<GenderType>('남자')
  const [size, setSize] = useState<SizeType>('M')
  const [height, setHeight] = useState<HeightType>('170~')

  // API로부터 의류 데이터 불러오기
  useEffect(() => {
    const fetchClothesItems = async () => {
      try {
        const [obj, mtl] = await Promise.all([
          retrieveClothesDetail(objId),
          retrieveClothesDetail(mtlId),
        ])
        setObjClothesItem(obj)
        setMtlClothesItem(mtl)
      } catch (err) {
        console.error('Failed to fetch clothes items:', err)
      }
    }
    fetchClothesItems()
  }, [objId, mtlId])

  const { loadingProgress, error } = useThreeScene(
    containerRef,
    objClothesItem,
    mtlClothesItem,
    modelRef,
    size,
    height
  )

  // 모델 색상 업데이트
  const updateModelColor = (selectedGender: GenderType) => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // 성별에 따른 색상 설정 로직
          if (selectedGender === '남자') {
            // 남성용 색상 설정
          } else {
            // 여성용 색상 설정
          }
        }
      })
    }
  }

  // 성별 변경 핸들러
  const handleGenderChange = (newGender: GenderType) => {
    setGender(newGender)
    updateModelColor(newGender)
  }

  return (
    <Container>
      <PreviewContainer ref={containerRef}>
        {loadingProgress < 100 && !error && (
          <PaintLoading loadingProgress={Math.round(loadingProgress)} />
        )}

        {error && (
          <ErrorOverlay>
            <ErrorCard>{error.message}</ErrorCard>
          </ErrorOverlay>
        )}
      </PreviewContainer>

      <ControlPanel
        gender={gender}
        size={size}
        height={height}
        onGenderChange={handleGenderChange}
        onSizeChange={setSize}
        onHeightChange={setHeight}
      />
    </Container>
  )
}
export default ThreeJsModelViewer
