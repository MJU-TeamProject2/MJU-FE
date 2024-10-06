import styled from 'styled-components'
import { colors } from '@/component/styles/globalStyle'

export const CartContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${colors.white};
  border-radius: 8px;
`

export const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
`

export const Checkbox = styled.input`
  margin-right: 10px;
`

export const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
`

export const ProductImage = styled.img`
  width: 100px;
  height: auto;
  margin-right: 20px;
`

export const ProductInfo = styled.div`
  flex: 1;
`

export const PriceInfo = styled.div`
  text-align: right;
`

export const PurchaseButton = styled.button`
  width: 100%;
  padding: 15px 0;
  background-color: #000;
  color: #fff;
  font-size: 18px;
  border: none;
  cursor: pointer;
  margin: 20px 0;
`

export const TotalSection = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`

export const DeleteButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #d32f2f;
  }
`