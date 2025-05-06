import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
//
import Root from "./routes/Root";
import App from "./App";

export const RouterConstants = {
  root: {
    path: "/",
    page: (
      <App>
        <Root />
      </App>
    ),
    icon: <br />,
  },
};

const router = createBrowserRouter([
  {
    path: RouterConstants.root.path,
    element: RouterConstants.root.page,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
