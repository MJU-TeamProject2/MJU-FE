import { LayoutRouteProps, Outlet } from 'react-router-dom'
import { ContainerWrapper } from './layout.styles'
import MainHeader from '@/component/layout/element/MainHeader'

const MainLayout = ({ children }: LayoutRouteProps) => {
  return (
    <>
      <MainHeader></MainHeader>
      <ContainerWrapper>{children || <Outlet />}</ContainerWrapper>
    </>
  )
}

export default MainLayout
