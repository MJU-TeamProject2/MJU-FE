import styled from 'styled-components'
import { colors } from '@/constants'

export const ControlSection = styled.div`
  width: 50%;
  background-color: ${colors.darkGrey};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

export const Container = styled.div`
  padding: 40px;
  background-color: ${colors.white};
  width: 100%;
  max-width: 600px;
  border-radius: 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
`

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 40px;
`

export const Section = styled.div<{ $noMargin?: boolean }>`
  margin-bottom: ${({ $noMargin }) => ($noMargin ? '0' : '30px')};
`

export const SectionTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 15px;
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`
