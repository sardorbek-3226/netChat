import React, { useEffect, useState } from "react";
import { FaPlus, FaPaperPlane, FaSearch, FaTimes } from "react-icons/fa";

const Memontor = () => {
  const [tutors, setTutors] = useState([]);
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
      console.log(data.data)
      if (Array.isArray(data.data)) {
        setTutors(data.data);
      } else {
        console.error("Kutilmagan format:", data);
      }
    })
      .catch((err) => console.error("GET xatolik:", err));
  }, []);

  // 🔁 Form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔍 Qidiruv input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // ✅ POST - tutorni yangilash
  const submitEvent = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const payload = {
      username: formData.username
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
        setFormData({
          id: "",
          name: "",
          username: "",
          avatar: "",
          bio: "",
          location: "",
          skills: "",
          tags: "",
        });
      })
      .catch((err) => {
        console.error("POST xatolik:", err.message);
        alert("❌ Tutor yangilanmadi!");
      });
  };

  // 🔍 Qidiruv filteri
  const filteredTutors = tutors.filter(
    (t) =>
      t.name?.toLowerCase().includes(searchTerm) ||
      t.username?.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      {/* 🔍 Qidiruv + Qo‘shish */}
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

      {/* ✅ MODAL - Tutor update */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
            {/* ❌ Close Button */}
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
            <div key={index} className="border p-4 rounded-lg shadow bg-white">
              <img
                src={tutor.avatar}
                alt={tutor.name}
                className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
              />
              <h3 className="text-lg font-semibold text-center">{tutor.name}</h3>
              <p className="text-center text-gray-500">@{tutor.username}</p>
              <p className="mt-2 text-sm text-gray-600">{tutor.bio}</p>
              <p className="text-sm text-gray-500 mt-1">
                📍 {tutor.location}
              </p>
              <p className="text-sm mt-1">
                🛠️ {tutor.skills?.join(", ")}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                🏷️ {tutor.tags?.join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Memontor;
