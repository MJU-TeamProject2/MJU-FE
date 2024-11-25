import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://ec2-52-79-52-146.ap-northeast-2.compute.amazonaws.com/',
    supportFile: 'cypress/support/e2e.ts',
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
})
