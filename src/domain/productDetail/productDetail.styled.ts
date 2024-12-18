import styled from 'styled-components'
import { colors } from '@/constants'

export const ProductDetailContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background: ${colors.charcoalGrey};
  justify-content: center;
  align-items: center;
`

export const ProductInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  max-width: 1200px;
  height: auto;
  padding: 20px;
  background: ${colors.charcoalGrey};
  border-radius: 8px;
`

export const ProductContentWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  gap: 40px;
  align-items: center;
  position: relative;
`

export const Divider = styled.div`
  position: absolute;
  left: 50%;
  top: 5%;
  height: 90%;
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.8),
    transparent
  );
  transform: translateX(-50%);
  z-index: 10;

  @media (max-width: 768px) {
    display: none;
  }
`

export const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow: hidden;
  min-height: 400px;
  position: relative;
`
export const ProductImage = styled.img`
  max-height: 90%;
  max-width: 90%;
  object-fit: contain;
  object-position: center;
  border-radius: 8px;
`
export const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 20px 20px 40px;
  position: relative;
  max-width: 500px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`

export const ProductName = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: ${colors.white};
  text-align: left;
`

export const Price = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${colors.white};
`

export const SoldOut = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${colors.red};
  text-align: center;
`

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid ${colors.borderGrey};
  border-radius: 4px;
  background-color: ${colors.graphite};
  color: ${colors.white};
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: space-between;
`

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.darkGrey};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const BuyButton = styled(Button)`
  background-color: ${colors.slate};
  color: ${colors.white};
  border: 1px solid ${colors.purpleGrey};

  &:hover {
    background-color: ${colors.skyBlue};
  }
`

export const CartButton = styled(Button)`
  background-color: ${colors.primary};
  color: ${colors.white};
`
