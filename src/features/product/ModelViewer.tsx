import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { ClothesItem, retrieveClothesDetail } from '@/services/clothesApi'
import { useThreeScene } from '@/features/product/hooks/useThreeScene'
import { ControlPanel } from '@/features/product/components/ControlPanel'
import PaintLoading from '@/features/product/components/PaintLoading'
import {
  Container,
  ErrorCard,
  ErrorOverlay,
  PreviewContainer,
} from '@/features/product/styles/moderViewer.styled'
import { GenderType, HeightType, SizeType } from '@/constants/scales'

interface ThreeJsModelViewerProps {
  objId: string
  mtlId: string
}

interface ThreeJsModelViewerProps {
  objId: string
  mtlId: string
}

const ModelViewer: React.FC<ThreeJsModelViewerProps> = ({ objId, mtlId }) => {
  const [objClothesItem, setObjClothesItem] = useState<ClothesItem | null>(null)
  const [mtlClothesItem, setMtlClothesItem] = useState<ClothesItem | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const modelRef = useRef<THREE.Object3D | null>(null)

  const [gender, setGender] = useState<GenderType>('남자')
  const [size, setSize] = useState<SizeType>('M')
  const [height, setHeight] = useState<HeightType>('170~')
  const [color, setColor] = useState<string>('#71BFFF')

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
    height,
    gender,
    color
  )

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
        color={color}
        onGenderChange={setGender}
        onSizeChange={setSize}
        onHeightChange={setHeight}
        onColorChange={setColor}
      />
    </Container>
  )
}

export default ModelViewer