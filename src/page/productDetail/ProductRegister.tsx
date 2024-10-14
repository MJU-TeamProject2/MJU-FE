import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegisterClothesForm } from '@/component/hook/useRegisterClothesForm'
import {
  ProductRegisterContainer,
  ProductInformationContainer,
  ProductInputContainer,
  ProductContainer,
  ProductImageContainer,
  HiddenContainer,
  Tag,
  Title,
  Input,
  Button,
  ProductImage,
  Option,
  Select,
  ProductDetailImageContainer,
  ProductDetailImage,
} from '@/component/styles/products/registerStyle'
import { registerCloth } from '@/api/clothesApi'

const ProductRegister: React.FC = () => {
  const [category, setCategory] = useState('')
  const [discount, setDiscount] = useState(0)
  const [genderCategory, setGenderCategory] = useState('')
  const [clothName, setClothName] = useState('')
  const [productNumber, setProductNumber] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [size, setSize] = useState('')
  const [mainImage, setMainImage] = useState('resources/image5.png')
  const [detailImage, setDetailImage] = useState('resources/image4.png')
  const [objectFile, setObjectFile] = useState('resources/image3.png')
  const { formData, errors, handleChange, handleNumberChange, isFormValid } =
    useRegisterClothesForm()

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid()) return

    const result = await registerCloth(formData)

    if (result instanceof Error) {
      console.error(result.message)
    } else {
      console.log('등록 성공')
      navigate('/adminHome')
    }
  }

  const handleImage = (type: string) => {
    const fileInput = document.getElementById(type)
    fileInput.click()
    fileInput.addEventListener('change', function () {
      const file = fileInput.files[0]
      if (!file) {
        console.log('File is Not Selected')
        return
      }
      console.log(file)
      const fileReader = new FileReader()
      switch (type) {
        case 'mainImage':
          fileReader.onload = function (e) {
            const base64String = e.target.result as string
            setMainImage(base64String)
          }
          break
        case 'detailImage':
          fileReader.onload = function (e) {
            const base64String = e.target.result as string
            setDetailImage(base64String)
          }
          break
        case 'objectFile':
          fileReader.onload = function (e) {
            const base64String = e.target.result as string
            setObjectFile(base64String)
          }
          break
      }
      fileReader.readAsDataURL(file)
    })
  }

  return (
    <ProductRegisterContainer>
      <Title> 상품 등록 </Title>
      <form onSubmit={handleSubmit}>
        <ProductContainer>
          <ProductImageContainer>
            <ProductImage
              src={mainImage}
              id="mainImagePreview"
              onClick={() => handleImage('mainImage')}
            />
            <ProductDetailImageContainer>
              <ProductDetailImage
                onClick={() => handleImage('detailImage')}
                id="detailImagePreview"
                src={detailImage}
              />
              <ProductDetailImage
                onClick={() => handleImage('detailImage')}
                id="detailImagePreview"
                src={detailImage}
              />
              <ProductDetailImage
                onClick={() => handleImage('objectFile')}
                id="objectFilePreview"
                src={objectFile}
              />
              <ProductDetailImage
                onClick={() => handleImage('objectFile')}
                id="objectFilePreview"
                src={objectFile}
              />
            </ProductDetailImageContainer>
          </ProductImageContainer>
          <ProductInformationContainer>
            <ProductInputContainer>
              <Tag> 상품 이름 </Tag>
              <Input type="text" name="name" />
            </ProductInputContainer>
            <ProductInputContainer>
              <Tag> 카테고리 </Tag>
              <Select
                name="category"
                onChange={(e) => handleChange('category', e.target.value)}
              >
                <Option value="DRESSES"> 드레스 </Option>
                <Option value="OUTERWEAR"> 아우터 </Option>
                <Option value="PANTS"> 바지 </Option>
                <Option value="SHOES"> 신발 </Option>
                <Option value="TOPS"> 상의 </Option>
              </Select>
            </ProductInputContainer>
            <ProductInputContainer>
              <Tag> 성별 분류 </Tag>
              <Select
                name="genderCategory"
                onChange={(e) => handleChange('genderCategory', e.target.value)}
              >
                <Option value="MALE"> 남성용 </Option>
                <Option value="FEMALE"> 여성용 </Option>
                <Option value="UNISEX"> 남녀공용 </Option>
              </Select>
            </ProductInputContainer>
            <ProductInputContainer>
              <Tag> 상품 가격 </Tag>
              <Input type="number" name="price" placeholder="0" onChange={}{(e) => handleNumberChange( 'price', e.target.value ) } />
            </ProductInputContainer>
            <ProductInputContainer>
              <Tag> 상품 번호 </Tag>
              <Input
                type="text"
                name="productNumber"
                placeholder="PRODUCT-001"
                onChange={ (e) => handleChange( 'productNumber', e.target.value )}
              />
            </ProductInputContainer>
            <ProductInputContainer>
              <Tag> 적용 할인율 </Tag>
              <Input type="number" name="discount" placeholder="0"
              onChange={ (e) => handleNumberChange( 'discount', e.target.value) }/>
            </ProductInputContainer>
            <ProductInputContainer>
              <Tag> 사이즈 </Tag>
              <Select name="size" onChange={ (e) => handleChange( 'size', e.target.value )}>
                <Option value="XS"> XS </Option>
                <Option value="S"> S </Option>
                <Option value="M"> M </Option>
                <Option value="L"> L </Option>
                <Option value="XL"> XL </Option>
              </Select>
            </ProductInputContainer>
            <ProductInputContainer>
              <Tag> 현재 재고 </Tag>
              <Input type="number" name="quantity" placeholder="0" onChange={(e) => handleNumberChange( 'quantity', e.target.value )} />
            </ProductInputContainer>
            <Button type="submit">등록</Button>
          </ProductInformationContainer>
        </ProductContainer>
        <HiddenContainer>
          <Input type="file" id="mainImage" name="mainImage" accept="image/*" />
          <Input
            type="file"
            id="detailImage"
            name="detailImage"
            accept="image/*"
          />
          <Input type="file" id="objectFile" name="objectFile" />
        </HiddenContainer>
      </form>
    </ProductRegisterContainer>
  )
}

export default ProductRegister
