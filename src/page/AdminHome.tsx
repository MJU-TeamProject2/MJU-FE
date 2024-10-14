import React, { useEffect, useState } from 'react'
import { retrieveAllClothes, ClothesItem } from '@/api/clothesApi.ts'
import { useNavigate } from 'react-router-dom'
import { ClothesItem } from '@/api/clothesApi.ts'
import {
  AdminHomeContainer,
  OutfitImage,
  Subtitle,
  Title,
  PaginationContainer,
  GridContainer,
  GridItem,
  PaginationButton,
  ProductName,
  ProductPrice,
  RegisterButton,
} from '@/component/styles/home/adminHomeStyle'

const AdminHome: React.FC = () => {
  const [clothes, setClothes] = useState<ClothesItem[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    navigate(`/products/${id}`)
  }

  const handleRegisterCloth = () => {
    navigate('/registerCloth')
  }

  return (
    <AdminHomeContainer>
      <Title> 등록된 의상 목록 </Title>
      <Subtitle> 상품 정보를 수정하려면 해당 상품을 클릭해주세요 </Subtitle>
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
        <RegisterButton>회원 정보</RegisterButton>
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
        <RegisterButton onClick={() => handleRegisterCloth()}>
          상품 등록
        </RegisterButton>
      </PaginationContainer>
    </AdminHomeContainer>
  )
}

export default AdminHome
