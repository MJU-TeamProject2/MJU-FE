import {
  ImageContainer,
  ProductImage as StyledImage,
} from '@/features/productDetail/productDetail.styled'

interface ProductImageProps {
  imageUrl: string
  name: string
}

export const ProductImage = ({ imageUrl, name }: ProductImageProps) => (
  <ImageContainer>
    <StyledImage src={imageUrl} alt={name} />
  </ImageContainer>
)
