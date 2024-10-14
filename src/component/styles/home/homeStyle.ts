import styled from 'styled-components'
import { colors } from '@/component/styles/globalStyle'

export const HomeContainer = styled.div`
  background-color: ${colors.white};
  color: ${colors.darkGray};
  min-height: 100vh;
  padding: 20px;
`

export const Title = styled.h2`
  margin: 20px 0;
  text-align: center;
  color: ${colors.darkGray};
`

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px 5%;
  margin: 0;
`

export const GridItem = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.lightGray};
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`

export const OutfitImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
`

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  gap: 10px;
`

export const PaginationButton = styled.button`
  background-color: ${colors.lightGray};
  color: ${colors.darkGray};
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.gray};
  }

  &:disabled {
    background-color: ${colors.lightGray};
    color: ${colors.gray};
    cursor: not-allowed;
  }
`

export const ProductName = styled.h3`
  color: ${colors.darkGray};
  margin: 10px 0;
  font-size: 14px;
`

export const ProductPrice = styled.p`
  color: ${colors.darkGray};
  font-weight: bold;
  font-size: 16px;
`

export const TabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid ${colors.lightGray};
  margin-bottom: 20px;
`

export const Tab = styled.button<{ active: boolean }>`
  background-color: ${(props) =>
    props.active ? colors.lightGray : colors.white};
  color: ${colors.darkGray};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${colors.lightGray};
  }

  ${(props) =>
    props.active &&
    `
    border-bottom: 2px solid ${colors.blue};
  `}
`
