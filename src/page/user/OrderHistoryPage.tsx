import React, { useState, useEffect } from 'react'
import {
  OrderHistoryContainer,
  OrderHeader,
  ProductContainer,
  ProductImage,
  ProductInfo,
  Divider,
} from '@/component/styles/user/orderHistoryPageStyles'

interface Product {
  id: string
  name: string
  size: string
  price: number
  imageUrl: string
  quantity: number
  orderDate: string
}

const mockData: Product[] = [
  {
    id: '1',
    name: '아카이브 볼드 939 LOGO SWEAT PANTS (BLACK)',
    size: 'S',
    price: 56880,
    imageUrl: 'https://via.placeholder.com/80',
    quantity: 1,
    orderDate: '24.10.10',
  },
  {
    id: '2',
    name: '아카이브 볼드 939 LOGO SWEAT PANTS (BLACK)',
    size: 'S',
    price: 56880,
    imageUrl: 'https://via.placeholder.com/80',
    quantity: 1,
    orderDate: '24.10.13',
  },
]

const OrderHistoryPage: React.FC = () => {
  const [orderHistory, setOrderHistory] = useState<Product[]>([])

  useEffect(() => {
    // Mock data를 설정
    setOrderHistory(mockData)
  }, [])

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
