import { useNavigate } from 'react-router-dom'
import {
  AdminHomeContainer,
  Title,
  Subtitle,
} from '@/components/styles/adminHome.styled'
import { useClothes } from '@/components/hooks/useClothes'
import { ClothesGrid } from '@/components/common/ClothesGrid'
import { Pagination } from '@/components/common/Pagination'

const AdminHome = () => {
  const navigate = useNavigate()
  const { clothes, currentPage, totalPages, handlePageChange } = useClothes({})

  return (
    <AdminHomeContainer>
      <Title>등록된 의상 목록</Title>
      <Subtitle>상품 정보를 수정하려면 해당 상품을 클릭해주세요</Subtitle>
      <ClothesGrid
        clothes={clothes}
        onItemClick={(id) => navigate(`/productsModify/${id}`)}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </AdminHomeContainer>
  )
}

export default AdminHome
