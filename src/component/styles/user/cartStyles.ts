import styled from 'styled-components'
import { colors } from '@/component/styles/globalStyle'

export const CartContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${colors.white};
`

export const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 20px;
  font-size: 14px;
`

export const Checkbox = styled.input`
  margin-right: 8px;
  cursor: pointer;
`

export const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: white;
`

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 20px;
  object-fit: cover;
`

export const ProductInfo = styled.div`
  font-family: 'Pretendard', sans-serif;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;

  p:first-child {
    font-weight: 500;
    color: #000;
    margin-bottom: 4px;
  }
`

export const PriceInfo = styled.div`
  margin-left: 20px;
  font-family: 'Pretendard', sans-serif;
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #767676;
    padding: 4px;
  }
`

export const OriginalPrice = styled.p`
  font-family: 'Pretendard', sans-serif;
  text-decoration: line-through;
  color: #767676;
  font-size: 14px;
`

export const CurrentPrice = styled.p`
  font-family: 'Pretendard', sans-serif;
  color: #000;
  font-size: 16px;
`

export const PurchaseButton = styled.button`
  font-family: 'Pretendard', sans-serif;
  width: 100%;
  padding: 15px 0;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 20px 0;

  &:hover {
    background-color: #333;
  }
`

export const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 4px;
  margin-top: 20px;
`

export const TotalLabel = styled.p`
  font-weight: bold;
  font-size: 18px;
  color: #000;
  margin-bottom: 8px;
`

export const PriceLabel = styled.p`
  color: #767676;
  font-size: 14px;
  margin-top: 4px;
`

export const DiscountPrice = styled.p`
  color: #2f80ed;
  font-size: 14px;
  margin-top: 4px;
`
export const DeleteButton = styled.button`
  font-family: 'Pretendard', sans-serif;
  background: none;
  border: none;
  color: #767676;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`
export const DeleteProductButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #767676;
  padding: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
    color: #ff4d4f;
  }
`

export const QuantityButton = styled.button`
  background: white;
  border: 1px solid #e0e0e0;
  color: #333;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 8px;
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;

  &:hover {
    background-color: #f8f8f8;
  }

  &:active {
    background-color: #e8e8e8;
  }
`

export const QuantityContainer = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`

export const QuantityDisplay = styled.span`
  margin: 0 12px;
  font-size: 16px;
  min-width: 40px;
  text-align: center;
`
