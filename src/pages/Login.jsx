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
        "https://simpledev.duckdns.org/api/auth/login",
        { email, password: pas },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );

      const userData = res.data.user || res.data;
      const token = res.data.access_token;

      if (!token) {
        alert("Token olinmadi. Iltimos, qaytadan urinib ko‘ring.");
        return;
      }

      localStorage.setItem("token", token);
      console.log("Logindan kelgan user:", userData);

      login(userData, token, email);
      console.log("Saqlangan token:", localStorage.getItem("token"));
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
      className="h-screen w-full flex items-center justify-center 
      bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] 
      bg-no-repeat bg-cover"
    >
      <div className="max-w-[480px] w-full bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-4xl text-center mb-6 font-bold 
        bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          NetChat Kirish
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-3 border border-white/30 bg-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-white/60"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80">
              Parol
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Parolingiz"
              className="w-full mt-1 px-4 py-3 border border-white/30 bg-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-white/60"
              autoComplete="current-password"
              required
              value={pas}
              onChange={(e) => setPas(e.target.value)}
            />
          </div>

          <Button type="submit" variant="default" className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
            Kirish
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-white/80">
          Ro'yxatdan o'tmaganmisiz?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Ro'yxatdan o'tish
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
