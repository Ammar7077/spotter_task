import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
//
import Flights from "./routes/Flights";
import App from "./App";
import { Bed, Plane } from "lucide-react";

export const RouterConstants = {
  root: {
    path: "/",
    page: (
      <App>
        <Flights />
      </App>
    ),
    icon: <Plane fill="#A7C6FA" width={"20px"} size={"20px"} stroke={"20px"} />,
    name: "Flights",
  },
  hotels: {
    path: "/hotels",
    page: (
      <App>
        <></>
      </App>
    ),
    icon: <Bed color="#A7C6FA" fill="#A7C6FA" width={"17px"} size={"17px"} />,
    name: "Hotels",
  },
  //* So we can add here another pages/routes
};

const router = createBrowserRouter([
  {
    path: RouterConstants.root.path,
    element: RouterConstants.root.page,
  },
  //* Only flights page/route added, and we can add the other pages/routes here
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
