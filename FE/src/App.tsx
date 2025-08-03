import { BrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import HomePage from './components/HomePage/HomePage'
import { Provider } from 'react-redux'
import store from './Redux/store'
import router from './Router/router'
function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
