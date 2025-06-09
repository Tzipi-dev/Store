import { Outlet } from "react-router"
import Header from "../Header/Header"
import Router from "../Router/Router"


const HomePage = () => {
  return (
    <div>
        <Header/>
        <Router/>
        <Outlet/>
    </div>
  )
}

export default HomePage