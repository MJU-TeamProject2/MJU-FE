import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from '@/component/layout/MainLayout'
import Home from '@/page/Home'
import AdminHome from '@/page/AdminHome'
import NotFound from '@/page/NotFount'
import User from '@/page/user/User'
import Login from '@/page/user/Login'
import AdminLogin from '@/page/user/AdminLogin'
import Register from '@/page/user/Register'
import ProductDetail from '@/page/productDetail/ProductDetail'
import Cart from '@/page/user/Cart'
import ClothesRegister from '@/page/productDetail/ProductRegister'
import ModelFiiting from '@/page/productDetail/ModelFitting'
import OrderHistoryPage from '@/page/user/OrderHistoryPage'
import ChooseAvatar from '@/page/user/ChooseAvatar'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/" element={<Home />} />
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/user" element={<User />} />
          <Route path="/users" element={<User />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/fitting" element={<ModelFiiting />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/registerCloth" element={<ClothesRegister />} />
          <Route path="/orderHistory" element={<OrderHistoryPage />} />
          <Route path="/chooseAvatar" element={<ChooseAvatar />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
