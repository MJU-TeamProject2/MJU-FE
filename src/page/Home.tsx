import ThreeJsModelViewer from '@/component/product/ThreeJsModelViewer'
import {
  Banner,
  GridContainer,
  GridItem,
  HomeContainer,
  OutfitImage,
  Title,
} from '@/component/home/HomeStyle'

const Home = () => {
  const outfits = [
    // 더미데이터
    {
      id: 1,
      name: '여름 원피스',
      price: '29,000원',
      imageUrl: '/images/outfit1.png',
    },
    {
      id: 2,
      name: '가을 자켓',
      price: '49,000원',
      imageUrl: '/images/outfit2.png',
    },
    {
      id: 3,
      name: '겨울 코트',
      price: '89,000원',
      imageUrl: '/images/outfit3.png',
    },
    {
      id: 4,
      name: '스포츠웨어',
      price: '39,000원',
      imageUrl: '/images/outfit4.png',
    },
  ]

  return (
    <HomeContainer>
      <Title>추천 의상</Title>
      <Banner>
        <ThreeJsModelViewer
          objUrl={'http://localhost:80/artist.obj'}
          mtlUrl={'http://localhost:80/artist.mtl'}
        />
      </Banner>
      <GridContainer>
        {outfits.map((outfit) => (
          <GridItem key={outfit.id}>
            <OutfitImage src={outfit.imageUrl} alt={outfit.name} />
            <h3>{outfit.name}</h3>
            <p>{outfit.price}</p>
          </GridItem>
        ))}
      </GridContainer>
    </HomeContainer>
  )
}

export default Home
