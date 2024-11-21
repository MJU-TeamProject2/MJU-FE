import styled from 'styled-components'
import { colors } from '@/component/styles/globalStyle'

export const ProductRegisterContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  background: ${colors.adminBackground};
  font-family: 'Pretendard', sans-serif;
`

export const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`

export const ProductImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: ${colors.white};
`

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`

export const BlankImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.white};
  transition: background-color 0.3s ease;

  &:hover {
    background: ${colors.primary};
    cursor: pointer;
  }
`

export const BlankText = styled.p`
  color: ${colors.grey};
  font-size: 1rem;
  font-weight: 500;
`

export const ProductInformationContainer = styled.div`
  background: #8f8f8f;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

export const ProductInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`

const baseInputStyles = `
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: center;
  border: 1px solid ${colors.grey}20;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: 'Pretendard', sans-serif;
  &:focus {
    outline: none;
    border-color: ${colors.grey}50;
    box-shadow: 0 0 0 2px ${colors.grey}20;
  }
`

export const Input = styled.input`
  ${baseInputStyles}
`

export const Select = styled.select`
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='currentColor' viewBox='0 0 12 12'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 4l4 4 4-4'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  ${baseInputStyles}
`

export const Option = styled.option`
  padding: 0.5rem;
`

export const FileInput = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.white};
  cursor: pointer;
  ${baseInputStyles}
  &:hover {
    background: ${colors.primary};
  }
`
export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${colors.white};
  text-align: center;
  margin-bottom: 2rem;
`

export const Tag = styled.label`
  min-width: 120px;
  color: ${colors.grey};
  font-size: 1rem;
  font-weight: 500;
`

export const Button = styled.button`
  width: 100%;
  padding: 1rem;
  margin-top: 2rem;
  background: black;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`

export const HiddenContainer = styled.div`
  display: none;
`

export const ErrorMessage = styled.div`
  color: #ff4d4d;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  margin-left: calc(120px + 1.5rem);
`
