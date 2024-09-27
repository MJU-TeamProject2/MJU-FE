import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Card = styled.div`
  background: #1e1e1e;
  padding: 30px;
  border-radius: 8px;
  width: 300px;
  box-sizing: border-box;
`

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: white;
  font-size: 16px;
`

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid #767676;
  background-color: transparent;
  color: white;
  outline: none;
  &::placeholder {
    color: #767676;
  }
`

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #22b2e4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 10px;

  &:hover {
    background-color: #1a9cd9;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  font-size: 12px;
  color: #767676;
`

export const ForgotLink = styled(Link)`
  color: #767676;
  text-decoration: none;
  margin-top: 10px;
  font-size: 10px;
  display: block;
  text-align: right;

  &:hover {
    text-decoration: underline;
  }
`

export const SignupLink = styled(Link)`
  margin-top: 10px;
  color: #22b2e4;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`
export const SignupText = styled.span`
  color: #767676;
  font-size: 10px;
  margin-right: 8px;
  margin-top: 10px;
  text-decoration: none;
`
export const ErrorMessage = styled.div`
  color: red;
  font-size: 10px;
`
