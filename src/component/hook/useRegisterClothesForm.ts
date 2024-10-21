import { useState } from 'react'

const validateProductName = (productName: string): string | null => {
  const productNameRegex = /^Product-\d+$/
  return productNameRegex.test(productName)
    ? null
    : '상품 이름의 형식을 지켜주세요.'
}

interface FormData {
  name: string
  category: 'DRESSES' | 'OUTERWEAR' | 'SHOES' | 'PANTS' | 'TOPS'
  genderCategory: 'MALE' | 'FEMALE' | 'UNISEX'
  price: number
  productNumber: string
  discount: number
  size: 'XS' | 'S' | 'M' | 'L' | 'XL'
  quantity: number
  mainImage: File
  detailImage: File
  objectFile: File
}

interface FormErrors {
  productNumber: string | null
  number: string | null
}

export const useRegisterClothesForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: 'DRESSES',
    genderCategory: 'MALE',
    price: 0,
    productNumber: 'PRODUCT-000',
    discount: 0,
    size: 'M',
    quantity: 0,
    mainImage: new File([], ''),
    detailImage: new File([], ''),
    objectFile: new File([], ''),
  })

  const [, setMainImage] = useState<File | null>(null)
  const [, setDetailImage] = useState<File | null>(null)
  const [, setObjectFile] = useState<File | null>(null)

  const [errors, setErrors] = useState<FormErrors>({
    productNumber: null,
    number: null,
  })

  const handleNumberChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === 'productNumber') {
      setErrors((prev) => ({
        ...prev,
        productNumber: validateProductName(value),
      }))
    }
  }
  const handleFileChange = (field: string, file: File) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
    switch (field) {
      case 'mainImage':
        setMainImage(file)
        break
      case 'detailImage':
        setDetailImage(file)
        break
      case 'objectFile':
        setObjectFile(file)
        break
    }
  }
  const isFormValid = () => {
    const {
      name,
      category,
      genderCategory,
      price,
      productNumber,
      discount,
      size,
      quantity,
      mainImage,
      detailImage,
      objectFile,
    } = formData
    return (
      name &&
      category &&
      genderCategory &&
      price &&
      productNumber &&
      discount &&
      size &&
      quantity &&
      mainImage &&
      detailImage &&
      objectFile
    )
  }
  return {
    formData,
    errors,
    handleChange,
    handleNumberChange,
    handleFileChange,
    isFormValid,
  }
}
