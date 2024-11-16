import { createGlobalStyle } from 'styled-components'

const FontStyle = createGlobalStyle`
    @font-face {
        font-family: 'Pretendard';
        font-weight: 400;
        src: url('/fonts/Pretendard-Regular.woff2') format('woff2');
    }

    @font-face {
        font-family: 'Pretendard';
        font-weight: 500;
        src: url('/fonts/Pretendard-Medium.woff2') format('woff2');
    }

    @font-face {
        font-family: 'Pretendard';
        font-weight: 600;
        src: url('/fonts/Pretendard-SemiBold.woff2') format('woff2');
    }

    @font-face {
        font-family: 'Pretendard';
        font-weight: 700;
        src: url('/fonts/Pretendard-Bold.woff2') format('woff2');
    }

    @font-face {
        font-family: 'Pretendard';
        font-weight: 800;
        src: url('/fonts/Pretendard-ExtraBold.woff2') format('woff2');
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
    }

    html, body, #root {
        font-weight: 600;
        letter-spacing: -0.02px;
    }
`

export default FontStyle
