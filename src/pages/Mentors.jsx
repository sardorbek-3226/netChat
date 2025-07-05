import React, { useEffect, useState } from "react";
import { FaPlus, FaPaperPlane, FaSearch, FaTimes, FaLink } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Memontor = () => {
  const [tutors, setTutors] = useState([]);
  const [connectedTutors, setConnectedTutors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    username: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://18.139.0.163:8080/api/tutor/get-all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setTutors(data.data);
        } else {
          console.error("Kutilmagan format:", data);
        }
      })
      .catch((err) => console.error("GET xatolik:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const submitEvent = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const payload = {
      username: formData.username,
    };

    fetch(`http://18.139.0.163:8080/api/tutor/update/${formData.username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          console.error("Xatolik:", data);
          throw new Error("Tutor yangilanmadi");
        }

        alert("✅ Tutor yangilandi!");
        setTutors((prev) => [...prev, data]);
        setShowModal(false);
        setFormData({ username: "" });
      })
      .catch((err) => {
        console.error("POST xatolik:", err.message);
        alert("❌ Tutor yangilanmadi!");
      });
  };

  const filteredTutors = tutors.filter(
    (t) =>
      t.name?.toLowerCase().includes(searchTerm) ||
      t.username?.toLowerCase().includes(searchTerm)
  );

  const handleConnect = (username) => {
    setConnectedTutors((prev) => ({ ...prev, [username]: true }));
    toast.success(`Siz ${username} bilan bog‘landingiz!`);
  };

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Tutor qidirish..."
            value={searchTerm}
            onChange={handleSearch}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          <FaPlus /> Tutorni Yangilash
        </button>
      </div>

      {/* ✅ MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-red-600"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-semibold mb-4">📝 Tutor Ma’lumotlari</h2>

            <form onSubmit={submitEvent} className="grid gap-3">
              <input
                type="text"
                name="username"
                placeholder="Foydalanuvchi nomi"
                value={formData.username}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />

              <button
                type="submit"
                className="bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center gap-2 justify-center"
              >
                <FaPaperPlane /> Yuborish
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 🧾 Tutorlar ro‘yxati */}
      {filteredTutors.length === 0 ? (
        <p className="text-gray-500 mt-10">Mos tutor topilmadi.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.map((tutor, index) => (
            <div key={index} className="border p-4 rounded-lg shadow space-y-2 bg-white">
              <img
                src="/image.png"
                className="rounded-3xl object-cover aspect-square w-[220px] mx-auto p-3"
                alt="avatar"
              />
              <div className="flex items-center gap-5 justify-center">
                <h3 className="text-xl font-semibold text-center">{tutor.name}</h3>
                <p className="text-center text-xl text-gray-500">@{tutor.username}</p>
              </div>
              <p className="mt-2 text-lg font-bold text-gray-600">{tutor.bio}</p>
              <p className="text-sm text-black/60 mt-1">{tutor.location}</p>
              <p className="text-md mt-1">{tutor.skills?.join(", ")}</p>
              <p className="text-md text-gray-800 mt-1">
                🏷️ {tutor.tags?.join(", ")}
              </p>

              {/* ✅ Bog‘lanish tugmasi */}
              <button
                onClick={() => handleConnect(tutor.username)}
                disabled={connectedTutors[tutor.username]}
                className={`w-full mt-2 py-2 rounded-md font-semibold transition-all flex items-center justify-center gap-2 ${
                  connectedTutors[tutor.username]
                    ? "bg-green-600 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <FaLink />
                {connectedTutors[tutor.username] ? "Bog‘lanildi" : "Bog‘lanish"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Toast */}
      <ToastContainer />
    </div>
  );
};

export default Memontor;
