import { useNavigate } from 'react-router-dom'
import {
  AdminHomeContainer,
  Title,
  Subtitle,
  OrderHistoryButton,
} from '@/components/styles/adminHomeStyle'
import { useClothes } from '@/components/hooks/useClothes'
import { ClothesGrid } from '@/components/ClothesGrid'
import { Pagination } from '@/components/Pagination'

const AdminHome = () => {
  const navigate = useNavigate()
  const { clothes, currentPage, totalPages, handlePageChange } = useClothes({})

  return (
    <AdminHomeContainer>
      <Title>등록된 의상 목록</Title>
      <Subtitle>상품 정보를 수정하려면 해당 상품을 클릭해주세요</Subtitle>
      <OrderHistoryButton onClick={() => navigate('/adminOrderHistory')}>
        주문 내역 조회
      </OrderHistoryButton>
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
