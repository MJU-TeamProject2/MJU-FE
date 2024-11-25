import styled from 'styled-components'
import { colors } from '@/constants'

export const RegisterContainer = styled.div`
  padding: 20px;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  background-color: ${colors.charcoalGrey};
  min-height: 100vh;
`

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: ${colors.white};
  font-size: 24px;
`

export const FormSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const Input = styled.input`
  width: 100%;
  padding: 13px;
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

export const Select = styled.select`
  width: 100%;
  padding: 13px;
  margin-bottom: 10px;
  background-color: transparent;
  border: none;
  border-bottom: 1.3px solid ${colors.primary};
  color: ${colors.white};
  outline: none;
  font-size: 16px;
  option {
    background-color: ${colors.charcoalGrey};
    color: ${colors.white};
  }
`

export const GenderContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
`

export const GenderButton = styled.button`
  flex: 1;
  padding: 10px;
  background-color: transparent;
  border: 1.3px solid ${colors.primary};
  border-radius: 5px;
  color: ${colors.white};
  cursor: pointer;
  transition: all 0.3s ease;

  &.selected {
    background-color: ${colors.primary};
  }

  &:hover {
    background-color: ${colors.darkGrey};
  }
`

export const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  display: none;
`

export const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 14px;
`

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: transparent;
  color: ${colors.white};
  border: 1.3px solid ${colors.primary};
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
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
