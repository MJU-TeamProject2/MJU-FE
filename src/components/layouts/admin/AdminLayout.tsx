import { LayoutRouteProps, Outlet } from 'react-router-dom'
import { ContainerWrapper } from '@/components/layouts/styles/layout.styles'
import AdminHeader from '@/components/layouts/admin/AdminHeader'

const AdminLayout = ({ children }: LayoutRouteProps) => {
  return (
    <>
      <AdminHeader />
      <ContainerWrapper>{children || <Outlet />}</ContainerWrapper>
    </>
  )
}

export default AdminLayout
