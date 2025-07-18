import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { FaBars } from "react-icons/fa";

function UserInHeader({ menuOpen, setMenuOpen }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { user, login, logout, email } = useAuth();

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token || user) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("simpledev.duckdns.org/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log(res.data);

      const userData = res.data.user || res.data;
      login(userData);
    } catch (err) {
      console.error("Foydalanuvchini olishda xatolik:", err);

      if (err?.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-[22px] bg-white/60 backdrop-blur-md ">
      <div className="flex items-center gap-5">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-xl text-gray-700 hover:text-purple-600"
        >
          <FaBars />
        </button>

        <Link to="/">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            NetChat
          </span>
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        {loading ? (
          <p className="text-black/70 italic">Yuklanmoqda...</p>
        ) : user ? (
          <>
            {/* <p className="text-black font-semibold">👋 {}</p> */}
      <div className="hidden md:block">
        <p className="text-sm text-gray-600">Email: {email || "Noma'lum"}</p>
      </div>
            <Button onClick={handleLogout} variant="outline">
              Chiqish
            </Button>
          </>
        ) : (
          <Link to="/login">
            <Button variant="outline">Kirish</Button>
          </Link>
        )}
      </div>

    </div>
  );
}

export default UserInHeader;
