import styled from 'styled-components'

const colors = {
  white: '#ffffff',
  black: '#000000',
  blue: '#187cff',
  lightGray: '#f0f0f0',
  darkGray: '#333333',
  red: '#ff4d4f',
  darkRed: '#b22222',
}

export const OrderHistoryContainer = styled.div`
  padding: 20px;
  background-color: ${colors.white};
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  color: ${colors.black};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

export const Header = styled.div`
  margin-bottom: 20px;

  h1 {
    font-size: 28px;
    font-weight: bold;
    color: ${colors.black};
  }
`

export const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid ${colors.lightGray};
  border-radius: 5px;
  background-color: ${colors.lightGray};
`

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 15px;
  border-radius: 5px;
`

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  p {
    margin: 5px 0;

    &:first-child {
      font-weight: bold;
    }

    &:nth-child(3) {
      font-size: 16px;
      font-weight: bold;
      color: ${colors.darkGray};
    }
  }
`

export const DeleteButton = styled.button`
  background-color: ${colors.red};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.darkRed};
  }
`

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${colors.lightGray};
  margin: 15px 0;
`
