import styled from 'styled-components'
import { colors } from '@/component/styles/globalStyle'

export const FittingContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background: ${colors.background};
`

export const ModelSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

export const ModelFrame = styled.div`
  width: 80%;
  height: 80%;
  background-color: #000;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ControlSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #1e1e1e;
`

export const ControlPanel = styled.div`
  width: 80%;
  max-width: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

export const SliderContainer = styled.div`
  margin-bottom: 20px;
`

export const SliderLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
`

export const SliderInput = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 8px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4caf50;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4caf50;
    cursor: pointer;
  }
`
