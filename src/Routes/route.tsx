import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import MainLayout from "../layout/MainLayout/MainLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Home from "../pages/Home/Home";
import PostDetails from "../pages/PostDetails/PostDetails";
import Profile from "../pages/Profile/Profile";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoute from "../components/guard/protected/ProtectedRoute";
import Authprotected from "../components/guard/authprotected/Authprotected";

export const routes = createBrowserRouter([
  // =========================
  // Auth Pages
  // =========================

  {
    path: "/",
  element: (
    <Authprotected>
      <AuthLayout />
    </Authprotected>
  ),
    errorElement: <NotFound />,

    children: [
      {
        index: true,
        element: <Login />,
      },

      {
        path: "/signup",
        element: <Register />,
      },
    ],
  },

  // =========================
  // Protected Pages
  // =========================

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),

    errorElement: <NotFound />,

    children: [
      {
        path: "/home",
        element: <Home />,
      },

      {
        path: "/post/:id",
        element: <PostDetails />,
      },

      {
        path: "/profile",
        element: <Profile />,
      },

      {
        path: "/change-password",
        element: <ChangePassword />,
      },
    ],
  },
]);