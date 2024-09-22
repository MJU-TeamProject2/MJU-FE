import Router from '@/routes/Router'
import GlobalStyle from '@/component/common/globalStyle'

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
