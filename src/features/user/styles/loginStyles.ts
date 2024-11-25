import styled from 'styled-components'
import { colors } from '@/constants'

export const LoginContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    padding: 0 12px;
    align-items: center;
    height: 100%;
    min-height: 100vh;
    background-color: #1e1e1e;'
`

export const Card = styled.div`
  background: ${colors.charcoalGrey};
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
    background-color: ${colors.darkGrey};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 16px;
  margin-top: -20px;
  margin-bottom: 13px;
`
