import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  retrieveClothesDetail,
  deleteCloth,
  modifyCloth,
} from '@/api/clothesApi'
import {
  ProductModifyContainer,
  ProductInfoContainer,
  ProductFixContainer,
  ProductImageContainer,
  ProductMainImage,
  ProductTag,
  ProductWrapper,
  ProductInfo,
  Title,
  Input,
  FileInput,
  Select,
  Option,
  ProductSection,
  ButtonContainer,
  Button,
  DeleteButton,
  ModifyButton,
  ModifyButtonContainer,
  HiddenContainer,
  SizeButtonContainer,
  SizeButton,
  Form,
} from '@/component/styles/products/modifyStyle'
import { useRegisterClothesForm } from '@/component/hook/useRegisterClothesForm'

const ProductModify = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<any>(null)
  const { formData, errors, handleFileChange, isFormValid } =
    useRegisterClothesForm()

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [genderCategory, setGenderCategory] = useState('')
  const [productNumber, setProductNumber] = useState('')
  const [discount, setDiscount] = useState('')
  const [price, setPrice] = useState('')
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState('')

  const [, setMainImage] = useState('null')
  const [, setDetailImage] = useState('null')
  const [, setObjectFile] = useState('null')
  const [, setMtlFile] = useState('null')
  const [mainImageName, setMainImageName] = useState('null')
  const [detailImageName, setDetailImageName] = useState('null')
  const [objectFileName, setObjectFileName] = useState('null')
  const [mtlFileName, setMtlFileName] = useState('null')

  const navigate = useNavigate()
  const isMounted = useRef(false)

  const loadProductDetails = async () => {
    if (id) {
      const details = await retrieveClothesDetail(id)
      setProduct(details)
      console.log(details.clothesSizeList)

      setName(details.name || '')
      setCategory(details.category)
      setGenderCategory(details.genderCategory || '')
      setProductNumber(details.productNumber || '')
      setDiscount(String(details.discount) || '')
      setPrice(String(details.price) || '')
      setSize(details.clothesSizeList[0].size)
      setQuantity(details.clothesSizeList[0].quantity)
    }
  }

  const selectSizeToSeeQuantity = (value: string) => {
    const sizeList = ['XS', 'S', 'M', 'L', 'XL']
    console.log(product.clothesSizeList)
    for (let i = 0; i < 5; i++) {
      let id = sizeList[i]
      let element = document.getElementById(id)
      if (id == value && element != null) {
        element.style.backgroundColor = 'lightblue'
        element.style.color = '#1E1F30'
        let isSizeExisted = false
        for (const sizeArray of product.clothesSizeList) {
          if (sizeArray.size == value) {
            isSizeExisted = true
            setQuantity(product.clothesSizeList[i].quantity)
            break
          }
        }
        if (!isSizeExisted) setQuantity('0')
      } else if (element != null) {
        element.style.backgroundColor = '#1E1F30'
        element.style.color = 'lightblue'
      }
    }
  }

  const letModify = (time: number) => {
    const infoWrapper = document.getElementById('nonModify')
    const modifyWrapper = document.getElementById('modify')
    const modifyWrapper2 = document.getElementById('modify2')
    const infoButtonGroup = document.getElementById('infoButtonGroup')
    const modifyButtonGroup = document.getElementById('modifyButtonGroup')
    const modifyButtonGroup2 = document.getElementById('modifyButtonGroup2')

    if (
      infoWrapper != null &&
      modifyWrapper != null &&
      infoButtonGroup != null &&
      modifyButtonGroup != null &&
      modifyWrapper2 != null &&
      modifyButtonGroup2 != null
    ) {
      if (time === 1) {
        setName(product.name)
        setCategory(product.category)
        setGenderCategory(product.genderCatetgory)
        setProductNumber(product.productNumber)
        setDiscount(product.discount)
        setPrice(product.price)

        infoWrapper.style.display = 'none'
        infoButtonGroup.style.display = 'none'
        modifyWrapper.style.display = 'block'
        modifyButtonGroup.style.display = 'flex'
      } else if (time === 2) {
        modifyWrapper.style.display = 'none'
        modifyButtonGroup.style.display = 'none'
        modifyWrapper2.style.display = 'block'
        modifyButtonGroup2.style.display = 'flex'
      } else if (time === 3) {
        modifyWrapper.style.display = 'none'
        modifyButtonGroup.style.display = 'none'
        modifyWrapper2.style.display = 'none'
        modifyButtonGroup2.style.display = 'none'
        infoWrapper.style.display = 'block'
        infoButtonGroup.style.display = 'flex'
      }
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
        setMainImageName(fileName)
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
      console.log('File input element not found')
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

  const deleteItem = async () => {
    let select = confirm('해당 상품을 삭제하겠습니까?')
    if (select) {
      const result = await deleteCloth(id)
      console.log(result)
      navigate('/adminHome')
    }
  }

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
    const result = await modifyCloth(formData, id)
    if (result instanceof Error) {
      console.error(result.message)
      alert(result.message)
    } else {
      alert('상품이 수정되었습니다.')
      navigate('/adminHome')
    }
  }

  useEffect(() => {
    if (!isMounted.current) {
      loadProductDetails()
      isMounted.current = true
    }
  }, [])

  const handleChange = (field: string, value: string) => {
    switch (field) {
      case 'name':
        setName(value)
        break
      case 'category':
        setCategory(value)
        break
      case 'genderCategory':
        setGenderCategory(value)
        break
      case 'productNumber':
        setProductNumber(value)
        break
      case 'discount':
        setDiscount(value)
        break
      case 'price':
        setPrice(value)
        break
      case 'size':
        setSize(value)
        break
      case 'quantity':
        setQuantity(value)
        break
    }
  }

  if (!product) return <div>Loading...</div>

  return (
    <ProductModifyContainer>
      <Title> 상품 상세 </Title>
      <Form onSubmit={handleSubmit} id="modifyForm">
        <ProductSection>
          <ProductImageContainer>
            <ProductMainImage src={product.detailUrl} />
          </ProductImageContainer>
          <ProductInfoContainer id="nonModify">
            <ProductWrapper>
              <ProductTag> 상품명 </ProductTag>
              <ProductInfo> {product.name} </ProductInfo>
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 카테고리 </ProductTag>
              <ProductInfo> {product.category} </ProductInfo>
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 성별 분류 </ProductTag>
              <ProductInfo> {product.genderCategory} </ProductInfo>
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 상품번호 </ProductTag>
              <ProductInfo> {product.productNumber} </ProductInfo>
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 할인율 </ProductTag>
              <ProductInfo> {product.discount} </ProductInfo>
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 금액 </ProductTag>
              <ProductInfo> {product.price} </ProductInfo>
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 사이즈 </ProductTag>
              <SizeButtonContainer>
                <SizeButton
                  type="button"
                  id="XS"
                  onClick={() => selectSizeToSeeQuantity('XS')}
                >
                  XS
                </SizeButton>
                <SizeButton
                  type="button"
                  id="S"
                  onClick={() => selectSizeToSeeQuantity('S')}
                >
                  S
                </SizeButton>
                <SizeButton
                  type="button"
                  id="M"
                  onClick={() => selectSizeToSeeQuantity('M')}
                >
                  M
                </SizeButton>
                <SizeButton
                  type="button"
                  id="L"
                  onClick={() => selectSizeToSeeQuantity('L')}
                >
                  L
                </SizeButton>
                <SizeButton
                  type="button"
                  id="XL"
                  onClick={() => selectSizeToSeeQuantity('XL')}
                >
                  XL
                </SizeButton>
              </SizeButtonContainer>
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 재고 </ProductTag>
              <ProductInfo> {quantity} </ProductInfo>
            </ProductWrapper>
          </ProductInfoContainer>
          <ProductFixContainer id="modify">
            <ProductWrapper>
              <ProductTag> 상품명 </ProductTag>
              <Input
                type="text"
                name="name"
                value={name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 카테고리 </ProductTag>
              <Select
                name="category"
                value={category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                <Option value="DRESSES"> 드레스 </Option>
                <Option value="OUTERWEAR"> 겉옷 </Option>
                <Option value="PANTS"> 바지 </Option>
                <Option value="SHOES"> 신발 </Option>
                <Option value="TOPS"> 상의 </Option>
              </Select>
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 성별 분류 </ProductTag>
              <Select
                name="genderCategory"
                value={genderCategory}
                onChange={(e) => handleChange('genderCategory', e.target.value)}
              >
                <Option value="MALE"> 남성용 </Option>
                <Option value="FEMALE"> 여성용 </Option>
                <Option value="UNISEX"> 남녀공용 </Option>
              </Select>
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 상품번호 </ProductTag>
              <Input
                type="text"
                name="productNumber"
                value={productNumber}
                onChange={(e) => handleChange('productNumber', e.target.value)}
              />
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 할인율 </ProductTag>
              <Input
                type="number"
                name="discount"
                value={discount}
                onChange={(e) => handleChange('discount', e.target.value)}
              />
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 금액 </ProductTag>
              <Input
                type="number"
                name="price"
                value={price}
                onChange={(e) => handleChange('price', e.target.value)}
              />
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 사이즈 </ProductTag>
              <Select
                name="size"
                value={size}
                onChange={(e) => handleChange('size', e.target.value)}
              >
                <Option value="XS"> XS </Option>
                <Option value="S"> S </Option>
                <Option value="M"> M </Option>
                <Option value="L"> L </Option>
                <Option value="XL"> XL </Option>
              </Select>
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 재고 </ProductTag>
              <Input
                type="number"
                name="quantity"
                value={quantity}
                onChange={(e) => handleChange('quantity', e.target.value)}
              />
            </ProductWrapper>
          </ProductFixContainer>
          <ProductFixContainer id="modify2">
            <ProductWrapper>
              <ProductTag> 제품 사진 </ProductTag>
              <FileInput onClick={() => handleImage('detailImage')}>
                {' '}
                {detailImageName == 'null'
                  ? '파일을 선택하세요'
                  : detailImageName}{' '}
              </FileInput>
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 미리보기 </ProductTag>
              <FileInput onClick={() => handleImage('mainImage')}>
                {mainImageName == 'null' ? '파일을 선택하세요' : mainImageName}
              </FileInput>
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 3D 파일 </ProductTag>
              <FileInput onClick={() => handleImage('objectFile')}>
                {objectFileName == 'null'
                  ? '파일을 선택하세요'
                  : objectFileName}
              </FileInput>
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 재질 파일 </ProductTag>
              <FileInput onClick={() => handleImage('mtlFile')}>
                {mtlFileName == 'null' ? '파일을 선택하세요' : mtlFileName}
              </FileInput>
            </ProductWrapper>
          </ProductFixContainer>
        </ProductSection>
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
      </Form>
      <ButtonContainer id="infoButtonGroup">
        <Button onClick={() => letModify(1)}>수정</Button>
        <DeleteButton onClick={deleteItem}>삭제</DeleteButton>
      </ButtonContainer>
      <ModifyButtonContainer id="modifyButtonGroup">
        <ModifyButton onClick={() => letModify(2)}> 다음 </ModifyButton>
        <Button onClick={() => letModify(3)}>취소</Button>
      </ModifyButtonContainer>
      <ModifyButtonContainer id="modifyButtonGroup2">
        <ModifyButton type="submit" form="modifyForm">
          수정
        </ModifyButton>
        <Button onClick={() => letModify(3)}>취소</Button>
      </ModifyButtonContainer>
    </ProductModifyContainer>
  )
}

export default ProductModify
