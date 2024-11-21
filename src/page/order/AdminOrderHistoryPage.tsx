import React, { useState, useEffect } from 'react'
import {
  AdminOrderHistoryContainer,
  Title,
  Table,
  Th,
  Td,
  ActionButtonsContainer,
  CompleteButton,
} from '@/component/styles/order/adminOrderHistoryPageStyles' // 스타일 임포트

import { getAdminOrders, updateAdminOrder } from '@/api/orderApi'

interface Order {
  orderId: number
  name: string
  quantity: number
  price: number
  size: string
  orderStatus: string
  createdAt: string
}

const AdminOrderHistoryPage: React.FC = () => {
  const [adminOrders, setAdminOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAdminOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedAdminOrders = await getAdminOrders()
      setAdminOrders(fetchedAdminOrders)
    } catch (err) {
      console.error('관리자 주문 목록을 가져오는 중 오류 발생:', err)
      setError('관리자 주문 목록을 가져오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdminOrders()
  }, [])

  const handleUpdateAdminOrder = async (orderId: number) => {
    try {
      await updateAdminOrder(orderId, { orderStatus: 'SHIPPING' })
      alert('주문 상태가 "SHIPPING"으로 성공적으로 업데이트되었습니다.')
      setAdminOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId
            ? { ...order, orderStatus: 'SHIPPING' }
            : order
        )
      )
    } catch (error) {
      console.error('관리자 주문 상태 업데이트 중 오류:', error)
      setError('주문 상태 업데이트에 실패했습니다.')
    }
  }

  if (loading) {
    return <p>로딩 중...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <AdminOrderHistoryContainer>
      <Title>관리자 주문 내역</Title>
      {adminOrders.length === 0 ? (
        <p>관리자 주문이 없습니다.</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>주문 ID</Th>
              <Th>이름</Th>
              <Th>수량</Th>
              <Th>가격</Th>
              <Th>사이즈</Th>
              <Th>상태</Th>
              <Th>생성 날짜</Th>
              <Th>작업</Th>
            </tr>
          </thead>
          <tbody>
            {adminOrders.map((order) => (
              <tr key={order.orderId}>
                <Td>{order.orderId}</Td>
                <Td>{order.name}</Td>
                <Td>{order.quantity}</Td>
                <Td>{order.price}</Td>
                <Td>{order.size}</Td>
                <Td>{order.orderStatus}</Td>
                <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
                <Td>
                  <ActionButtonsContainer>
                    {order.orderStatus === 'PREPARING' && (
                      <CompleteButton
                        onClick={() => handleUpdateAdminOrder(order.orderId)}
                      >
                        완료
                      </CompleteButton>
                    )}
                  </ActionButtonsContainer>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </AdminOrderHistoryContainer>
  )
}

export default AdminOrderHistoryPage
