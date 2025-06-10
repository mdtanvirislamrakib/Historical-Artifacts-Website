import {
  createBrowserRouter,
} from "react-router";
import ErrorPage from "../pages/ErrorPage";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PrivetRoute from "../Authentication/PrivetRoute";
import ContactSupport from "../pages/ContactSupport";
import BrowseDocumentation from "../pages/BrowseDocumentation";
import AboutSection from "../pages/About";
import AddArtifact from "../pages/AddArtifact";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/about",
        Component: AboutSection,
      },
      {
        path: "/add-artifacts",
        element: <PrivetRoute>
          <AddArtifact></AddArtifact>
        </PrivetRoute>
      },
      {
        path: "/signup",
        Component: SignUp,
      },
      {
        path:"/contact-support",
        element:<PrivetRoute>
          <ContactSupport></ContactSupport>
        </PrivetRoute>
      },
      {
        path: "/browse-documentation",
        element: <PrivetRoute>
          <BrowseDocumentation></BrowseDocumentation>
        </PrivetRoute>
      }
    ]
  },
]);