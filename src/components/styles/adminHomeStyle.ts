import styled from 'styled-components'
import { colors } from '@/constants'

export const AdminHomeContainer = styled.div`
  background-color: ${colors.darkGrey};
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

export const OrderHistoryButton = styled.button`
  background-color: ${colors.skyBlue};
  color: ${colors.white};
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin: 20px auto;
  display: block;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #357abd;
  }
`
