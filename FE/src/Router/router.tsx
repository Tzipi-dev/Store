import { createBrowserRouter } from "react-router"; 
import HomePage from "../components/HomePage/HomePage";
import Main from "../components/Main/Main";

const router = createBrowserRouter([
  {
    path: "/",       
    element: <HomePage />,
    children: [
      {
        index: true,   
        element: <Main />,
      },
      // אפשר להוסיף עוד ילדים אם צריך
      // { path: "about", element: <About /> }
    ],
  },
]);

export default router;