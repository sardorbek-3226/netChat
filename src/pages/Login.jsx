import { useState } from "react";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [pas, setPas] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://18.139.0.163:8080/api/auth/login",
        { email, password: pas },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const userData = res.data.user || res.data;
      const token = res.data.access_token;

      if (!token) {
        alert("Token olinmadi. Iltimos, qaytadan urinib ko‘ring.");
        return;
      }

      console.log("Logindan kelgan user:", userData);

      login(userData, token);

      alert("Tizimga muvaffaqiyatli kirdingiz!");
      navigate("/home");
    } catch (error) {
      if (error.response?.data?.message) {
        alert(`Xatolik: ${error.response.data.message}`);
      } else {
        alert("Serverga ulanib bo‘lmadi. Internet yoki serverni tekshiring.");
      }
      console.error("Login xatolik:", error);
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-pink-300 bg-center"
      
    >
      <div className="max-w-[500px] w-full bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl text-center mb-6 font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Kirish
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Parol
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Parolingiz"
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="current-password"
              required
              value={pas}
              onChange={(e) => setPas(e.target.value)}
            />
          </div>

          <Button type="submit" variant="destructive" className="w-full py-3 rounded-xl font-semibold">
            Kirish
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          Ro'yxatdan o'tmaganmisiz?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Ro'yxatdan o'tish
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
