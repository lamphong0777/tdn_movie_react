import { BrowserRouter } from 'react-router-dom'
import LoadingBarProvider from './components/LoadingBar'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <LoadingBarProvider>
        <AppRoutes />
      </LoadingBarProvider>
    </BrowserRouter>
  )
}

export default App
