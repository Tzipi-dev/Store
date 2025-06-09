import { BrowserRouter } from 'react-router'
import './App.css'
import HomePage from './components/HomePage/HomePage'
import { Provider } from 'react-redux'
import store from './Redux/store'
function App() {
  return (
    <>
   
      <BrowserRouter>
      <Provider store={store}>
        <HomePage />
        </Provider>
      </BrowserRouter>
    </>
  )
}

export default App
