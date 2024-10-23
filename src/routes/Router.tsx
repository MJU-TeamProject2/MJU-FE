import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from '@/component/layout/MainLayout'
import Home from '@/page/Home'
import AdminHome from '@/page/AdminHome'
import NotFound from '@/page/NotFound.tsx'
import User from '@/page/user/User'
import Login from '@/page/user/Login'
import AdminLogin from '@/page/user/AdminLogin'
import Register from '@/page/user/Register'
import ProductDetail from '@/page/productDetail/ProductDetail'
import ProductModify from '@/page/productDetail/ProductModify'
import Cart from '@/page/user/Cart'
import ClothesRegister from '@/page/productDetail/ProductRegister'
import ModelFiiting from '@/page/productDetail/ModelFitting'
import OrderHistoryPage from '@/page/user/OrderHistoryPage'
import ChooseAvatar from '@/page/user/ChooseAvatar'
import AdminLayout from '@/component/layout/AdminLayout'

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
          <Route path="/fitting" element={<ModelFiiting />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orderHistory" element={<OrderHistoryPage />} />
          <Route path="/chooseAvatar" element={<ChooseAvatar />} />
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
