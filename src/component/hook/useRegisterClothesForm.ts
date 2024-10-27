import { useState } from 'react'

const validatePrice = (price: number): string | null => {
  return price > -1 ? null : '금액은 0원 이상이어야 합니다,'
}
const validateDiscount = (discount: number): string | null => {
  return discount > -1 ? null : '할인율은 0 이상이어야 합니다.'
}
const validateQuantity = (quantity: number): string | null => {
  return quantity > -1 ? null : '재고는 0개 이상이어야 합니다.'
}

export type Category = 'DRESSES' | 'OUTERWEAR' | 'PANTS' | 'SHOES' | 'TOPS'
export type Gender = 'MALE' | 'FEMALE' | 'UNISEX'

interface FormData {
  name: string
  category: Category
  genderCategory: Gender
  price: number
  productNumber: string
  discount: number
  size: 'XS' | 'S' | 'M' | 'L' | 'XL'
  quantity: number
  mainImage: File
  detailImage: File
  objectFile: File
  mtlFile: File
}

interface FormErrors {
  productNumber: string | null
  price: string | null
  discount: string | null
  quantity: string | null
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
    mtlFile: new File([], ''),
  })

  const [, setMainImage] = useState<File | null>(null)
  const [, setDetailImage] = useState<File | null>(null)
  const [, setObjectFile] = useState<File | null>(null)
  const [, setMtlFile] = useState<File | null>(null)

  const [errors, setErrors] = useState<FormErrors>({
    productNumber: null,
    price: null,
    discount: null,
    quantity: null,
  })

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    switch (name) {
      case 'price':
        setErrors((prev) => ({
          ...prev,
          price: validatePrice(parseInt(value)),
        }))
        break
      case 'discount':
        setErrors((prev) => ({
          ...prev,
          discount: validateDiscount(parseInt(value)),
        }))
        break
      case 'quantity':
        setErrors((prev) => ({
          ...prev,
          quantity: validateQuantity(parseInt(value)),
        }))
        break
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
      case 'mtlFile':
        setMtlFile(file)
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
      mtlFile,
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
      objectFile &&
      mtlFile
    )
  }
  return {
    formData,
    setFormData,
    errors,
    handleChange,
    handleFileChange,
    isFormValid,
  }
}
