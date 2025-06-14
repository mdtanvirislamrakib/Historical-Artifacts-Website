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
import AllArtifacts from "../pages/AllArtifacts";
import axios from "axios";
import Loader from "../Component/Loader";
import ArtifactsDetail from "../pages/ArtifactsDetail";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        loader: () => fetch("http://localhost:3000/top-liked-artifacts"),
        hydrateFallbackElement: <Loader></Loader>,
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
        path: "/all-artifacts",
        loader: () => axios("http://localhost:3000/artifacts"),
        hydrateFallbackElement: <Loader></Loader>,
        Component: AllArtifacts,
      },
      {
        path: "/artifacts/:id",
        loader: ({params}) => axios(`http://localhost:3000/artifact-details/${params.id}`),
        hydrateFallbackElement: <Loader></Loader>,
        element: <PrivetRoute>
          <ArtifactsDetail></ArtifactsDetail>
        </PrivetRoute>
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