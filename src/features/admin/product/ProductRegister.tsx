import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  FileInput,
  Button,
  ProductImage,
  Option,
  Select,
  BlankImage,
  BlankText,
  ErrorMessage,
} from '@/features/admin/product/styles/registerStyle'
import { registerCloth } from '@/services/clothesApi'
import { useRegisterClothesForm } from '@/features/admin/product/hooks/useRegisterClothesForm'

const ProductRegister: React.FC = () => {
  const [mainImage, setMainImage] = useState('null')
  const [detailImage, setDetailImage] = useState('null')
  const [detailImageName, setDetailImageName] = useState('')
  const [objectFile, setObjectFile] = useState('null')
  const [objectFileName, setObjectFileName] = useState('')
  const [mtlFile, setMtlFile] = useState('null')
  const [mtlFileName, setMtlFileName] = useState('')
  const { formData, errors, handleChange, handleFileChange, isFormValid } =
    useRegisterClothesForm()

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (
      errors.productNumber ||
      errors.quantity ||
      errors.discount ||
      errors.price
    ) {
      alert('잘못 입력된 값이 존재합니다.')
      return
    }

    if (!isFormValid()) {
      alert('빈칸을 모두 채워주세요')
    }
    const result = await registerCloth(formData)
    if (result instanceof Error) {
      console.error(result.message)
      alert(result.message)
    } else {
      alert('상품이 등록되었습니다')
      navigate('/adminHome')
    }
  }

  const handleFile = (
    field: string,
    file: File,
    fileName: string,
    value: string
  ) => {
    switch (field) {
      case 'mainImage':
        setMainImage(value)
        break
      case 'detailImage':
        setDetailImage(value)
        setDetailImageName(fileName)
        break
      case 'objectFile':
        setObjectFile(value)
        setObjectFileName(fileName)
        break
      case 'mtlFile':
        setMtlFile(value)
        setMtlFileName(fileName)
        break
    }
    handleFileChange(field, file)
  }

  const handleImage = (type: string) => {
    const fileInput = document.getElementById(type) as HTMLInputElement | null
    if (!fileInput) {
      console.log('File input admin not found')
      return
    }
    const fileSizeLimit = 10 * 1024 * 1024
    const objectFileExtensions = ['obj']
    const materialFileExtensions = ['mtl']

    fileInput.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement
      const file = target.files?.[0]
      if (!file) {
        console.log('File is Not Selected')
        return
      }

      if (type == 'objectFile') {
        const fileExtension = file.name.split('.').pop()?.toLocaleLowerCase()
        if (!fileExtension || !objectFileExtensions.includes(fileExtension)) {
          alert('3D 파일은 obj 파일만 업로드 가능합니다.')
          target.value = ''
          return
        }
      } else if (type == 'mtlFile') {
        const fileExtension = file.name.split('.').pop()?.toLocaleLowerCase()
        if (!fileExtension || !materialFileExtensions.includes(fileExtension)) {
          alert('재질 파일은 mtl 파일만 업로드 가능합니다.')
          target.value = ''
          return
        }
      } else {
        if (!file.type.startsWith('image/')) {
          alert('이미지 파일만 업로드 가능합니다')
          target.value = ''
          return
        }
      }

      if (file.size > fileSizeLimit) {
        alert('파일 크기는 10MB를 초과할 수 없습니다.')
        target.value = ''
        return
      }

      const fileReader = new FileReader()
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        const base64String = e.target?.result as string

        handleFile(type, file, file.name, base64String)
      }
      fileReader.readAsDataURL(file)
    }
    fileInput.click()
  }

  return (
    <ProductRegisterContainer>
      <Title> 상품 등록 </Title>
      <form onSubmit={handleSubmit}>
        <ProductContainer>
          <ProductImageContainer>
            {mainImage == 'null' ? (
              <BlankImage onClick={() => handleImage('mainImage')}>
                <BlankText> 사진을 선택하세요 </BlankText>
              </BlankImage>
            ) : (
              <ProductImage
                src={mainImage}
                id="mainImagePreview"
                onClick={() => handleImage('mainImage')}
              />
            )}
          </ProductImageContainer>
          <ProductInformationContainer>
            <ProductInputContainer>
              <Tag> 상품 이름 </Tag>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </ProductInputContainer>
            <ProductInputContainer>
              <Tag> 카테고리 </Tag>
              <Select
                name="category"
                value={formData.category}
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
                value={formData.genderCategory}
                onChange={(e) => handleChange('genderCategory', e.target.value)}
              >
                <Option value="MALE"> 남성용 </Option>
                <Option value="FEMALE"> 여성용 </Option>
                <Option value="UNISEX"> 남녀공용 </Option>
              </Select>
            </ProductInputContainer>
            <ProductInputContainer>
              <Tag> 상품 가격 </Tag>
              <Input
                type="number"
                name="price"
                placeholder="0"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
              />
            </ProductInputContainer>
            {errors.price && <ErrorMessage> {errors.price} </ErrorMessage>}
            <ProductInputContainer>
              <Tag> 상품 번호 </Tag>
              <Input
                type="text"
                name="productNumber"
                placeholder="PRODUCT-001"
                value={formData.productNumber}
                onChange={(e) => handleChange('productNumber', e.target.value)}
              />
            </ProductInputContainer>
            <ProductInputContainer>
              <Tag> 적용 할인율 </Tag>
              <Input
                type="number"
                name="discount"
                placeholder="0"
                value={formData.discount}
                onChange={(e) => handleChange('discount', e.target.value)}
              />
            </ProductInputContainer>
            {errors.discount && (
              <ErrorMessage> {errors.discount} </ErrorMessage>
            )}
            <ProductInputContainer>
              <Tag> 사이즈 </Tag>
              <Select
                name="size"
                value={formData.size}
                onChange={(e) => handleChange('size', e.target.value)}
              >
                <Option value="XS"> XS </Option>
                <Option value="S"> S </Option>
                <Option value="M"> M </Option>
                <Option value="L"> L </Option>
                <Option value="XL"> XL </Option>
              </Select>
            </ProductInputContainer>
            <ProductInputContainer>
              <Tag> 현재 재고 </Tag>
              <Input
                type="number"
                name="quantity"
                value={formData.quantity}
                placeholder="0"
                onChange={(e) => handleChange('quantity', e.target.value)}
              />
            </ProductInputContainer>
            {errors.quantity && (
              <ErrorMessage> {errors.quantity} </ErrorMessage>
            )}
            <ProductInputContainer>
              <Tag> 상세 사진 </Tag>
              <FileInput onClick={() => handleImage('detailImage')}>
                {detailImage == 'null' ? '사진을 선택하세요.' : detailImageName}
              </FileInput>
            </ProductInputContainer>
            <ProductInputContainer>
              <Tag> 3D 파일 </Tag>
              <FileInput onClick={() => handleImage('objectFile')}>
                {objectFile == 'null'
                  ? 'obj 파일을 선택하세요.'
                  : objectFileName}
              </FileInput>
            </ProductInputContainer>
            <ProductInputContainer>
              <Tag> 재질 파일 </Tag>
              <FileInput onClick={() => handleImage('mtlFile')}>
                {mtlFile == 'null' ? 'mtl 파일을 선택하세요.' : mtlFileName}
              </FileInput>
            </ProductInputContainer>
            <Button type="submit">등록</Button>
          </ProductInformationContainer>
        </ProductContainer>
        <HiddenContainer>
          <Input
            type="file"
            id="mainImage"
            name="mainImage"
            accept="image/*"
            onChange={() => console.log('')}
          />
          <Input
            type="file"
            id="detailImage"
            name="detailImage"
            accept="image/*"
            onChange={() => console.log('')}
          />
          <Input
            type="file"
            id="objectFile"
            name="objectFile"
            onChange={() => console.log('')}
          />
          <Input
            type="file"
            id="mtlFile"
            name="mtlFile"
            onChange={() => console.log('')}
          />
        </HiddenContainer>
      </form>
    </ProductRegisterContainer>
  )
}

export default ProductRegister
