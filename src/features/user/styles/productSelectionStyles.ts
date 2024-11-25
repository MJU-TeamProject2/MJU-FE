import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1114px;
  height: 719px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
`

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`

export const ProductTabs = styled.div`
  display: flex;
  width: 100%;
  background-color: #d9d9d9;
  border-radius: 10px 10px 0 0;
`

export const ProductCategory = styled.button<{ isSelected: boolean }>`
  flex: 1;
  font-size: 18px;
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};
  padding: 10px;
  background-color: ${({ isSelected }) => (isSelected ? '#fff' : '#d9d9d9')};
  color: ${({ isSelected }) => (isSelected ? '#000' : '#767676')};
  border: none;
  border-top-left-radius: ${({ isSelected }) => (isSelected ? '10px' : '0')};
  border-top-right-radius: ${({ isSelected }) => (isSelected ? '10px' : '0')};
  cursor: pointer;
  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? '#fff' : '#c0c0c0')};
  }
`

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 20px;
  justify-items: center;
`

export const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-align: center;
`

export const ProductImage = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 5px;
`

export const ProductButtonSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`

export const CancelButton = styled.button`
  padding: 10px 100px;
  background-color: #d9d9d9;
  color: #000;
  border: none;
  border-radius: 10px 0 0 10px;
  cursor: pointer;
`

export const NextButton = styled.button`
  padding: 10px 100px;
  background-color: #22b2e4;
  color: #000;
  border: none;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
`
