import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  GridContainer,
  GridItem,
  HomeContainer,
  OutfitImage,
  Title,
  PaginationContainer,
  PaginationButton,
} from '@/component/styles/home/homeStyle'
import { retriveAllClothes, ClothesItem } from '@/api/clothesApi'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [clothes, setClothes] = useState<ClothesItem[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const pageSize = 10 // 한 페이지에 표시할 아이템 수

  useEffect(() => {
    fetchClothes()
  }, [currentPage])

  const fetchClothes = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await retriveAllClothes(currentPage, pageSize)
      setClothes(response.content)
      setTotalPages(Math.ceil(response.total / pageSize))
    } catch (err) {
      setError('Failed to fetch clothes. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleItemClick = (id: number) => {
    navigate(`/product/${id}`)
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <HomeContainer>
      <Title>추천 의상</Title>
      <GridContainer>
        {clothes.map((item) => (
          <GridItem key={item.id} onClick={() => handleItemClick(item.id)}>
            <OutfitImage src={item.imageUrl} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price.toLocaleString()}원</p>
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
