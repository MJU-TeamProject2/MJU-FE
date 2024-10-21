import styled from 'styled-components'
import { colors } from '@/component/styles/globalStyle'

export const ProductRegisterContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${colors.adminBackground};
`
export const ProductInformationContainer = styled.div`
  width: 100%;
  flex: 7;
`
export const ProductContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 5px 180px;
`

export const ProductDetailImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

export const ProductInputContainer = styled.div`
  display: flex;
  margin: 20px 0;
`
export const ProductImageContainer = styled.div`
  flex: 4;
  width: 100%;
  border: solid 2px black;
  text-align: center;
  align-content: center;
`

export const Title = styled.h1`
  width: 100%;
  margin: 20px 0;
  text-align: center;
  color: ${colors.white};
`

export const Tag = styled.p`
  width: 100%;
  flex: 4;
  color: white;
  text-align: center;
  padding: 10px;
  font-size: 20px;
`
export const ProductImage = styled.img`
  display: inline-block;
  max-height: 100%;
  width: 100%;
  object-fit: contain;
  object-position: center;
  border-radius: 8px;

  &:hover {
    cursor: pointer;
  }
`

export const ProductDetailImage = styled.img`
  display: flex;
  flex: 2;
  object-fit: contain;
  object-position: center;
  max-width: 40%;
  margin: 10px;

  &:hover {
    cursor: pointer;
  }
`

export const Input = styled.input`
  flex: 6;
`

export const FileInput = styled.p`
  background-color: white;
  border: solid 1px darkgray;
  border-radius: 3px;
  text-align: center;
  padding-top: 10px;
  flex: 6;
  
  &:hover {
    cursor: pointer;
    background-color: lightgray;
  }
`
export const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: 1px solid ${colors.primary};
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 50px;
  margin-right: 50px;
  transition: all 0.3s ease;
`

export const Select = styled.select`
  flex: 6;
  font-weight: bold;
`

export const Option = styled.option`
  font-size: 14px;
`

export const HiddenContainer = styled.div`
  opacity: 0;
`

export const BlankImage = styled.div`
  background-color: white;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`
export const BlankText = styled.p`
  color: darkgray;
  font-size: 16px;
  margin: 0;
`
