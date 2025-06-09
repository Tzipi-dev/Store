import { createBrowserRouter } from "react-router";
import HomePage from "../components/HomePage/HomePage";

const router=createBrowserRouter([{
        element: <HomePage/>,
        children:[
            // {index: true, element: }
        ]
}])
export default router