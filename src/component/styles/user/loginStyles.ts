import styled from 'styled-components'
import { colors } from '@/component/styles/globalStyle'

export const Card = styled.div`
  background: ${colors.background};
  padding: 30px;
  border-radius: 8px;
  width: 300px;
  box-sizing: border-box;
`

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: ${colors.text};
  font-size: 16px;
`

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid ${colors.primary};
  background-color: transparent;
  color: ${colors.text};
  outline: none;
  &::placeholder {
    color: ${colors.primary};
  }
`

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: transparent;
  color: ${colors.text};
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 10px;
  transition: all 0.3s ease;

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
  margin-bottom: 20px;
`

export const GenderButton = styled(Button)`
  flex: 1;
  margin: 0 5px;
  padding: 8px;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  &.selected {
    background-color: ${colors.primary};
    color: ${colors.background};
  }
`

export const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  display: none;
`

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  font-size: 12px;
  color: ${colors.primary};
`

export const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 12px;
  margin-top: -15px;
  margin-bottom: 10px;
`
