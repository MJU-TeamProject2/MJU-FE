import ThreeJsModelViewer from '@/component/product/ThreeJsModelViewer'

const Home = () => {
  return (
    <div>
      <p>HOME</p>
      <ThreeJsModelViewer
        objUrl={'http://localhost:80/artist.obj'}
        mtlUrl={'http://localhost:80/artist.mtl'}
      />
    </div>
  )
}

export default Home
