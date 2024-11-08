import styled from 'styled-components'

// 주문 컨테이너 스타일
export const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`

// 제품 정보 스타일
export const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
`

export const ProductImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`

export const ProductDetails = styled.div`
  font-weight: bold;
  color: #333;
  flex: 1;
  text-align: left;
`

// 배송지 선택 스타일
export const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 8px;
`

export const AddressOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
  padding: 15px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`

export const RadioInput = styled.input`
  margin-right: 10px;
  accent-color: #22b2e4;
`

export const AddressDetails = styled.div`
  flex: 1;
  font-weight: bold;
  margin-left: 10px;
`

// 삭제 버튼 스타일
export const DeleteButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff4d4d;
  }
`

// 새 주소 및 결제수단 추가 섹션
export const NewEntryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 25px;
`

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
  color: #666;
`

export const InputField = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #22b2e4;
    outline: none;
  }
`

// 결제수단 추가 섹션
export const PaymentContainer = styled(NewEntryContainer)``

// 구매 버튼 스타일
export const PurchaseButton = styled.button`
  background-color: #22b2e4;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 14px 30px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 25px;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #1a93c5;
  }
`

// 추가하기 버튼 스타일
export const AddButton = styled.button`
  background-color: #4caf50; // 초록색으로 변경
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;

  &:hover {
    background-color: #45a049; // 호버 시 더 진한 초록색
  }
`
