import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectFromRoot = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/home"); 
    } else {
      navigate("/enter");
    }
  }, [navigate]);

  return null; 
};

export default RedirectFromRoot;
