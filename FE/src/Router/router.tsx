import { createBrowserRouter } from "react-router";
import HomePage from "../components/HomePage/HomePage";
import Main from "../components/Main/Main";
import ChainsMain from "../components/Chains/ChainsMain";
import RingsMain from "../components/Rings/RingsMain";
import EarringsMain from "../components/Earrings/EarringsMain";
import BracelateMain from "../components/Bracelate/BracelateMain";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {

        children: [
          {
            index: true,
            element: <Main />,
          },
          {
            path: "chains",
            element: <ChainsMain />,
          },
          {
            path: "rings",
            element: <RingsMain />,
          },
          {
            path: "earrings",
            element: <EarringsMain />
          },
          {
            path: "bracelate",
            element: <BracelateMain />
          }
        ]
      },
      // אפשר להוסיף עוד ילדים אם צריך
      // { path: "about", element: <About /> }
    ],
  },
]);

export default router;