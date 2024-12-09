import { useParams } from 'react-router-dom'
import { useProduct } from '@/domain/productDetail/useProduct'
import { ProductImage } from '@/domain/productDetail/components/ProductImage'
import { ProductActions } from '@/domain/productDetail/components/ProductActions'
import { SizeSelector } from '@/domain/productDetail/components/SizeSelector'
import {
  ProductDetailContainer,
  ProductInfoSection,
  ProductContentWrapper,
  ProductInfo,
  ProductName,
  Price,
  Divider,
} from '@/domain/productDetail/productDetail.styled'

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { product, selectedSize, setSelectedSize, availableSizes, isSoldOut } =
    useProduct(id)
  if (!product) return <div>Loading...</div>

  return (
    <ProductDetailContainer>
      <ProductInfoSection>
        <ProductContentWrapper>
          <ProductImage imageUrl={product.imageUrl} name={product.name} />
          <Divider />
          <ProductInfo>
            <ProductName>{product.name}</ProductName>
            <Price>{product.price.toLocaleString()} 원</Price>
            <SizeSelector
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              availableSizes={availableSizes}
              isSoldOut={isSoldOut}
            />
            <ProductActions
              productId={id}
              selectedSize={selectedSize}
              isSoldOut={isSoldOut}
            />
          </ProductInfo>
        </ProductContentWrapper>
      </ProductInfoSection>
    </ProductDetailContainer>
  )
}

export default ProductDetail
