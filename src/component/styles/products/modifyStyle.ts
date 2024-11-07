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
  align-items: center;
  margin: 30px;
`

export const ButtonContainer = styled.div`
  display: flex;
`
export const ModifyButtonContainer = styled.div`
  display: none;
`

export const ProductInfoContainer = styled.div`
  flex: 2;
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 7px;
  border: 1px solid white;
`

export const ProductFixContainer = styled.div`
  display: none;
  flex: 2;
  width: 70%;
  height: 100%;
  margin: 30px;
  border-radius: 7px;
  border: 1px solid white;
  text-align: center;
`

export const ProductWrapper = styled.div`
  width: 100%;
  align-items: center;
  margin-block: 15px;
  display: flex;
  padding: 2%;
`

export const ProductMainImage = styled.img`
  max-height: 70vh;
  width: 80%;
  object-fit: contain;
  object-position: center;
  border-radius: 8px;
`

export const ProductTag = styled.p`
  font-size: 24px;
  flex: 2;
  color: ${colors.white};
  font-weight: bold;
`

export const ProductInfo = styled.p`
  font-size: 20px;
  flex: 6;
  color: lightblue;
  padding: 1%;
  border-left: 1px solid lightgray;
`

export const Title = styled.h1`
  text-align: center;
  width: 100%;
  margin: 20px;
  font-size: 36px;
  color: ${colors.white};
`

export const ProductSection = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
`

export const Input = styled.input`
  flex: 6;
  padding: 1.5%;
  width: 100%;
  font-size: 20px;
  background: transparent;
  border: none;
  border-bottom: 1px solid lightgray;
  color: lightgray;
  outline: none;
  text-align: center;
`

export const FileInput = styled.p`
  background-color: white;
  border: solid 1px darkgray;
  border-radius: 3px;
  text-align: center;
  padding: 1.5%;
  margin: 1.5%;
  flex: 5;
  &:hover {
    cursor: pointer;
    background-color: lightgray;
  }
`

export const Select = styled.select`
  flex: 6;
  padding: 1.5%;
  font-size: 16px;
  text-align: center;
`
export const Option = styled.option`
  font-size: 16px;
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

export const DeleteButton = styled.button`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-inline: 30px;
  background-color: darkred;
  color: ${colors.white};
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  cursor: pointer;
  margin: 20px;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`

export const ModifyButton = styled.button`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-inline: 30px;
  background-color: darkgreen;
  color: ${colors.white};
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  cursor: pointer;
  margin: 20px;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`

export const Form = styled.form`
  padding: 0;
  margin: 0;
  width: 100%;
  justify-content: center;
  display: flex;
`
export const HiddenContainer = styled.div`
  display: none;
`

export const SizeButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 6;
  border-left: 1px solid lightgray;
`
export const SizeButton = styled.button`
  border: solid 1px lightblue;
  padding-inline: 30px;
  padding-block: 10px;
  margin-left: 10px;
  background-color: ${colors.adminBackground};
  color: lightblue;
  font-weight: bold;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`

export const ModifyRankContainer = styled.div`
  border-bottom: solid 2px gray;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 5px;
  margin-inline: 20px;
  display: flex;
`
export const ModifyRank = styled.p`
  flex: 2;
  font-size: 18px;
  color: lightgray;
  background-color: ${colors.adminBackground};
`
