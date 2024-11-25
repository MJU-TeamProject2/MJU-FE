import React from 'react'
import {
  PaginationContainer,
  PaginationButton,
} from '@/components/styles/homeStyle'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <PaginationContainer>
    <PaginationButton
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 0}
    >
      이전
    </PaginationButton>
    <span>
      {currentPage + 1} / {totalPages}
    </span>
    <PaginationButton
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages - 1}
    >
      다음
    </PaginationButton>
  </PaginationContainer>
)
