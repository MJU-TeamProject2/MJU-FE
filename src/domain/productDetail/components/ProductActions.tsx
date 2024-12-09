import { useNavigate } from 'react-router-dom'
import { postCartItems } from '@/services/cartApi'
import {
  ButtonGroup,
  BuyButton,
  CartButton,
} from '@/domain/productDetail/productDetail.styled'

interface ProductActionsProps {
  productId: string | undefined
  selectedSize: string
  isSoldOut: boolean
}

export const ProductActions = ({
  productId,
  selectedSize,
  isSoldOut,
}: ProductActionsProps) => {
  const navigate = useNavigate()

  const handleBuyButton = async () => {
    const token = localStorage.getItem('accessToken')
    try {
      if (!token) {
        throw new Error('로그인이 필요합니다.')
      }
      await postCartItems(productId, selectedSize)
      navigate('/cart')
    } catch (error) {
      console.error(error)
      alert('서버 에러 사항입니다.')
      navigate('/login')
    }
  }

  const handlePostCartItems = async () => {
    const token = localStorage.getItem('accessToken')
    try {
      if (!token) {
        throw new Error('로그인이 필요합니다.')
      }
      await postCartItems(productId, selectedSize)
      alert('장바구니 추가 완료')
    } catch (error) {
      console.error(error)
      alert('서버 에러 사항입니다.')
      navigate('/login')
    }
  }

  const handleFittingClick = () => {
    navigate('/fitting')
  }

  return (
    <>
      <ButtonGroup>
        <BuyButton onClick={handleBuyButton} disabled={isSoldOut}>
          구매하기
        </BuyButton>
        <CartButton onClick={handlePostCartItems} disabled={isSoldOut}>
          장바구니
        </CartButton>
      </ButtonGroup>
      <BuyButton onClick={handleFittingClick}>피팅하기</BuyButton>
    </>
  )
}
