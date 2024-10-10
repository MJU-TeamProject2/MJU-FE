import React, { useEffect, useState } from 'react'
import { retriveAllClothes, ClothesItem } from '@/api/clothesApi.ts'
// import { ClothesItem } from '@/api/clothesApi.ts'

const AdminHome: React.FC = () => {
  const [clothes, setClothes] = useState<ClothesItem[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const pageSize = 10

  useEffect(() => {
    fetchClothes()
  }, [currentPage])

  const fetchClothes = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await retriveAllClothes(currentPage, pageSize)
      setClothes(response.content)
      setTotalPages(Math.ceil(response.total / pageSize))
    } catch (err) {
      setError('Failed to fetch products. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return <></>
}

export default AdminHome
