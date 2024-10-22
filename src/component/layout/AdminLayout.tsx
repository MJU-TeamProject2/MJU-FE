import { LayoutRouteProps, Outlet } from 'react-router-dom'
import { ContainerWrapper } from './layout.styles'
import AdminHeader from '@/component/layout/element/AdminHeader'

const AdminLayout = ({ children }: LayoutRouteProps) => {
  return (
    <>
      <AdminHeader />
      <ContainerWrapper>{children || <Outlet />}</ContainerWrapper>
    </>
  )
}

export default AdminLayout
