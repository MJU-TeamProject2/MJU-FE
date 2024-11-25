import styled from 'styled-components'

export const AdminOrderHistoryContainer = styled.div`
  padding: 20px;
`

export const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const Th = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f4f4f4;
  text-align: left;
`

export const Td = styled.td`
  border: 1px solid #ddd;
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
  background-color: #4caf50;
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`

