import React, { useEffect, useState } from 'react'
import axiosInstance from '@/api/axiosInstance'
import {
  OrderHistoryContainer,
  ProductContainer,
  ProductImage,
  ProductInfo,
  Divider,
  DeleteButton,
  Header,
} from '@/component/styles/order/orderHistoryPageStyles' // 스타일 컴포넌트 import

// 주문 인터페이스 정의
interface Order {
  orderId: number
  clothesId: string
  imageUrl: string
  name: string
  quantity: number
  price: number
  size: string
  orderStatus: string
  createdAt: string
}

const OrderHistoryPage: React.FC = () => {
  const [orderHistory, setOrderHistory] = useState<Order[]>([])

  // 주문 내역 가져오기 함수
  const fetchOrderHistory = async () => {
    try {
      const { data } = await axiosInstance.get('/api/v1/orders')
      setOrderHistory(data)
      console.log('주문 내역을 성공적으로 가져왔습니다.', data)
    } catch (error) {
      console.error('주문 내역 불러오기 중 오류가 발생했습니다:', error)
    }
  }

  // 주문 삭제 함수
  const handleDeleteOrder = async (orderId: number) => {
    try {
      await axiosInstance.delete(`/api/v1/orders/${orderId}`)
      console.log(`주문 ${orderId}가 삭제되었습니다.`)
      fetchOrderHistory()
    } catch (error) {
      console.error('주문 삭제 중 오류가 발생했습니다.', error)
    }
  }

  useEffect(() => {
    fetchOrderHistory()
  }, [])

  return (
    <OrderHistoryContainer>
      <Header>
        <h1>주문 내역</h1>
      </Header>
      {orderHistory.length > 0 ? (
        orderHistory.map((order) => (
          <ProductContainer key={order.orderId}>
            <ProductImage src={order.imageUrl} alt={order.name} />
            <ProductInfo>
              <p>상품명: {order.name}</p>
              <p>수량: {order.quantity}</p>
              <p>가격: {order.price}원</p>
              <p>사이즈: {order.size}</p>
              <p>주문 상태: {order.orderStatus}</p>
              <p>주문 날짜: {new Date(order.createdAt).toLocaleString()}</p>
            </ProductInfo>
            <DeleteButton onClick={() => handleDeleteOrder(order.orderId)}>
              삭제
            </DeleteButton>
            <Divider />
          </ProductContainer>
        ))
      ) : (
        <p>주문 내역이 없습니다.</p>
      )}
    </OrderHistoryContainer>
  )
}

export default OrderHistoryPage
