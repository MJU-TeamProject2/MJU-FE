import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from '@/component/layout/MainLayout'
import Home from '@/page/Home'
import NotFound from '@/page/NotFount'
import User from '@/page/user/User'
import Login from '@/page/user/Login'
import Register from '@/page/user/Register'
import ClothesDetail from '@/page/productDetail/ProductDetail'
import Cart from '@/page/user/Cart'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/products/:id" element={<ClothesDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
