import styled from 'styled-components'
import { colors } from '@/constants'

export const HomeContainer = styled.div`
  background-color: ${colors.white};
  color: ${colors.darkGrey};
  min-height: 100vh;
  padding: 20px 5%;
`

export const TabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: ${colors.lightGrey};
  padding-top: 10px;
  padding-left: 30px;
`

export const Tab = styled.div<{ active: boolean }>`
  background-color: ${(props) =>
    props.active ? colors.white : colors.lightGrey};
  color: ${colors.darkGrey};
  padding: 8px 16px;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: ${(props) => (props.active ? 800 : 600)};
  box-shadow: ${(props) =>
    props.active ? '0 -2px 4px rgba(0,0,0,0.1)' : 'none'};
  transition: all 0.3s ease;
  position: relative;

  ${(props) =>
    props.active &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 1px;
      background-color: ${colors.white};
    }
  `}
  &:hover {
    background-color: ${colors.white};
  }
`

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px 5%;
`

export const GridItem = styled.div`
  background-color: ${colors.ghostWhite}80;
  border: 1px solid ${colors.lightGrey}90;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  transition: transform 0.2s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: scale(1.05);
  }
`

export const OutfitImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
`

export const ProductInfo = styled.div`
  padding: 10px;
`

export const ProductName = styled.h3`
  color: ${colors.darkGrey};
  margin: 10px 0;
  font-size: 14px;
`

export const ProductPrice = styled.p`
  color: ${colors.darkGrey};
  font-weight: bold;
  font-size: 16px;
`

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  gap: 10px;
`

export const PaginationButton = styled.button`
  background-color: ${colors.lightGrey};
  color: ${colors.darkGrey};
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.grey};
  }

  &:disabled {
    background-color: ${colors.silverGrey};
    color: ${colors.grey};
    cursor: not-allowed;
  }
`
