import Router from '@/routes/Router'
import GlobalStyle from '@/component/common/styles/globalStyle'

function App() {
  return (
    <>
      <GlobalStyle />
      <div className="App">
        <Router />
      </div>
    </>
  )
}

export default App
