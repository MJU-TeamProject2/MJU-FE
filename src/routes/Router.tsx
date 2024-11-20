import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '@/component/layout/MainLayout'
import AdminLayout from '@/component/layout/AdminLayout'
import Home from '@/page/Home'
import AdminHome from '@/page/AdminHome'
import AdminOrderHistoryPage from '@/page/order/AdminOrderHistoryPage'
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
import Order from '@/page/order/Order'

const Router: React.FC = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)

  const handleSelectAvatar = (avatar: string | null) => {
    setSelectedAvatar(avatar)
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* MainLayout routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="users"
            element={<User selectedAvatar={selectedAvatar} />}
          />
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

        {/* AdminLayout routes */}
        <Route path="/" element={<AdminLayout />}>
          <Route path="adminHome" element={<AdminHome />} />
          <Route path="adminOrderHistory" element={<AdminOrderHistoryPage />} />
          <Route path="registerCloth" element={<ClothesRegister />} />
          <Route path="adminLogin" element={<AdminLogin />} />
          <Route path="productsModify/:id" element={<ProductModify />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
