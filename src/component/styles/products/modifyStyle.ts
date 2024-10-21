import styled from 'styled-components'
import { colors } from '@/component/styles/globalStyle'

export const ProductModifyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${colors.adminBackground};
`

export const ProductImageContainer = styled.div`
  flex: 2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin: 30px;
`

export const ButtonContainer = styled.div`
  display: flex;
`

export const ProductInfoContainer = styled.div`
  flex: 2;
  width: 100%;
  height: 100%;
  margin: 30px;
`

export const ProductWrapper = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  margin: 10px;
`

export const ProductMainImage = styled.img`
  max-height: 80%;
  max-width: 90%;
  object-fit: contain;
  object-position: center;
  border-radius: 8px;
`

export const ProductTag = styled.p `
  font-size: 24px;
  flex: 2;
  color: ${colors.white}
`

export const ProductInfo = styled.p`
  font-size: 24px;
  flex: 5;
  color: ${ colors.blue }
`

export const Title = styled.h1`
  text-align: center;
  width: 100%;
  margin: 20px;
  color: ${ colors.white }
`

export const ProductSection = styled.div`
  display: flex;
  width: 80%;
  height: 100%;
`

export const Button = styled.button`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-inline: 30px;
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  cursor: pointer;
  margin: 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.buttonHover};
  }
`