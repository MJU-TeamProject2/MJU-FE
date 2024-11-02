import styled from 'styled-components'
import { colors } from '@/component/styles/globalStyle'

export const AdminLoginContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  padding: 0 12px;
  align-items: center;
  background-color: ${colors.adminBackground};
`

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  font-size: 12px;
  color: ${colors.primary};
`
export const Card = styled.div`
  background: ${colors.background};
  padding-block: 50px;
  padding-inline: 70px;
  border-radius: 8px;
  width: 50%;
  box-sizing: border-box;
`

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: ${colors.white};
  font-size: 30px;
`

export const Input = styled.input`
  width: 100%;
  font-size: 20px;
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
  font-size: 24px;
  background-color: transparent;
  color: ${colors.white};
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
