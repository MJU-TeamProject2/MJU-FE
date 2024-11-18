import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import MainLayout from '@/component/layout/MainLayout'
import Home from '@/page/Home'
import AdminHome from '@/page/AdminHome'
import NotFound from '@/page/NotFound'
import User from '@/page/user/User'
import Login from '@/page/user/Login'
import AdminLogin from '@/page/user/AdminLogin'
import Register from '@/page/user/Register'
import ProductDetail from '@/page/productDetail/ProductDetail'
import ProductModify from '@/page/productDetail/ProductModify'
import Cart from '@/page/user/Cart'
import ClothesRegister from '@/page/productDetail/ProductRegister'
import ModelFitting from '@/page/productDetail/ModelFitting'
import OrderHistoryPage from '@/page/order/OrderHistoryPage'
import ChooseAvatar from '@/page/user/ChooseAvatar'
import AdminLayout from '@/component/layout/AdminLayout'
import Order from '@/page/order/Order'

// Router 컴포넌트 정의
const Router = () => {
  // 아바타 상태 관리
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)

  // 아바타 선택 핸들러
  const handleSelectAvatar = (avatar: string | null) => {
    setSelectedAvatar(avatar)
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* MainLayout을 사용하는 경로 */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="users" element={<User selectedAvatar={selectedAvatar} />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="fitting" element={<ModelFitting />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
          <Route path="orderHistory" element={<OrderHistoryPage />} />
          <Route
            path="chooseAvatar"
            element={<ChooseAvatar onSelectAvatar={handleSelectAvatar} />}
          />
        </Route>

        {/* AdminLayout을 사용하는 경로 */}
        <Route path="/" element={<AdminLayout />}>
          <Route path="registerCloth" element={<ClothesRegister />} />
          <Route path="adminLogin" element={<AdminLogin />} />
          <Route path="adminHome" element={<AdminHome />} />
          <Route path="productsModify/:id" element={<ProductModify />} />
        </Route>

        {/* 404 페이지 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
