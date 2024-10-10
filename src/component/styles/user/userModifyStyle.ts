import styled from 'styled-components'
import { colors } from '@/component/styles/globalStyle'

export const Tag = styled.p`
  width: 100%;
  flex: 3;
  color: white;
  text-align: center;
  font-weight: bold;
  padding: 10px;
`

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 50px;
  color: ${colors.white};
  font-size: 32px;
`

export const Input = styled.input`
  width: 100%;
  flex: 7;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid ${colors.primary};
  background-color: transparent;
  color: ${colors.white};
  outline: none;
  &::placeholder {
    color: ${colors.primary};
  }
`

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.buttonHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const GenderButton = styled.button`
  flex: 5;
  width: 100%;
  padding: 10px;
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.buttonHover};
  }

  &:disabled {
    cursor: default;
  }
`

export const InputGroup = styled.div`
  display: flex;
`

export const ButtonGroup = styled.div`
  display: flex;
`

export const GenderButtonGroup = styled.div`
  display: flex;
  flex: 7;
`

export const Card = styled.div`
  background: ${colors.background};
  padding: 30px;
  border-radius: 8px;
  width: 25%;
  box-sizing: border-box;
`

export const ErrorDiv = styled.div`
    width: 100%;
  text-align: center;
`