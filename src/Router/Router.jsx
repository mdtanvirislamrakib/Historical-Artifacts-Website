import {
  createBrowserRouter,
} from "react-router";
import ErrorPage from "../pages/ErrorPage";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
    errorElement: <ErrorPage></ErrorPage>
  },
]);