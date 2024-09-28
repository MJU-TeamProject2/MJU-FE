import { useParams } from 'react-router-dom'
import { Banner } from '@/component/styles/home/homeStyle'
import ThreeJsModelViewer from '@/component/product/ThreeJsModelViewer'

const ProductDetail = () => {
  const { id }: any = useParams()

  const outfits = [
    {
      id: 1,
      name: '여름 원피스',
      price: '29,000원',
      description: '여름에 적합한 원피스입니다.',
    },
  ]

  const outfit = outfits.find((item) => item.id === parseInt(id))

  if (!outfit) {
    return <div>상품을 찾을 수 없습니다.</div>
  }

  return (
    <div>
      <h1>{outfit.name}</h1>
      <Banner>
        <ThreeJsModelViewer
          objUrl={'http://localhost:80/artist.obj'}
          mtlUrl={'http://localhost:80/artist.mtl'}
        />
      </Banner>
      <p>가격: {outfit.price}</p>
      <p>{outfit.description}</p>
    </div>
  )
}

export default ProductDetail
