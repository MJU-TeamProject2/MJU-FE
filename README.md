# Multiverse Platform Shopping Mall

메타버스 기반의 혁신적인 쇼핑 경험을 제공하는 플랫폼입니다.

## 🛠 Tech Stack

### Package Management
- **PNPM**
    - 디스크 공간 효율적 사용
    - 빠른 설치 속도
    - 엄격한 패키지 관리
    - Node.js v18 이상 필요

### Core
- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **3D Engine:** Three.js
    - 3D 메타버스 환경 구현
    - 실시간 렌더링
    - 인터랙티브 쇼핑 경험 제공

### Project Structure
- **Architecture:** Feature-First
    - 도메인/기능 중심의 폴더 구조
    - 메타버스 환경과 쇼핑몰 기능의 모듈화
    - 각 기능별 components, hooks, api, types 등을 모듈화

### Styling
- **Styled-components**
    - 컴포넌트 기반 스타일링
    - 동적 스타일링 및 테마 관리
- **TailwindCSS**
    - 유틸리티 기반 스타일링
    - 반응형 디자인 구현
    - 빠른 UI 개발

### API Integration
- **HTTP Client:** Axios
    - REST API 통신
    - 인터셉터를 통한 요청/응답 핸들링
    - 타입 안전성이 보장된 API 통신

### Testing
- **E2E Testing:** Cypress
    - 엔드투엔드 테스트 자동화
    - 컴포넌트 테스트 지원
    - 파일 업로드 테스트 지원
    - 네트워크 idle 상태 감지

### Development Environment
- **Code Quality**
    - ESLint (Airbnb 설정)
    - Prettier
    - TypeScript 엄격한 타입 체킹
- **Development Tools**
    - Hot Module Replacement (HMR)
    - 개발자 경험 최적화

### Navigation
- **Routing:** React Router DOM
    - 클라이언트 사이드 라우팅
    - 동적 라우팅 지원
    - 메타버스 환경 내 네비게이션

### UI/UX
- **아이콘:** Lucide React
    - 모던한 아이콘 시스템
- **날짜 처리:** Day.js
    - 경량화된 날짜 처리
    - 타임존 관리

## 🚀 시작하기

### Prerequisites

```bash
# Node.js 18 이상 설치 필요

# pnpm 설치
npm install -g pnpm
```

### Installation & Development

```bash
# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm run dev

# 빌드
pnpm build

# 테스트 실행
pnpm cypress:run

```

## 📝 Commit Convention
Commit의 성격과 목적을 드러내는 사전에 정의된 단어 중 하나를 작성합니다.

| 태그      | 설명                                                       |
|-----------|----------------------------------------------------------|
| **build** | 빌드 시스템에 변화가 있거나 외부 라이브러리 의존성을 변경했을 때 |
| **ci**    | 지속적 통합과 관련된 작업일 때                           |
| **chore** | 코드 수정 없이 설정 값 등을 변경하는 사소한 작업일 때     |
| **docs**  | 문서화 관련 작업일 때                                     |
| **feat**  | 새로운 기능을 추가했을 때                                 |
| **fix**   | 버그 혹은 이슈를 수정, 패치할 때                         |
| **perf**  | 퍼포먼스 측면에서 코드에 변화를 주었을 때                |
| **refactor** | 코드적인 리팩토링을 진행할 때 (비즈니스 요구사항, 기능 플로우 수정 X) <br> 디렉토리 이동, 수정, 이름 변경 등도 해당 |
| **revert** | git revert 실행 시                                       |
| **style** | 오타 수정, 공백 제거 등 정말 사소한 작업일 때             |
| **test**  | 테스트 코드를 추가, 수정, 삭제할 때                      |
