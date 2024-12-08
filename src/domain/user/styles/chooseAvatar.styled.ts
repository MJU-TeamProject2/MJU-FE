import styled from 'styled-components'
import { colors } from '@/constants'

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 1200px;
  height: 90vh;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${colors.white};
`

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 40px;
  color: ${colors.black};
  text-align: center;

  .bold {
    font-weight: bold;
  }
`

export const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-bottom: 10px;
  width: 100%;
  justify-items: center;
`

export const AvatarItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
  position: relative;
`

export const Avatar = styled.img<{ isSelected: boolean }>`
  width: 100%;
  height: auto;
  max-width: 300px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: ${({ isSelected }) =>
    isSelected
      ? `2px solid ${colors.skyBlue}`
      : `1px solid ${colors.silverGrey}`};
  box-shadow: ${({ isSelected }) =>
    isSelected ? `0 0 5px ${colors.skyBlue}` : 'none'};

  &:hover {
    transform: translateY(-5px);
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  width: 100%;
  max-width: 400px;
`

export const Button = styled.button<{ color: string }>`
  padding: 12px 60px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${({ color }) => color};
  border: none;
  border-radius: 5px;
  color: ${colors.white};
  flex: 1;
  max-width: 200px;

  &:hover {
    opacity: 0.9;
  }
`

export const AvatarName = styled.span`
  color: ${colors.black};
  padding: 8px 16px;
  border-radius: 20px;

  ${AvatarItem}:hover & {
    background-color: #e9ecef;
  }
`
