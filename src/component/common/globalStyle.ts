import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Pretendard';
        font-weight: 400;
        font-style: normal;
        src: url('../../assets/fonts/Pretendard-Regular.woff2') format('woff2');
    }

    @font-face {
        font-family: 'Pretendard';
        font-weight: 700;
        font-style: normal;
        src: url('../../assets/fonts/Pretendard-Bold.woff2') format('woff2');
    }

    @font-face {
        font-family: 'Pretendard';
        font-weight: 600;
        font-style: normal;
        src: url('../../assets/fonts/Pretendard-SemiBold.woff2') format('woff2');
    }

    @font-face {
        font-family: 'Pretendard';
        font-weight: 800;
        font-style: normal;
        src: url('../../assets/fonts/Pretendard-ExtraBold.woff2') format('woff2');
    }

    @font-face {
        font-family: 'Pretendard';
        font-weight: 500;
        font-style: normal;
        src: url('../../assets/fonts/Pretendard-Medium.woff2') format('woff2');
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html, body, #root {
        font-family: "Pretendard";
        font-weight: 400;
        letter-spacing: -0.02px;
    }
`

export default GlobalStyle
