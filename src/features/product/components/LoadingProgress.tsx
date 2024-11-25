import React from 'react'

interface LoadingProgressProps {
  progress: number
}

export const LoadingProgress: React.FC<LoadingProgressProps> = ({
  progress,
}) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-64 p-4 bg-white rounded-lg">
        <div className="mb-2 text-center text-gray-700">
          모델 로딩중... {Math.round(progress)}%
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
