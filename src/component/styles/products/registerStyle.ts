import styled from 'styled-components'
import { colors } from '@/component/styles/globalStyle'

export const ProductRegisterContainer = styled.div`
    width: 100%;
    height: 100vh;
    background: ${ colors.adminBackground };
`
export const ProductInformationContainer = styled.div`
    width: 100%;
    flex: 7;
`
export const ProductContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    padding: 20px 250px;
`
export const ProductInputContainer = styled.div`
    display: flex;
    margin: 30px 0;
`
export const ProductImageContainer = styled.div`
    flex: 4;
    width: 100%;
    border: solid 1px gray;
    height: 70vh;
    align-items: center;
    display: flex;
`

export const Title = styled.h1`
    width: 100%;
    margin: 20px 0;
    text-align: center;
    color: ${ colors.white }
`

export const Tag = styled.p`
    width: 100%;
    flex: 4;
    color: white;
    text-align: center;
    padding: 10px;
    font-size: 20px;
`
export const ProductImage = styled.img`
    display: flex;
    flex: 4;
    width: 100%;
    height: auto;
    max-height: 70vh;
    max-width: 100%;
`

export const Input = styled.input`
    flex: 6;
`
export const Button = styled.button`
    width: 100%;
    padding: 10px;
    border: 1px solid ${colors.primary};
    background-color: white;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    margin-left: 50px;
    margin-right: 50px;
    transition: all 0.3s ease;
`

export const Select = styled.select`
    flex: 6;
    font-weight: bold;
`

export const Option = styled.option`
    font-size: 14px;
`