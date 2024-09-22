import { LayoutRouteProps, Outlet } from 'react-router-dom'
import MainHeader from './element/MainHeader'
import { ContainerWrapper } from './Layout.styles.ts'

const MainLayout = ({ children }: LayoutRouteProps) => {
  return (
    <>
      <MainHeader />
      <ContainerWrapper>{children || <Outlet />}</ContainerWrapper>
    </>
  )
}

export default MainLayout
