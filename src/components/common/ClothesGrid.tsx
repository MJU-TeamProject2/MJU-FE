import {
  GridContainer,
  GridItem,
  OutfitImage,
  ProductName,
  ProductPrice,
  ProductInfo,
} from '@/components/styles/home.styled'
import React from 'react'
import { Product } from '@/components/types/domain.types'

interface ClothesGridProps {
  clothes: Product[]
  onItemClick: (id: number) => void
}

export const ClothesGrid: React.FC<ClothesGridProps> = ({
  clothes,
  onItemClick,
}) => (
  <GridContainer>
    {clothes.map((item) => (
      <GridItem key={item.id} onClick={() => onItemClick(item.id)}>
        <OutfitImage src={item.imageUrl} alt={item.name} />
        <ProductInfo>
          <ProductName>{item.name}</ProductName>
          <ProductPrice>{item.price.toLocaleString()}원</ProductPrice>
        </ProductInfo>
      </GridItem>
    ))}
  </GridContainer>
)
