import { ClothesItem } from '@/services/clothesApi'
import {
  GridContainer,
  GridItem,
  OutfitImage,
  ProductName,
  ProductPrice,
  ProductInfo,
} from '@/components/styles/homeStyle'

interface ClothesGridProps {
  clothes: ClothesItem[]
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
