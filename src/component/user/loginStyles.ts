import styled from 'styled-components'

export const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  box-sizing: border-box;
`

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px; /* 버튼 간의 간격 */

  &:hover {
    background-color: #0056b3;
  }
`

export const GenderContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
`

export const GenderLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
  margin: 2px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e9e9e9;
  }

  input {
    margin-right: 10px; /* 라디오 버튼과 레이블 간의 간격 */
  }
`