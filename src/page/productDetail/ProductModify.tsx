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
  Select,
  Option,
  ProductSection,
  ButtonContainer,
  Button,
  DeleteButton,
  ModifyButtonContainer,
  ModifyButton,
  CancelButton,
  HiddenContainer,
  SizeButtonContainer,
  SizeButton,
  Form,
  ModifyRankContainer,
  ModifyRank,
  ModifySelectedRank,
  ModifyTitle,
  FileInput,
  Table,
  TableHead,
  TableRow,
  TableColumn,
  DivideLine,
} from '@/component/styles/products/modifyStyle'
import { useRegisterClothesForm } from '@/component/hook/useRegisterClothesForm'

interface jsonType {
  [key: string]: any
}

const ProductModify = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<any>(null)
  const { errors, handleChange, handleFileChange } = useRegisterClothesForm()

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [genderCategory, setGenderCategory] = useState('')
  const [productNumber, setProductNumber] = useState('')
  const [discount, setDiscount] = useState('')
  const [price, setPrice] = useState('')
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(0)
  const mainImageRef = useRef<HTMLInputElement>(null)
  const [mainImageName, setMainImageName] =
    useState('이미지 파일을 선택해주세요.')
  const detailImageRef = useRef<HTMLInputElement>(null)
  const [detailImageName, setDetailImageName] =
    useState('이미지 파일을 선택해주세요.')
  const objectFileRef = useRef<HTMLInputElement>(null)
  const [objectFileName, setObjectFileName] =
    useState('obj 파일을 선택해주세요')
  const mtlFileRef = useRef<HTMLInputElement>(null)
  const [mtlFileName, setMtlFileName] = useState('mtl 파일을 선택해주세요')

  const navigate = useNavigate()
  const isMounted = useRef(false)

  const loadProductDetails = async () => {
    if (id) {
      const details = await retrieveClothesDetail(id)
      setProduct(details)

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
    const sizeList: jsonType = {
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0,
    }
    for (const sizeQuantity of product.clothesSizeList) {
      sizeList[sizeQuantity.size] = sizeQuantity.quantity
    }
    for (const sizeValue in sizeList) {
      let element = document.getElementById(sizeValue)
      if (element !== null && sizeValue == value) {
        element.style.backgroundColor = 'lightblue'
        element.style.color = '#1E1F30'
        setQuantity(sizeList[sizeValue])
      } else if (element !== null) {
        element.style.backgroundColor = '#1E1F30'
        element.style.color = 'lightblue'
      }
    }
  }
  const letModify = (time: number) => {
    fillForm()

    switch (time) {
      case 1:
        setName(product.name)
        setCategory(product.category)
        setGenderCategory(product.genderCatetgory)
        setProductNumber(product.productNumber)
        setDiscount(product.discount)
        setPrice(product.price)

        controlInfoWrapper(false)
        controlModifyBasic(true)
        controlModifySize(false)
        controlModifyFiles(false)
        break
      case 2:
        controlInfoWrapper(false)
        controlModifyBasic(false)
        controlModifySize(true)
        controlModifyFiles(false)
        break
      case 3:
        controlInfoWrapper(false)
        controlModifyBasic(false)
        controlModifySize(false)
        controlModifyFiles(true)
        break
      case 0:
        controlInfoWrapper(true)
        controlModifyBasic(false)
        controlModifySize(false)
        controlModifyFiles(false)
        break
    }
  }
  const controlInfoWrapper = (isVisible: boolean) => {
    const wrapper = document.getElementById('nonModify')
    const buttons = document.getElementById('infoButtonGroup')

    if (wrapper != null && buttons != null) {
      if (isVisible) {
        wrapper.style.display = 'block'
        buttons.style.display = 'flex'
      } else {
        wrapper.style.display = 'none'
        buttons.style.display = 'none'
      }
    }
  }
  const controlModifyBasic = (isVisible: boolean) => {
    const wrapper = document.getElementById('modify01')
    const buttons = document.getElementById('modifyButtonGroup01')
    if (wrapper != null && buttons != null) {
      if (isVisible) {
        wrapper.style.display = 'block'
        buttons.style.display = 'flex'
      } else {
        wrapper.style.display = 'none'
        buttons.style.display = 'none'
      }
    }
  }
  const controlModifySize = (isVisible: boolean) => {
    const wrapper = document.getElementById('modify02')
    const buttons = document.getElementById('modifyButtonGroup02')
    if (wrapper != null && buttons != null) {
      if (isVisible) {
        wrapper.style.display = 'block'
        buttons.style.display = 'flex'
      } else {
        wrapper.style.display = 'none'
        buttons.style.display = 'none'
      }
    }
  }
  const controlModifyFiles = (isVisible: boolean) => {
    const wrapper = document.getElementById('modify03')
    const buttons = document.getElementById('modifyButtonGroup03')
    if (wrapper != null && buttons != null) {
      if (isVisible) {
        wrapper.style.display = 'block'
        buttons.style.display = 'flex'
      } else {
        wrapper.style.display = 'none'
        buttons.style.display = 'none'
      }
    }
  }
  const deleteItem = async () => {
    let select = confirm('해당 상품을 삭제하겠습니까?')
    if (select) {
      const result = await deleteCloth(id)
      console.log(result)
      navigate('/adminHome')
    }
  }
  const fillForm = () => {
    const inputName = document.getElementById('inputName') as HTMLInputElement
    const inputCategory = document.getElementById(
      'inputCategory'
    ) as HTMLInputElement
    const inputGenderCategory = document.getElementById(
      'inputGenderCategory'
    ) as HTMLInputElement
    const inputPrice = document.getElementById('inputPrice') as HTMLInputElement
    const inputDiscount = document.getElementById(
      'inputDiscount'
    ) as HTMLInputElement
    const inputProductNumber = document.getElementById(
      'inputProductNumber'
    ) as HTMLInputElement
    const inputSize = document.getElementById('inputSize') as HTMLInputElement
    const inputQuantity = document.getElementById(
      'inputQuantity'
    ) as HTMLInputElement

    if (inputName !== null) handleChange('name', inputName.value)
    if (inputCategory !== null) handleChange('category', inputCategory.value)
    if (inputGenderCategory !== null)
      handleChange('genderCategory', inputGenderCategory.value)
    if (inputPrice !== null) handleChange('price', inputPrice.value)
    if (inputDiscount !== null) handleChange('discount', inputDiscount.value)
    if (inputProductNumber !== null)
      handleChange('productNumber', inputProductNumber.value)
    if (inputSize !== null) handleChange('size', inputSize.value)
    if (inputQuantity !== null) handleChange('quantity', inputQuantity.value)
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
    const changedList: jsonType = {}
    for (const sizeArray of product.clothesSizeList) {
      if (sizeArray.size == size && sizeArray.quantity != quantity) {
        changedList['size'] = size
        changedList['quantity'] = quantity
      }
    }
    if (product.price != price) changedList['price'] = price
    if (product.name != name) changedList['name'] = name
    if (product.category != category) changedList['category'] = category
    if (product.genderCategory != genderCategory)
      changedList['genderCategory'] = genderCategory
    if (product.productNumber != productNumber)
      changedList['productNumber'] = productNumber
    if (product.discount != discount) changedList['discount'] = discount

    if (mainImageRef.current != null && mainImageRef.current.files != null)
      changedList['mainImage'] = mainImageRef.current.files[0]
    if (detailImageRef.current != null && detailImageRef.current.files != null)
      changedList['detailImage'] = detailImageRef.current.files[0]
    if (objectFileRef.current != null && objectFileRef.current.files != null)
      changedList['objectFile'] = objectFileRef.current.files[0]
    if (mtlFileRef.current != null && mtlFileRef.current.files != null)
      changedList['mtlFile'] = mtlFileRef.current.files[0]

    console.log(changedList)
    const result = await modifyCloth(changedList, id)
    if (result instanceof Error) {
      console.error(result.message)
      alert(result.message)
    } else {
      alert('상품이 수정되었습니다.')
      navigate('/adminHome')
    }
  }
  const handleData = (field: string, value: string) => {
    handleChange(field, value)
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
        setQuantity(Number(value))
        break
    }
  }
  const handleImage = (type: string) => {
    const fileInput = document.getElementById(type) as HTMLInputElement | null
    if (!fileInput) {
      console.log('File input element not found')
      return
    }
    // File Size Limit: 10MB
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
        handleFile(type, file, file.name)
        console.log(e.target)
      }
      fileReader.readAsDataURL(file)
    }
    fileInput.click()
  }
  const handleFile = (field: string, file: File, fileName: string) => {
    switch (field) {
      case 'mainImage':
        setMainImageName(fileName)
        break
      case 'detailImage':
        setDetailImageName(fileName)
        break
      case 'objectFile':
        setObjectFileName(fileName)
        break
      case 'mtlFile':
        setMtlFileName(fileName)
        break
    }
    handleFileChange(field, file)
  }

  useEffect(() => {
    if (!isMounted.current) {
      loadProductDetails()
      isMounted.current = true
    }
  }, [])
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
                <SizeButton
                  type="button"
                  id="XXL"
                  onClick={() => selectSizeToSeeQuantity('XXL')}
                >
                  XXL
                </SizeButton>
              </SizeButtonContainer>
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 재고 </ProductTag>
              <ProductInfo> {quantity} </ProductInfo>
            </ProductWrapper>
          </ProductInfoContainer>
          <ProductFixContainer id="modify01">
            <ModifyRankContainer>
              <ModifySelectedRank id="modifyRank1"> 1 </ModifySelectedRank>
              <ModifyRank id="modifyRank2"> 2 </ModifyRank>
              <ModifyRank id="modifyRank3"> 3 </ModifyRank>
            </ModifyRankContainer>
            <ProductWrapper>
              <ModifyTitle> 기본 정보 수정 </ModifyTitle>
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 상품명 </ProductTag>
              <Input
                type="text"
                name="name"
                id="inputName"
                value={name}
                onChange={(e) => handleData('name', e.target.value)}
              />
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 카테고리 </ProductTag>
              <Select
                name="category"
                value={category}
                id="inputCategory"
                onChange={(e) => handleData('category', e.target.value)}
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
                id="inputGenderCategory"
                onChange={(e) => handleData('genderCategory', e.target.value)}
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
                id="inputProductNumber"
                value={productNumber}
                onChange={(e) => handleData('productNumber', e.target.value)}
              />
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 할인율 </ProductTag>
              <Input
                type="number"
                name="discount"
                id="inputDiscount"
                value={discount}
                onChange={(e) => handleData('discount', e.target.value)}
              />
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 금액 </ProductTag>
              <Input
                type="number"
                name="price"
                id="inputPrice"
                value={price}
                onChange={(e) => handleData('price', e.target.value)}
              />
            </ProductWrapper>
          </ProductFixContainer>
          <ProductFixContainer id="modify02">
            <ModifyRankContainer>
              <ModifyRank id="modifyRank1"> 1 </ModifyRank>
              <ModifySelectedRank id="modifyRank2"> 2 </ModifySelectedRank>
              <ModifyRank id="modifyRank3"> 3 </ModifyRank>
            </ModifyRankContainer>
            <ProductWrapper>
              <ModifyTitle> 사이즈 별 재고 수정 </ModifyTitle>
            </ProductWrapper>
            <DivideLine />
            <ProductWrapper>
              <ProductTag> 현재 사이즈 별 재고</ProductTag>
            </ProductWrapper>
            <ProductWrapper>
              <Table>
                <TableHead>
                  <tr>
                    <TableColumn> S </TableColumn>
                    <TableColumn> M </TableColumn>
                    <TableColumn> L </TableColumn>
                    <TableColumn> XL </TableColumn>
                    <TableColumn> XXL </TableColumn>
                  </tr>
                </TableHead>
                <TableRow>
                  <tr>
                    <TableColumn>
                      {product.clothesSizeList[0].quantity}
                    </TableColumn>
                    <TableColumn>
                      {product.clothesSizeList[1].quantity}
                    </TableColumn>
                    <TableColumn>
                      {product.clothesSizeList[2].quantity}
                    </TableColumn>
                    <TableColumn>
                      {product.clothesSizeList[3].quantity}
                    </TableColumn>
                    <TableColumn>
                      {product.clothesSizeList[4].quantity}
                    </TableColumn>
                  </tr>
                </TableRow>
              </Table>
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 사이즈 </ProductTag>
              <Select
                name="size"
                value={size}
                id="inputSize"
                onChange={(e) => handleData('size', e.target.value)}
              >
                <Option value="S"> S </Option>
                <Option value="M"> M </Option>
                <Option value="L"> L </Option>
                <Option value="XL"> XL </Option>
                <Option value="XXL"> XXL </Option>
              </Select>
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 재고 </ProductTag>
              <Input
                type="number"
                name="quantity"
                id="inputQuantity"
                value={quantity}
                onChange={(e) => handleData('quantity', e.target.value)}
              />
            </ProductWrapper>
          </ProductFixContainer>
          <ProductFixContainer id="modify03">
            <ModifyRankContainer>
              <ModifyRank id="modifyRank1"> 1 </ModifyRank>
              <ModifyRank id="modifyRank2"> 2 </ModifyRank>
              <ModifySelectedRank id="modifyRank3"> 3 </ModifySelectedRank>
            </ModifyRankContainer>
            <ProductWrapper>
              <ModifyTitle> 상품 관련 파일 수정 </ModifyTitle>
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 3D 파일 </ProductTag>
              <FileInput onClick={() => handleImage('objectFile')}>
                {' '}
                {objectFileName}{' '}
              </FileInput>
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 재질 파일 </ProductTag>
              <FileInput onClick={() => handleImage('mtlFile')}>
                {' '}
                {mtlFileName}{' '}
              </FileInput>
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 상세 사진 </ProductTag>
              <FileInput onClick={() => handleImage('detailImage')}>
                {' '}
                {detailImageName}{' '}
              </FileInput>
            </ProductWrapper>
            <ProductWrapper>
              <ProductTag> 메인 사진 </ProductTag>
              <FileInput onClick={() => handleImage('mainImage')}>
                {' '}
                {mainImageName}{' '}
              </FileInput>
            </ProductWrapper>
          </ProductFixContainer>
        </ProductSection>
        <HiddenContainer>
          <Input
            type="file"
            id="mainImage"
            name="mainImage"
            ref={mainImageRef}
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
        <ModifyButton onClick={() => letModify(1)}>수정</ModifyButton>
        <DeleteButton onClick={deleteItem}>삭제</DeleteButton>
      </ButtonContainer>
      <ModifyButtonContainer id="modifyButtonGroup01">
        <Button onClick={() => letModify(2)}> 다음 </Button>
        <CancelButton onClick={() => letModify(0)}>취소</CancelButton>
      </ModifyButtonContainer>
      <ModifyButtonContainer id="modifyButtonGroup02">
        <Button onClick={() => letModify(1)}> 이전 </Button>
        <Button onClick={() => letModify(3)}> 다음 </Button>
        <CancelButton onClick={() => letModify(0)}>취소</CancelButton>
      </ModifyButtonContainer>
      <ModifyButtonContainer id="modifyButtonGroup03">
        <Button onClick={() => letModify(2)}>이전</Button>
        <ModifyButton onClick={(e) => handleSubmit(e)}> 수정 </ModifyButton>
        <CancelButton onClick={() => letModify(0)}>취소</CancelButton>
      </ModifyButtonContainer>
    </ProductModifyContainer>
  )
}

export default ProductModify
