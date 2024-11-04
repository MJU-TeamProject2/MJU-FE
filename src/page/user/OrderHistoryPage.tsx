import React, { useState, useEffect } from 'react'
import {
  OrderHistoryContainer,
  OrderHeader,
  ProductContainer,
  ProductImage,
  ProductInfo,
  Divider,
} from '@/component/styles/user/orderHistoryPageStyles'
import axiosInstance from '@/api/axiosInstance'

// Product 타입 정의
interface Product {
  id: string
  name: string
  size: string
  price: number
  imageUrl: string
  quantity: number
  orderDate: string
}

const OrderHistoryPage: React.FC = () => {
  const [orderHistory, setOrderHistory] = useState<Product[]>([])

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/orders')
        console.log('API 전체 응답:', response) // 전체 응답 확인
        console.log('응답 데이터 success:', response.data.success) // success 값 확인

        if (response.data.success && Array.isArray(response.data.data)) {
          const orders = response.data.data.map((item: any) => ({
            id: item.orderId.toString(),
            name: item.name,
            size: item.size,
            price: item.price,
            imageUrl: item.imageUrl,
            quantity: item.quantity,
            orderDate: new Date(item.createdAt).toLocaleDateString(),
          }))
          setOrderHistory(orders)
        } else {
          console.error('응답 형식이 예상과 다릅니다.')
        }
      } catch (error) {
        console.error('API 호출 중 오류가 발생했습니다:', error)
      }
    }

    fetchOrderHistory()
  }, [])

  // 데이터가 없을 때 기본 UI 출력
  if (orderHistory.length === 0) {
    return <div>주문 내역이 없습니다.</div>
  }

  return (
    <OrderHistoryContainer>
      {orderHistory.map((order, index) => (
        <div key={index}>
          <OrderHeader>
            <h2>{order.orderDate}</h2>
            <p>구매확정</p>
          </OrderHeader>
          <ProductContainer>
            <ProductImage src={order.imageUrl} alt="Product Image" />
            <ProductInfo>
              <p>{order.name}</p>
              <p>
                {order.size} / {order.quantity}개
              </p>
              <p style={{ fontWeight: 'bold', color: '#000' }}>
                {order.price.toLocaleString()}원
              </p>
            </ProductInfo>
          </ProductContainer>
          <Divider />
        </div>
      ))}
    </OrderHistoryContainer>
  )
}

export default OrderHistoryPage
