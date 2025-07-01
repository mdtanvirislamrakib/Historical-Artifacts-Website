import axios from "axios";
import {
  createBrowserRouter,
} from "react-router";
import PrivetRoute from "../Authentication/PrivetRoute";
import Loader from "../Component/Loader";
import AboutSection from "../pages/About";
import AddArtifact from "../pages/AddArtifact";
import AllArtifacts from "../pages/AllArtifacts";
import ArtifactsDetail from "../pages/ArtifactsDetail";
import BrowseDocumentation from "../pages/BrowseDocumentation";
import ContactSupport from "../pages/ContactSupport";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import LikedArtifacts from "../pages/LikedArtifacts";
import Login from "../pages/Login";
import MyArtifacts from "../pages/MyArtifacts";
import SignUp from "../pages/SignUp";
import UpdateArtifacts from "../pages/UpdateArtifacts";
import RootLayout from "../RootLayout/RootLayout";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        loader: () => fetch("https://historical-artifacts-server-three.vercel.app/top-liked-artifacts"),
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
        path: "/my-artifacts/:email",
        loader: ({params}) => axios(`https://historical-artifacts-server-three.vercel.app/my-artifact/${params.email}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }),
        hydrateFallbackElement: <Loader></Loader>,
        element: <PrivetRoute>
          <MyArtifacts></MyArtifacts>
        </PrivetRoute>
      },
      {
        path: "/liked-artifacts/:email",
        loader: ({params}) => fetch(`https://historical-artifacts-server-three.vercel.app/liked-artifacts/${params.email}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }),
        hydrateFallbackElement: <Loader></Loader>,
        element: <PrivetRoute>
          <LikedArtifacts></LikedArtifacts>
        </PrivetRoute>
      },
      {
        path: "/update-artifact/:id",
        loader: ({params}) => fetch(`https://historical-artifacts-server-three.vercel.app/artifacts/${params.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }),
        hydrateFallbackElement: <Loader></Loader>,
        element: <PrivetRoute>
          <UpdateArtifacts></UpdateArtifacts>
        </PrivetRoute>
      },
      {
        path: "/all-artifacts",
        loader: () => axios("https://historical-artifacts-server-three.vercel.app/artifacts"),
        hydrateFallbackElement: <Loader></Loader>,
        Component: AllArtifacts,
      },
      {
        path: "/artifacts/:id",
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
        element: <BrowseDocumentation></BrowseDocumentation>
      }
    ]
  },
]);