import styled from 'styled-components'
import { colors } from '@/constants'

export const Card = styled.div`
  background: ${colors.background};
  padding: 39px;
  border-radius: 10px;
  width: 390px;
  box-sizing: border-box;
`

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 39px;
  color: ${colors.white};
  font-size: 21px;
`

export const Input = styled.input`
  width: 100%;
  padding: 13px;
  margin-bottom: 26px;
  border: none;
  border-bottom: 1.3px solid ${colors.primary};
  background-color: transparent;
  color: ${colors.white};
  outline: none;
  font-size: 16px;
  &::placeholder {
    color: ${colors.primary};
  }
`

export const Button = styled.button`
  width: 100%;
  padding: 13px;
  background-color: transparent;
  color: ${colors.white};
  border: 1.3px solid ${colors.primary};
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 13px;
  margin-top: 13px;
  transition: all 0.3s ease;
  font-size: 16px;

  &:hover {
    background-color: ${colors.buttonHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const GenderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 26px;
`

export const GenderButton = styled(Button)`
  flex: 1;
  margin: 0 6.5px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  color: white;
  transition: all 0.3s ease;
  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  &.selected {
    background-color: #007bff;
    color: white;
    border-color: #0056b3;
  }

  &:hover {
    color: black;
    background-color: ${(props) =>
      props.className === 'selected' ? '#0056b3' : '#f8f9fa'};
  }
`

export const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 16px;
  margin-top: -20px;
  margin-bottom: 13px;
`
export const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  display: none;
`
