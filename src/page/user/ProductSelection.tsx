import React, { useState } from 'react'
import {
  Container,
  Header,
  ProductTabs,
  ProductCategory,
  ProductGrid,
  ProductCard,
  ProductImage,
  ProductButtonSection,
  NextButton,
  CancelButton,
} from '@/component/styles/user/productSelectionStyles'

interface Product {
  id: string
  name: string
  imageUrl: string
  category: string
}

const ProductSelection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('상의')

  const categories = ['상의', '바지', '원피스', '아우터', '신발', '가방']
  const products: Product[] = [
    {
      id: '1',
      name: '상의 제품 1',
      imageUrl: 'https://via.placeholder.com/100',
      category: '상의',
    },
    {
      id: '2',
      name: '상의 제품 2',
      imageUrl: 'https://via.placeholder.com/100',
      category: '상의',
    },
    {
      id: '3',
      name: '바지 제품 1',
      imageUrl: 'https://via.placeholder.com/100',
      category: '바지',
    },
    {
      id: '4',
      name: '바지 제품 2',
      imageUrl: 'https://via.placeholder.com/100',
      category: '바지',
    },
    {
      id: '5',
      name: '원피스 제품 1',
      imageUrl: 'https://via.placeholder.com/100',
      category: '원피스',
    },
    {
      id: '6',
      name: '원피스 제품 2',
      imageUrl: 'https://via.placeholder.com/100',
      category: '원피스',
    },
    {
      id: '7',
      name: '아우터 제품 1',
      imageUrl: 'https://via.placeholder.com/100',
      category: '아우터',
    },
    {
      id: '8',
      name: '아우터 제품 2',
      imageUrl: 'https://via.placeholder.com/100',
      category: '아우터',
    },
    {
      id: '9',
      name: '신발 제품 1',
      imageUrl: 'https://via.placeholder.com/100',
      category: '신발',
    },
    {
      id: '10',
      name: '신발 제품 2',
      imageUrl: 'https://via.placeholder.com/100',
      category: '신발',
    },
    {
      id: '11',
      name: '가방 제품 1',
      imageUrl: 'https://via.placeholder.com/100',
      category: '가방',
    },
    {
      id: '12',
      name: '가방 제품 2',
      imageUrl: 'https://via.placeholder.com/100',
      category: '가방',
    },
  ]

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <Container>
      <Header>
        <ProductTabs>
          {categories.map((category) => (
            <ProductCategory
              key={category}
              onClick={() => handleCategoryChange(category)}
              isSelected={selectedCategory === category}
            >
              {category}
            </ProductCategory>
          ))}
        </ProductTabs>
      </Header>

      <ProductGrid>
        {products
          .filter((product) => product.category === selectedCategory)
          .map((product) => (
            <ProductCard key={product.id}>
              <ProductImage src={product.imageUrl} alt={product.name} />
              <p>{product.name}</p>
            </ProductCard>
          ))}
      </ProductGrid>

      <ProductButtonSection>
        <CancelButton>닫기</CancelButton>
        <NextButton>다음</NextButton>
      </ProductButtonSection>
    </Container>
  )
}

export default ProductSelection
