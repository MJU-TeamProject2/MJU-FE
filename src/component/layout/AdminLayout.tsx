import { LayoutRouteProps, Outlet } from 'react-router-dom'
import AdminHeader from './element/AdminHeader'
import { ContainerWrapper } from './Layout.styles.ts'

const AdminLayout = ({ children }: LayoutRouteProps) => {
  return (
    <>
      <AdminHeader />
      <ContainerWrapper>{children || <Outlet />}</ContainerWrapper>
    </>
  )
}

export default AdminLayout
