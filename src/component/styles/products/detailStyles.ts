import styled from 'styled-components'
import { colors } from '@/component/styles/globalStyle'

export const ProductDetailContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background: ${colors.background};
`

export const ProductInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 100%;
  padding: 20px;
`

export const ProductContentWrapper = styled.div`
  display: flex;
  flex: 1;
`

export const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
`

export const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
`

export const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  margin-left: 10px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    height: 80%;
    left: 0;
    width: 1px;
    background-color: ${colors.primary};
  }
`

export const ProductName = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: ${colors.text};
`

export const Price = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${colors.text};
`

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #333;
  color: ${colors.text};
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`

export const Button = styled.button`
  flex: 1;
  padding: 15px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    opacity: 0.9;
  }
`

export const BuyButton = styled(Button)`
  background-color: #4a90e2;
  color: ${colors.text};
`

export const CartButton = styled(Button)`
  background-color: #f0f0f0;
  color: #000;
`

export const FittingRoomSection = styled.div`
  width: 25%;
  height: 100%;
  position: relative;
  background-color: #333;
`

export const FittingRoomButton = styled(Button)`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  background-color: #4a90e2;
  color: ${colors.text};
`
