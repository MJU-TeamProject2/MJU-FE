import styled from 'styled-components'
import { colors } from '@/component/styles/globalStyle'

export const AdminHomeContainer = styled.div`
  background-color: ${colors.adminBackground};
  color: ${colors.white};
  min-height: 100vh;
  padding: 20px;
`

export const Title = styled.h1`
  margin: 20px 0;
  text-align: center;
  color: ${colors.white};
`

export const Subtitle = styled.h3`
  margin: 20px 0;
  text-align: center;
  color: ${colors.white};
`

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px 5%;
  margin: 0;
`

export const GridItem = styled.div`
  background-color: #333;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
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
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #357abd;
  }

  &:disabled {
    background-color: ${colors.buttonHover};
    cursor: not-allowed;
  }
`

export const RegisterButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 0px 100px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #838383;
  }
`

export const ProductName = styled.h3`
  color: ${colors.white};
  margin: 10px 0;
`

export const ProductPrice = styled.p`
  color: #4a90e2;
  font-weight: bold;
`