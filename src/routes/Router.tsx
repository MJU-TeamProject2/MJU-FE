import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from '@/component/layout/MainLayout'
import Home from '@/page/Home'
import NotFound from '@/page/NotFount'
import User from '@/page/user/User'
import Login from '@/page/user/Login'
import Register from '@/page/user/Register'
import ProductDetail from '@/page/productDetail/ProductDetail'
import Cart from '@/page/user/Cart'
import ProductSelection from '@/page/user/ProductSelection'
import ModelFiiting from '@/page/productDetail/ModelFitting'

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
          <Route path="/productSelection" element={<ProductSelection />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
