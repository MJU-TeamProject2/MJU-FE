import { useState } from 'react'

const validateProductName = (productName: string): string | null => {
  const productNameRegex = /^Product-\d+$/
  return productNameRegex.test(productName)
    ? null
    : '상품 이름의 형식을 지켜주세요.'
}

const validateNumber = (number: number): string | null => {
  return number >= 0 ? null : '0 이상의 값을 입력해주세요.'
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
  })

  const [errors, setErrors] = useState<FormErrors>({
    productNumber: null,
    number: null,
  })

  const handleNumberChange = (name: string, value: number) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === 'discount' || name === 'quantity' || name === 'price') {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: validateNumber(value),
      }))
    }
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
    } = formData
    return (
      name &&
      category &&
      genderCategory &&
      price &&
      productNumber &&
      discount &&
      size &&
      quantity
    )
  }
  return { formData, errors, handleChange, handleNumberChange, isFormValid }
}

export default useRegisterClothesForm
