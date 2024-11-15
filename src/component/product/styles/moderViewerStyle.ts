import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`

export const PreviewContainer = styled.div`
  width: 50%;
  height: 100%;
  background-color: #333;
  position: relative;
`

export const ErrorOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
`

export const ErrorCard = styled.div`
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  color: #ef4444;
`

interface FillEffectProps {
  progress: number
}

export const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
`

export const LoadingCard = styled.div`
  width: 16rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`

export const LoadingContainer = styled.div`
  position: relative;
  height: 7rem;
  margin-bottom: 1rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  overflow: hidden;
`

export const FillEffect = styled.div<FillEffectProps>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${({ progress }) => progress}%;
  background-color: #3b82f6;
  transition: height 1s ease-out;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(59, 130, 246, 0.3),
      transparent
    );
  }

  &::after {
    content: '';
    position: absolute;
    top: -0.25rem;
    left: 0;
    right: 0;
    height: 0.5rem;
    background-color: rgba(255, 255, 255, 0.2);
  }
`

export const ProgressText = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #374151;
`

export const LoadingText = styled.div`
  text-align: center;
  color: #4b5563;
  font-weight: 500;
`
