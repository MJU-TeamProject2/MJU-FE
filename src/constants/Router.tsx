import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from '@/components/layouts/main'
import AdminLayout from '@/components/layouts/admin'
import Home from '@/pages/Home'
import Login from '@/features/user/Login'
import Register from '@/features/user/Register'
import User from '@/features/user/User'
import ProductDetail from '@/features/productDetail/ProductDetail'
import ModelFitting from '@/features/product/ModelFitting'
import Cart from '@/features/order/Cart'
import Order from '@/features/order/Order'
import OrderHistoryPage from '@/features/order/OrderHistoryPage'
import ChooseAvatar from '@/features/user/ChooseAvatar'
import NotFound from '@/pages/NotFound'
import ProductModify from '@/features/admin/product/ProductModify'
import AdminHome from '@/pages/AdminHome'
import AdminLogin from '@/features/admin/AdminLogin'
import ClothesRegister from '@/features/admin/product/ProductRegister'
import AdminOrderHistoryPage from '@/features/admin/order/AdminOrderHistoryPage'

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
          <Route path="/orderHistory" element={<OrderHistoryPage />} />
          <Route path="/choose-avatar" element={<ChooseAvatar />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/registerCloth" element={<ClothesRegister />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/productsModify/:id" element={<ProductModify />} />
          <Route
            path="/adminOrderHistory"
            element={<AdminOrderHistoryPage />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
