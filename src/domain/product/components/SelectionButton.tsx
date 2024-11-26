import React from 'react'
import { buttonStyles, selectedButtonStyles } from '../styles/buttons'

interface SelectionButtonProps {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}

export const SelectionButton: React.FC<SelectionButtonProps> = ({
  selected,
  onClick,
  children,
}) => (
  <button
    onClick={onClick}
    style={selected ? selectedButtonStyles : buttonStyles}
  >
    {children}
  </button>
)
