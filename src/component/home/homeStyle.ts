import styled from 'styled-components'

export const HomeContainer = styled.div`
  text-align: center;
  background-color: rgba(0, 55, 128, 0.1);
`

export const Banner = styled.div`
  width: 80%;
  height: 400px;
  overflow: hidden;
  margin: 20px auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  background-color: #f8f8f8;
`

export const Title = styled.h2`
  margin: 20px 0;
`

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px 10%;
  margin: 0;
`

export const GridItem = styled.div`
  background-color: rgba(255, 249, 214, 0.3);
  border: 1px solid #ddd;
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
