import { LayoutRouteProps, Outlet } from 'react-router-dom'
import { ContainerWrapper } from './Layout.styles.ts'
import MainHeader from '@/component/layout/element/MainHeader.tsx'

const MainLayout = ({ children }: LayoutRouteProps) => {
  return (
    <>
      <MainHeader></MainHeader>
      <ContainerWrapper>{children || <Outlet />}</ContainerWrapper>
    </>
  )
}

export default MainLayout
