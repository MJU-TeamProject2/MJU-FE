import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeContainer } from '@/components/styles/homeStyle'
import { useClothes } from '@/components/hooks/useClothes'
import { ClothesGrid } from '@/components/ClothesGrid'
import { Pagination } from '@/components/Pagination'
import { CategoryTabs } from '@/components/CategoryTabs'

const Home = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('ALL')
  const {
    clothes,
    currentPage,
    totalPages,
    isLoading,
    error,
    handlePageChange,
  } = useClothes({ category: activeTab })

  if (isLoading) return <HomeContainer>Loading...</HomeContainer>
  if (error) return <HomeContainer>{error}</HomeContainer>

  return (
    <div>
      <CategoryTabs
        tabs={['ALL', 'OUTERWEAR', 'TOPS', 'PANTS', 'DRESSES', 'SHOES']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <ClothesGrid
        clothes={clothes}
        onItemClick={(id) => navigate(`/products/${id}`)}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default Home
