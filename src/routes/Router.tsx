import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from '@/component/layout/MainLayout'
import Home from '@/page/Home'
import AdminHome from '@/page/AdminHome'
import NotFound from '@/page/NotFount'
import User from '@/page/user/User'
import Login from '@/page/user/Login'
import AdminLogin from '@/page/user/AdminLogin'
import Register from '@/page/user/Register'
import ClothesDetail from '@/page/productDetail/ProductDetail'
import Cart from '@/page/user/Cart'
import ProductSelection from '@/page/user/ProductSelection'
import ClothesRegister from '@/page/productDetail/ProductRegister'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/" element={<Home />} />
          <Route path="adminHome" element={<AdminHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/user" element={<User />} />
          <Route path="/users" element={<User />} />
          <Route path="/products/:id" element={<ClothesDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/productSelection" element={<ProductSelection />} />
          <Route path="/registerCloth" element={ <ClothesRegister /> } />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
