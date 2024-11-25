import styled from 'styled-components'
import { colors } from '@/constants'

export const ProductModifyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${colors.darkGrey};
`

export const ProductImageContainer = styled.div`
  flex: 2;
  width: 100%;
  height: 60vh;
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
  margin: 10px;
  border-block: 2px solid;
  border-color: ${colors.deepSlate};
`

export const ProductFixContainer = styled.div`
  display: none;
  flex: 2;
  width: 70%;
  height: 100%;
  margin: 10px;
  border-block: 2px solid;
  border-color: ${colors.deepSlate};
  text-align: center;
`

export const ProductWrapper = styled.div`
  width: 100%;
  align-items: center;
  margin-block: 15px;
  display: flex;
  padding-inline: 10px;
  padding-block: 6px;
`

export const ProductMainImage = styled.img`
  max-height: 70vh;
  min-width: 30vh;
  width: 100%;
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
  color: ${colors.lightBlue};
  padding: 1%;
  border-left: 1px solid ${colors.lightGrey};
`

export const Title = styled.h1`
  text-align: center;
  width: 100%;
  margin: 20px;
  font-size: 36px;
  color: ${colors.white};
`

export const ProductSection = styled.div`
  width: 95%;
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
  border-bottom: 1px solid ${colors.lightGrey};
  color: ${colors.lightGrey};
  outline: none;
  text-align: center;
`

export const FileInput = styled.p`
  background-color: ${colors.white};
  border: solid 1px ${colors.darkGrey};
  border-radius: 3px;
  text-align: center;
  padding: 7px;
  flex: 5;
  &:hover {
    cursor: pointer;
    background-color: ${colors.lightGrey};
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
  background-color: ${colors.blue};
  color: ${colors.white};
  border: 1px solid ${colors.ghostWhite};
  border-radius: 4px;
  cursor: pointer;
  margin: 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.lightBlue};
  }
`

export const CancelButton = styled.button`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-inline: 30px;
  background-color: ${colors.grey};
  color: ${colors.white};
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  cursor: pointer;
  margin: 20px;
  transition: all 0.3s ease;

  &:hover {
    opacity: 60%;
  }
`

export const DeleteButton = styled.button`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-inline: 30px;
  background-color: ${colors.lightRed}90;
  color: ${colors.silverGrey};
  border: 1px solid ${colors.primary}90;
  border-radius: 4px;
  cursor: pointer;
  margin: 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.darkRed};
  }
`

export const ModifyButton = styled.button`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-inline: 30px;
  background-color: ${colors.grey};
  color: ${colors.white};
  border: 1px solid ${colors.primary}90;
  border-radius: 4px;
  cursor: pointer;
  margin: 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.midnightBlue};
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
  border-left: 1px solid ${colors.lightGrey};
`
export const SizeButton = styled.button`
  border: solid 1px ${colors.grey};
  padding-inline: 30px;
  padding-block: 10px;
  margin-left: 10px;
  background-color: ${colors.deepSlate};
  color: ${colors.lightBlue};
  font-weight: bold;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`

export const ModifyRankContainer = styled.div`
  align-items: center;
  padding-top: 40px;
  margin-inline: 20px;
  display: flex;
`
export const ModifyRank = styled.p`
  flex: 2;
  font-size: 22px;
  border-bottom: solid 2px;
  border-color: ${colors.paleGrey}
  color: ${colors.lightGrey};
  opacity: 15%;
  padding-bottom: 5px;
  background-color: ${colors.slate};
`

export const ModifySelectedRank = styled.p`
  flex: 2;
  font-size: 24px;
  border-bottom: solid 2px;
  border-color: ${colors.paleGrey};
  color: ${colors.paleGrey};
  font-weight: bold;
  padding-bottom: 5px;
  background-color: ${colors.slate};
`
export const ModifyTitle = styled.p`
  font-size: 30px;
  color: ${colors.white};
  width: 100%;
  text-align: center;
`
export const Table = styled.table`
  width: 100%;
  border: solid 1px ${colors.lightGrey};
  border-collapse: collapse;
  margin-bottom: 20px;
`
export const TableHead = styled.thead`
  font-weight: bold;
  font-size: 22px;
  border-bottom: solid 1px ${colors.lightGrey};
  color: ${colors.white};
`
export const TableColumn = styled.td`
  flex: 1;
  width: 20%;
  text-align: center;
  padding: 5px;
`
export const TableRow = styled.tbody`
  font-size: 22px;
  color: ${colors.lightGrey};
`

export const DivideLine = styled.hr`
  width: 100%;
  border: 1px dotted ${colors.lightGrey};
  opacity: 30%;
`
