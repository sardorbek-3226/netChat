import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { MapPin, Clock, Book, X } from "react-feather";
import { FaSearch } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const CreateEventModalPage = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  // ✅ GET: Tadbirlarni olish
  const fetchEvents = async () => {
    console.log("🚀 fetchEvents called");

    const token = localStorage.getItem("token");
    console.log("🎟️ Token:", token);

    if (!token) return toast.error("Token topilmadi!");

    try {
      const res = await fetch("http://13.250.48.172:8080/api/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("🌐 GET status:", res.status);
      const result = await res.json();
      console.log("📥 Raw response:", JSON.stringify(result));

      if (res.ok && result.success) {
        setEvents(result.data);
        console.log("✅ GET OK, data:", result);
      } else {
        toast.error("❌ Tadbirlarni olishda xatolik.");
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      toast.error("❌ Server bilan ulanishda muammo.");
    }
  };

  // ✅ POST: Yangi tadbir yaratish
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("❌ Token topilmadi!");
      return;
    }

    try {
      const res = await fetch("http://13.250.48.172:8080/api/events/create-events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("✅ Tadbir muvaffaqiyatli yaratildi!");
        reset();
        setShowModal(false);
        fetchEvents();
      } else {
        const errMsg =
          typeof result.message === "string"
            ? result.message
            : Array.isArray(result.message?.message)
            ? result.message.message[0]
            : "❌ Xatolik yuz berdi.";
        toast.error(errMsg);
      }
    } catch (err) {
      console.error("❌ POST xatosi:", err);
      toast.error("❌ Server bilan ulanishda xatolik.");
    }
  };

  // ⏱ On first load
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      {/* Modal tugmasi */}
      <div className="text-center">
        <div className="flex items-center justify-between relative ">
          <input type="text" className="border rounded-xl w-150 py-1 px-10  placeholder:text-black/70 font-semibold text-xl" placeholder="Search "/>
          <FaSearch className="absolute left-4  top-4 text-gray-500"  />
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
        >
          ➕ Yangi Tadbir Qo‘shish
        </button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-red-600 hover:text-red-800"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
              🗓️ Yangi Tadbir Qo‘shish
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4">
              <input
                {...register("title", { required: true })}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Tadbir nomi"
              />
              <input
                type="date"
                {...register("date", { required: true })}
                className="w-full px-4 py-2 border rounded-md"
              />
              <textarea
                {...register("description")}
                className="w-full md:col-span-2 px-4 py-2 border rounded-md"
                placeholder="Tadbir tavsifi"
              />
              <input
                type="time"
                {...register("time", { required: true })}
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                {...register("location", { required: true })}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Joylashuv"
              />
              <select
                {...register("category", { required: true })}
                className="w-full md:col-span-2 px-4 py-2 border rounded-md"
              >
                <option value="">📂 Kategoriya tanlang</option>
                <option value="TECHNOLOGY">⚙️ Texnologiya</option>
                <option value="DESIGN">🎨 Dizayn</option>
                <option value="ENTREPRENEURSHIP">💼 Biznes</option>
                <option value="MARKETING">📈 Marketing</option>
                <option value="EDUCATION">📚 Ta’lim</option>
                <option value="NETWORKING">🌐 Tarmoq</option>
              </select>

              <button
                type="submit"
                disabled={isSubmitting}
                className="md:col-span-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                {isSubmitting ? "⏳ Yuborilmoqda..." : "➕ Tadbirni Yaratish"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Barcha tadbirlar ro‘yxati */}
      {events.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
            📅 Barcha Tadbirlar
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white border rounded-md shadow-md p-4 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-blue-700">{event.title}</h3>
                <p className="text-gray-700 mt-1">{event.description}</p>

                <div className="mt-3 text-sm text-gray-600 space-y-1">
                  <p><Clock size={16} className="inline mr-1" /> {event.time}</p>
                  <p><MapPin size={16} className="inline mr-1" /> {event.location}</p>
                  <p><Book size={16} className="inline mr-1" /> {event.category}</p>
                  <p>📅 {event.date}</p>
                  <p>👤 {event.organizer?.name || "Noma'lum tashkilotchi"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default CreateEventModalPage;
