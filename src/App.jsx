
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "./layouts/MainLayout";
import { EnterPage, Home, Register, Login } from "./pages";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import RedirectIfAuth from "./components/RedirectIfAuth";
import RedirectFromRoot from "./components/RedirectFromRoot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RedirectFromRoot />,
  },
  {
    path: "/enter",
    element: <EnterPage />,
  },
  {
    path: "/register",
    element: (
      <RedirectIfAuth>
        <Register />
      </RedirectIfAuth>
    ),
  },
  {
    path: "/login",
    element: (
      <RedirectIfAuth>
        <Login />
      </RedirectIfAuth>
    ),
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </AuthProvider>
  );
}

export default App;
