import styled from 'styled-components'
import { colors } from '@/component/styles/globalStyle'

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${colors.white};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: ${colors.black};

  .bold {
    font-weight: bold;
  }
`

export const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 20px;
`

export const Avatar = styled.img<{ isSelected: boolean }>`
  width: 140px;
  height: 110px;
  border-radius: 8px;
  cursor: pointer;
  border: ${({ isSelected }) =>
    isSelected ? `2px solid ${colors.blue}` : `1px solid ${colors.grey}`};
  box-shadow: ${({ isSelected }) =>
    isSelected ? `0 0 5px ${colors.blue}` : 'none'};
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`

export const Button = styled.button<{ color: string }>`
  padding: 10px 60px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${({ color }) => color};
  border: none;
  border-radius: 5px;
  color: ${colors.white};
`

export const UploadBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 110px;
  border: 1px dashed ${colors.grey};
  border-radius: 8px;
  cursor: pointer;

  label {
    cursor: pointer;
    font-size: 14px;
    color: ${colors.grey};
  }

  input {
    display: none;
  }
`
