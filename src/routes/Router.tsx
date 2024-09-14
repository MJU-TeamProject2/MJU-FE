import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from '@/component/layout/MainLayout.tsx'
import Home from '@/page/Home.tsx'
import NotFound from '@/page/NotFount.tsx'
import User from '@/page/user/User.tsx'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<User />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
