import {
  ImageContainer,
  ProductImage as StyledImage,
} from '@/domain/productDetail/productDetail.styled'

interface ProductImageProps {
  imageUrl: string
  name: string
}

export const ProductImage = ({ imageUrl, name }: ProductImageProps) => (
  <ImageContainer>
    <StyledImage src={imageUrl} alt={name} />
  </ImageContainer>
)
