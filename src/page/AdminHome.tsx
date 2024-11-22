import React, { useEffect, useState } from 'react'
import { retrieveAllClothes, ClothesItem } from '@/api/clothesApi'
import { useNavigate } from 'react-router-dom'
import {
  AdminHomeContainer,
  OutfitImage,
  Subtitle,
  Title,
  PaginationContainer,
  GridContainer,
  GridItem,
  PaginationButton,
  OrderHistoryButton,
  ProductName,
  ProductPrice,
} from '@/component/styles/home/adminHomeStyle'

const AdminHome: React.FC = () => {
  const [clothes, setClothes] = useState<ClothesItem[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [, setIsLoading] = useState(false)
  const [, setError] = useState<string | null>(null)

  const navigate = useNavigate()
  const pageSize = 10

  useEffect(() => {
    fetchClothes()
  }, [currentPage])

  const fetchClothes = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await retrieveAllClothes(currentPage, pageSize)
      setClothes(response.content)
      setTotalPages(Math.ceil(response.total / pageSize))
    } catch (err) {
      setError('Failed to fetch products. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleItemClick = (id: number) => {
    navigate(`/productsModify/${id}`)
  }

  const handleOrderHistoryClick = () => {
    navigate('/adminOrderHistory')
  }

  return (
    <AdminHomeContainer>
      <Title> 등록된 의상 목록 </Title>
      <Subtitle> 상품 정보를 수정하려면 해당 상품을 클릭해주세요 </Subtitle>
      <OrderHistoryButton onClick={handleOrderHistoryClick}>
        주문 내역 조회
      </OrderHistoryButton>
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
    </AdminHomeContainer>
  )
}

export default AdminHome
