import styled from 'styled-components'
import { colors } from '@/component/styles/globalStyle'

export const LoginContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    padding: 0 12px;
    align-items: center;
    height: 100vh;
    background-color: #1e1e1e;'
    gap: 20px;
    * {
        width: 100%;
    }
`
export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  font-size: 12px;
  color: ${colors.primary};
`
