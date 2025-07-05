import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const RedirectIfAuth = ({ children }) => {
  const { user } = useAuth();

  return user ? <Navigate to="/home" /> : children;
};

export default RedirectIfAuth;
