import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

// Sahifalar
import { EnterPage, Home, Register, Login } from "./pages";


import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import RedirectIfAuth from "./components/RedirectIfAuth";
import RedirectFromRoot from "./components/RedirectFromRoot"; // ✅ YANGI

const router = createBrowserRouter([
  {
    path: "/",
    element: <RedirectFromRoot />, // ✅ Foydalanuvchi holatiga qarab /home yoki /enter ga yuboradi
  },
  {
    path: "/enter",
    element: <EnterPage />
  },
  {
    path: "/register",
    element: (
      <RedirectIfAuth>
        <Register />
      </RedirectIfAuth>
    )
  },
  {
    path: "/login",
    element: (
      <RedirectIfAuth>
        <Login />
      </RedirectIfAuth>
    )
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
        element: <Home />
      }
    ]
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
