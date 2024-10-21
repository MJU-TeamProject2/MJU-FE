import styled from 'styled-components'
import { colors } from '@/component/styles/globalStyle'

export const OrderHistoryContainer = styled.div`
  padding: 20px;
  background-color: ${colors.white}; // 글로벌 스타일의 흰색 사용
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  color: ${colors.black};
`

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 5px;

  h2 {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
  }

  p {
    font-size: 14px;
    color: ${colors.gray}; // 글로벌 스타일의 회색 사용
  }
`

export const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 15px;
`

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin: 5px 0;

    &:first-child {
      font-weight: bold;
    }

    &:nth-child(3) {
      font-size: 16px;
      font-weight: bold;
      color: ${colors.darkGray};
    }
  }
`

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${colors.lightGray};
  margin: 15px 0;
`
