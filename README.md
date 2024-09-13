# MJU-FE
명지대 팀프로젝트 2 메타버스 플랫폼 쇼핑몰

### 개발환경
+ Node.js v20.17.0 (LTS)
+ React+Vite
+ TypeScript+SWC
+ ESLint+Pritter
+ React Query
+ Dayjs
+ jest
+ Cypress
+ effect ts

### 개발환경 추가 설명
**Vite**
    - **역할**: 빌드 도구 / 개발 서버
    - **설명**: 빠른 개발 환경을 제공하는 빌드 도구로, 핫 모듈 교체(HMR)와 최적화된 번들링을 지원합니다.

**TypeScript**
    - **역할**: 프로그래밍 언어
    - **설명**: JavaScript의 상위 집합으로, 정적 타입을 지원하여 코드의 안정성과 가독성을 높이는 언어입니다.

**SWC**
    - **역할**: 컴파일러
    - **설명**: TypeScript 및 JavaScript 코드를 빠르게 컴파일하는 도구로, Rust로 작성되어 높은 성능을 자랑합니다.
    > Vite로 프로젝트를 생성하면 Vite가 무거운 Webpack을 대체하게 됩니다
SWC는 Rust(병렬처리)로 작성 된 컴파일러 + 번들러의 역할을 하는데,
병렬처리를 한다면 동시에 여러 파일을 변환할수 있습니다.
즉, 병렬처리가 불가 한 Javascript로 작성 된 Babel과 같은 역할을 하지만 SWC는 그것을 대체하여 더욱 빠르게 이용이 가능하다고 합니다.