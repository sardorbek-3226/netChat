import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectFromRoot = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/home"); // Login bo‘lgan foydalanuvchi
    } else {
      navigate("/enter"); // Birinchi marta kirgan yoki login qilmagan foydalanuvchi
    }
  }, [navigate]);

  return null; // Sahifa hech narsa ko‘rsatmaydi, faqat yo‘naltiradi
};

export default RedirectFromRoot;
