import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { FaPlus, FaPaperPlane, FaSearch, FaTimes } from "react-icons/fa";

const Plan = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "TECHNOLOGY",
  });

  const categories = [
    "TECHNOLOGY",
    "DESIGN",
    "ENTREPRENEURSHIP",
    "MARKETING",
    "EDUCATION",
    "NETWORKING",
  ];

  // ✅ GET - barcha eventlarni olish
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://18.139.0.163:8080/api/events", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setEvents(data.data);
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

  // ✅ POST - yangi event qo‘shish
  const submitEvent = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const isoDate = new Date(`${formData.date}T${formData.time}`).toISOString();

    const payload = {
      title: formData.title,
      description: formData.description,
      date: isoDate,
      time: formData.time,
      location: formData.location,
      category: formData.category,
    };

    fetch("http://18.139.0.163:8080/api/events/create-events", {
      method: "POST",
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
          throw new Error("Tadbir yaratilmadi");
        }
        setEvents((prev) => [...prev, data]);
        setShowModal(false);
        setFormData({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
          category: "TECHNOLOGY",
        });
      })
      .catch((err) => {
        console.error("POST xatolik:", err.message);
        alert("❌ Event yaratilmadi!");
      });
  };

  // 🔍 Qidiruv filteri
  const filteredEvents = events.filter(
    (e) =>
      e.title?.toLowerCase().includes(searchTerm) ||
      e.description?.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      {/* 🔍 Qidiruv + Qo‘shish */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Tadbir qidirish..."
            value={searchTerm}
            onChange={handleSearch}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          <FaPlus /> Yangi Event Qo‘shish
        </button>
      </div>

      {/* ✅ MODAL - Event qo‘shish */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            {/* ❌ Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-red-600"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-semibold mb-4">📝 Yangi Tadbir</h2>

            <form onSubmit={submitEvent} className="grid gap-4">
              <input
                type="text"
                name="title"
                placeholder="Sarlavha"
                value={formData.title}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />
              <textarea
                name="description"
                placeholder="Tavsif"
                value={formData.description}
                onChange={handleChange}
                className="p-2 border rounded"
                rows={3}
                required
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Joylashuv"
                value={formData.location}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              >
                <option value="" disabled>
                  Kategoriya tanlang
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

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

      {/* 🧾 Eventlar Grid ko‘rinishda */}
      {filteredEvents.length === 0 ? (
        <p className="text-gray-500 mt-10">Mos event topilmadi.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Plan;
