import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-style: normal;
    src: url('../../../../public/fonts/Pretendard-Regular.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    font-style: normal;
    src: url('../../../../public/fonts/Pretendard-Bold.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    font-style: normal;
    src: url('../../../../public/fonts/Pretendard-SemiBold.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 800;
    font-style: normal;
    src: url('../../../../public/fonts/Pretendard-ExtraBold.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    font-style: normal;
    src: url('../../../../public/fonts/Pretendard-Medium.woff2') format('woff2');
  }

  body {
    font-family: 'Pretendard', sans-serif;
  }
`

export default GlobalStyle
