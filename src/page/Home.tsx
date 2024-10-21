import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  GridContainer,
  GridItem,
  HomeContainer,
  OutfitImage,
  PaginationContainer,
  PaginationButton,
  ProductName,
  ProductPrice,
  TabContainer,
  Tab,
  ProductInfo,
} from '@/component/styles/home/homeStyle'
import {
  retrieveAllClothes,
  ClothesItem,
  retrieveClothesByCategory,
} from '@/api/clothesApi'

const Home = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('ALL')
  const [clothes, setClothes] = useState<ClothesItem[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const pageSize = 10 // 한 페이지에 표시할 아이템 수

  useEffect(() => {
    fetchClothes()
  }, [currentPage, activeTab])

  const fetchClothes = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response =
        activeTab == 'ALL'
          ? await retrieveAllClothes(currentPage, pageSize)
          : await retrieveClothesByCategory(currentPage, pageSize, activeTab)

      // const response = await retrieveAllClothes(currentPage, pageSize)
      setClothes(response.content)
      setTotalPages(Math.ceil(response.total / pageSize))
    } catch (err) {
      setError('Failed to fetch products. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleItemClick = (id: number) => {
    navigate(`/products/${id}`)
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  if (isLoading) return <HomeContainer>Loading...</HomeContainer>
  if (error) return <HomeContainer>{error}</HomeContainer>

  return (
    <div>
      <TabContainer>
        {['ALL', 'OUTERWEAR', 'TOPS', 'PANTS', 'DRESSES', 'SHOES'].map(
          (tab) => (
            <Tab
              key={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Tab>
          )
        )}
      </TabContainer>
      <GridContainer>
        {clothes.map((item) => (
          <GridItem key={item.id} onClick={() => handleItemClick(item.id)}>
            <OutfitImage src={item.imageUrl} alt={item.name} />
            <ProductInfo>
              <ProductName>{item.name}</ProductName>
              <ProductPrice>{item.price.toLocaleString()}원</ProductPrice>
            </ProductInfo>
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
    </div>
  )
}

export default Home
