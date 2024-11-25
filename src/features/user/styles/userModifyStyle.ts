import styled from 'styled-components'
import { colors } from '@/constants'

export const UserModifyContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: flex-start;
  background-color: ${colors.white};
  padding: 20px 20px 80px;
  position: relative;
  overflow-y: auto;
`

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 40px;
  position: sticky;
  top: 50px;
`

export const Card = styled.div`
  background: ${colors.white};
  padding: 30px;
  border-radius: 8px;
  width: 400px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

export const FooterButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  gap: 10px;
  background-color: ${colors.white};
  padding: 20px 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`

export const ProfileImage = styled.div`
  width: 300px;
  height: 400px;
  background-color: ${colors.grey};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.white};
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  overflow: hidden;
`

export const ActionButton = styled.button`
  width: 120px;
  padding: 10px;
  background-color: ${colors.black};
  color: ${colors.white};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.buttonHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const Title = styled.h2`
  text-align: center;
  color: ${colors.black};
  font-size: 32px;
  margin-bottom: 20px;
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;
`

export const Tag = styled.p`
  color: ${colors.black};
  font-weight: bold;
  margin-bottom: 5px;
`

interface InputProps {
  $isEditing?: boolean
}

export const Input = styled.input<InputProps>`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid ${({ $isEditing }) => ($isEditing ? 'red' : '#ccc')};
  border-radius: 5px;
  background-color: ${colors.white};
  color: ${colors.black};
  outline: none;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: ${colors.grey};
  }
`

export const SaveButton = styled.button`
  width: 100px;
  padding: 10px;
  background-color: ${colors.buttonHover};
  color: ${colors.white};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`

export const FooterButton = styled.button`
  width: 100px;
  padding: 10px;
  background-color: ${colors.grey};
  color: ${colors.white};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.buttonHover};
  }
`
