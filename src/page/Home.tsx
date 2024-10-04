import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  GridContainer,
  GridItem,
  HomeContainer,
  OutfitImage,
  Title,
  PaginationContainer,
  PaginationButton,
  ProductName,
  ProductPrice,
} from '@/component/styles/home/homeStyle'
// import { retriveAllClothes, ClothesItem } from '@/api/clothesApi' // API 관련 부분 주석 처리

// 더미 데이터 생성
const dummyClothes = [
  { id: 1, name: 'Cool Jacket', imageUrl: '/images/jacket.png', price: 89000 },
  { id: 2, name: 'Stylish Jeans', imageUrl: '/images/jeans.png', price: 55000 },
  {
    id: 3,
    name: 'Comfy Sweater',
    imageUrl: '/images/sweater.png',
    price: 65000,
  },
  // 필요한 더미 데이터 추가 가능
]

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [clothes] = useState(dummyClothes) // 더미 데이터를 초기값으로 설정
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = 1 // 더미 데이터에 맞게 총 페이지 수를 설정

  /*
  useEffect(() => {
    fetchClothes()  // API 호출을 위한 useEffect 주석 처리
  }, [currentPage])

  const fetchClothes = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await retriveAllClothes(currentPage, pageSize)
      setClothes(response.content)
      setTotalPages(Math.ceil(response.total / pageSize))
    } catch (err) {
      setError('Failed to fetch products. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }
  */

  const handleItemClick = (id: number) => {
    navigate(`/products/${id}`)
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  return (
    <HomeContainer>
      <Title>추천 의상</Title>
      <GridContainer>
        {clothes.map((item) => (
          <GridItem key={item.id} onClick={() => handleItemClick(item.id)}>
            <OutfitImage src={item.imageUrl} alt={item.name} />
            <ProductName>{item.name}</ProductName>
            <ProductPrice>{item.price.toLocaleString()}원</ProductPrice>
          </GridItem>
        ))}
      </GridContainer>
      <PaginationContainer>
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          이전
        </PaginationButton>
        <span>
          {currentPage + 1} / {totalPages}
        </span>
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          다음
        </PaginationButton>
      </PaginationContainer>
    </HomeContainer>
  )
}

export default Home
