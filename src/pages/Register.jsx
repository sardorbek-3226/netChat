import { useState } from "react";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    location: "",
    bio: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = true;
    if (!formData.username.trim()) errors.username = true;
    if (!formData.email.trim()) errors.email = true;
    if (!formData.password.trim()) errors.password = true;

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMessage("Majburiy maydonlarni to'ldiring!");
      return;
    }

    try {
      const res = await axios.post(
        "https://simpledev.duckdns.org/api/auth/register",
        formData
      );

      const userData = res.data.user || res.data;
      const token = res.data.access_token;

      
      if (!token) {
        setErrorMessage("Token olinmadi. Ro'yxatdan o'tishda muammo.");
        return;
      }

      login(userData, token);
      navigate("/home");
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Nomaʼlum xatolik yuz berdi!";
      setErrorMessage(msg);
    }
  };

  const getInputClass = (fieldName) => {
    const baseClass =
      "w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2";
    const errorClass = "border-red-500 focus:border-red-600 focus:ring-red-500";
    const normalClass =
      "border-gray-300 focus:border-blue-600 focus:ring-blue-600";

    return `${baseClass} ${fieldErrors[fieldName] ? errorClass : normalClass}`;
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-purple-800">
      <div className="max-w-lg w-full bg-white/70 backdrop-blur-5xl p-8 rounded-3xl shadow-2xl">
        <h2 className="text-4xl text-center mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-800">
          Ro'yxatdan o'tish
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Ism Familiya"
              value={formData.name}
              onChange={handleChange}
              className={getInputClass("name")}
            />
            {fieldErrors.name && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠️</span>
                Ism familiya talab qilinadi
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="username"
              placeholder="Foydalanuvchi nomi"
              value={formData.username}
              onChange={handleChange}
              className={getInputClass("username")}
            />
            {fieldErrors.username && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠️</span>
                Foydalanuvchi nomi talab qilinadi
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              className={getInputClass("email")}
            />
            {fieldErrors.email && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠️</span>
                Email talab qilinadi
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Parol"
              value={formData.password}
              onChange={handleChange}
              className={getInputClass("password")}
            />
            {fieldErrors.password && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠️</span>
                Parol talab qilinadi
              </p>
            )}
          </div>

          <input
            type="text"
            name="location"
            placeholder="Manzil (masalan: Tashkent, Uzbekistan)"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-blue-600"
          />

          <textarea
            name="bio"
            placeholder="O'zingiz haqingizda qisqacha"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-blue-600"
          />

          <div className="space-y-4">
            <Button
              type="submit"
              variant="destructive"
              className="w-full py-3 rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-gradient-to-l transition-all"
            >
              Ro'yxatdan o'tish
            </Button>

            {errorMessage.message && (
              <p className="text-red-600 text-sm text-center">{errorMessage.message}</p>
            )}
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          Akkauntingiz bormi?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Kirish
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
