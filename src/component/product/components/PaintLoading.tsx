import {
  FillEffect,
  LoadingCard,
  LoadingContainer,
  LoadingOverlay,
  LoadingText,
  ProgressText,
} from '@/component/product/styles/moderViewerStyle'

const PaintLoading = ({ loadingProgress = 0 }) => {
  return (
    <LoadingOverlay>
      <LoadingCard>
        <LoadingContainer>
          <FillEffect progress={loadingProgress} />
          <ProgressText>{Math.round(loadingProgress)}%</ProgressText>
        </LoadingContainer>
        <LoadingText>로딩중...</LoadingText>
      </LoadingCard>
    </LoadingOverlay>
  )
}
export default PaintLoading
