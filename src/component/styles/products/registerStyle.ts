import styled from 'styled-components'
import { colors } from '@/component/styles/globalStyle'

export const ProductRegisterContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${colors.adminBackground};
`
export const ProductInformationContainer = styled.div`
  width: 70%;
  flex: 7;
  text-align: center;
  border: solid 1px lightgray;
  margin-top: 20px;
  border-radius: 10px;
`
export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5px 180px;
`

export const ProductInputContainer = styled.div`
  display: flex;
  padding: 20px 15px;
`
export const ProductImageContainer = styled.div`
  flex: 4;
  width: 300px;
  height: 30vh;
  border: solid 2px black;
  text-align: center;
  align-content: center;
`

export const Title = styled.h1`
  width: 100%;
  margin: 30px 0;
  font-size: 36px;
  text-align: center;
  color: ${colors.white};
`

export const Tag = styled.p`
  width: 100%;
  flex: 4;
  color: white;
  text-align: center;
  padding: 10px;
  font-size: 24px;
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

export const Input = styled.input`
  flex: 6;
  font-size: 18px;
  text-align: center;
`

export const FileInput = styled.p`
  background-color: white;
  border: solid 1px darkgray;
  border-radius: 3px;
  font-size: 18px;
  text-align: center;
  padding-top: 10px;
  flex: 6;
  &:hover {
    cursor: pointer;
    background-color: lightgray;
  }
`
export const Button = styled.button`
  width: 40%;
  padding: 10px;
  margin-block: 20px;
  border: 1px solid darkgray;
  background-color: green;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
    &:hover {
        opacity: 0.6
    }
}
`

export const Select = styled.select`
  flex: 6;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`

export const Option = styled.option`
  font-size: 14px;
`

export const HiddenContainer = styled.div`
  opacity: 0;
`

export const BlankImage = styled.div`
  background-color: white;
  height: 300px;
  width: 100%;
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
export const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 12px;
  margin-top: -15px;
  margin-bottom: 10px;
`
