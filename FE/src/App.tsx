import { BrowserRouter } from 'react-router'
import './App.css'
import HomePage from './components/HomePage/HomePage'
function App() {
  return (
    <>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </>
  )
}

export default App
