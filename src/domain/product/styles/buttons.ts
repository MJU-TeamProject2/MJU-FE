import { colors } from '@/constants'

export const buttonStyles = {
  padding: '8px 24px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  backgroundColor: colors.white,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
}

export const selectedButtonStyles = {
  ...buttonStyles,
  backgroundColor: '#2196F3',
  color: colors.white,
  border: '1px solid #2196F3',
}
