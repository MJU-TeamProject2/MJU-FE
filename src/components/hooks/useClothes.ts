import { useState, useEffect } from 'react'
import {
  ClothesItem,
  retrieveAllClothes,
  retrieveClothesByCategory,
} from '@/services/clothesApi'

interface UseClothesProps {
  pageSize?: number
  category?: string
}

interface UseClothesReturn {
  clothes: ClothesItem[]
  currentPage: number
  totalPages: number
  isLoading: boolean
  error: string | null
  handlePageChange: (newPage: number) => void
}

export const useClothes = ({
  pageSize = 10,
  category,
}: UseClothesProps): UseClothesReturn => {
  const [clothes, setClothes] = useState<ClothesItem[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClothes = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response =
          category === 'ALL' || !category
            ? await retrieveAllClothes(currentPage, pageSize)
            : await retrieveClothesByCategory(currentPage, pageSize, category)

        setClothes(response.content)
        setTotalPages(Math.ceil(response.total / pageSize))
      } catch (err) {
        setError('Failed to fetch styles. Please try again.')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchClothes()
  }, [currentPage, category, pageSize])

  return {
    clothes,
    currentPage,
    totalPages,
    isLoading,
    error,
    handlePageChange: setCurrentPage,
  }
}
