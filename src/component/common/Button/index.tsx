import { ButtonProps } from './Button.types'
import styled from 'styled-components'
import iconSpinner from '@/assets/icons/icon-spinner.svg'
import setButtonStyle from '@/component/common/styles/index'

const defaultProps: Pick<Required<ButtonProps>, 'variant' | 'as'> = {
  variant: 'white',
  as: 'button',
}

export const Button = ({ disabled, isLoading, ...props }: ButtonProps) => {
  return (
    <StyledButton disabled={disabled || isLoading} {...props}>
      {isLoading ? <img src={iconSpinner} alt="spinner" /> : props.children}
    </StyledButton>
  )
}

const StyledButton = styled.button<ButtonProps>`
  ${(props) =>
    setButtonStyle({
      ...defaultProps,
      ...props,
    })}
  .loadingSpinner {
    width: 1.5em;
    height: 1.5em;
  }
`
