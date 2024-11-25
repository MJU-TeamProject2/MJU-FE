import styled from 'styled-components'
import { colors } from '@/constants'

export const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${colors.ghostWhite};
  border-radius: 8px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid ${colors.borderGrey};
  margin-bottom: 10px;
`

export const ProductImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`

export const ProductDetails = styled.div`
  font-weight: bold;
  color: #333;
  flex: 1;
  text-align: left;
`

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 8px;
`

export const AddressOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
  padding: 15px;
  background-color: ${colors.white};
  border: 1px solid ${colors.borderGrey};
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background-color: ${colors.ghostWhite};
  }
`

export const RadioInput = styled.input`
  margin-right: 10px;
  accent-color: ${colors.skyBlue};
`

export const AddressDetails = styled.div`
  flex: 1;
  font-weight: bold;
  margin-left: 10px;
`

export const DeleteButton = styled.button`
  background-color: ${colors.lightRed};
  color: ${colors.white};
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.red};
  }
`

export const NewEntryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 25px;
`

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
  color: ${colors.darkGrey};
`

export const InputField = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${colors.borderGrey};
  border-radius: 5px;
  margin-bottom: 20px;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${colors.skyBlue};
    outline: none;
  }
`

export const PaymentContainer = styled(NewEntryContainer)``

export const PurchaseButton = styled.button`
  background-color: ${colors.skyBlue};
  color: ${colors.white};
  border: none;
  border-radius: 5px;
  padding: 14px 30px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 25px;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${colors.blue};
  }
`

export const AddButton = styled.button`
  background-color: ${colors.green};
  color: ${colors.white};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;

  &:hover {
    background-color: ${colors.deepGreen};
  }
`
