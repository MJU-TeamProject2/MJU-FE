import { LayoutRouteProps, Outlet } from 'react-router-dom'
import { ContainerWrapper } from '@/components/layouts/styles/layout.styles'
import MainHeader from '@/components/layouts/main/MainHeader'

const MainLayout = ({ children }: LayoutRouteProps) => {
  return (
    <>
      <MainHeader />
      <ContainerWrapper>{children || <Outlet />}</ContainerWrapper>
    </>
  )
}

export default MainLayout
