import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
