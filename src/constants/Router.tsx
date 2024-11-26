import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from '@/components/layouts/main'
import AdminLayout from '@/components/layouts/admin'
import Home from '@/pages/Home'
import Login from '@/domain/user/Login'
import Register from '@/domain/user/Register'
import User from '@/domain/user/User'
import ProductDetail from '@/domain/productDetail/ProductDetail'
import ModelFitting from '@/domain/product/ModelFitting'
import Cart from '@/domain/order/Cart'
import Order from '@/domain/order/Order'
import OrderHistory from '@/domain/order/OrderHistory'
import ChooseAvatar from '@/domain/user/ChooseAvatar'
import NotFound from '@/pages/NotFound'
import ProductModify from '@/domain/admin/product/ProductModify'
import AdminHome from '@/pages/AdminHome'
import AdminLogin from '@/domain/admin/AdminLogin'
import ClothesRegister from '@/domain/admin/product/ProductRegister'
import AdminOrderHistory from '@/domain/admin/order/AdminOrderHistory'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<User />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/fitting" element={<ModelFitting />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/orderHistory" element={<OrderHistory />} />
          <Route path="/choose-avatar" element={<ChooseAvatar />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/registerCloth" element={<ClothesRegister />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/productsModify/:id" element={<ProductModify />} />
          <Route path="/adminOrderHistory" element={<AdminOrderHistory />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
