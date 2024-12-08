import styled from 'styled-components'
import { colors } from '@/constants'

export const AdminOrderHistoryContainer = styled.div`
  background-color: ${colors.darkGrey};
  padding: 20px;
  height: 100vh;
`

export const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: ${colors.ghostWhite};
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${colors.white};
`

export const Th = styled.th`
  border: 1px solid ${colors.borderGrey};
  padding: 10px;
  background-color: ${colors.ghostWhite};
  text-align: left;
`

export const Td = styled.td`
  border: 1px solid ${colors.borderGrey};
  padding: 10px;
  vertical-align: middle;
`

export const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`

export const CompleteButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: ${colors.green};
  color: ${colors.white};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.deepGreen};
  }
`
