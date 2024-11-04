import styled from 'styled-components'
import { colors } from '@/component/styles/globalStyle'

export const UserModifyContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  padding: 20px;
  position: relative; /* FooterButtonGroup을 하단에 고정하기 위해 추가 */
`

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 40px;
`

export const ProfileImage = styled.div`
  width: 180px; // 아바타 크기 조정
  height: 180px; // 아바타 크기 조정
  border-radius: 50%;
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

export const Card = styled.div`
  background: ${colors.white};
  padding: 30px;
  border-radius: 8px;
  width: 400px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
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
  isEditing: boolean
}

export const Input = styled.input<InputProps>`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid ${({ isEditing }) => (isEditing ? 'red' : '#ccc')};
  border-radius: 5px;
  background-color: ${colors.white};
  color: ${colors.black};
  outline: none;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: ${colors.grey};
  }
`

interface SaveButtonProps {
  isSaved: boolean
}

export const SaveButton = styled.button<SaveButtonProps>`
  width: 100px;
  padding: 10px;
  background-color: ${({ isSaved }) =>
    isSaved ? colors.buttonHover : '#007bff'};
  color: ${colors.white};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`

export const FooterButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: absolute;
  bottom: 20px; /* 화면 하단에 고정 */
  gap: 10px;
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
