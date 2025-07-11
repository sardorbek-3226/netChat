import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { Clock, MapPin, Book, CheckCircle } from "react-feather";
import "react-toastify/dist/ReactToastify.css";

const Todo = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const [createdEvents, setCreatedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Token topilmadi!");
      return;
    }

    try {
      const res = await fetch("http://18.139.0.163:8080/api/events/create-events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        const eventData = result.data || result;
        setCreatedEvents((prev) => [...prev, eventData]);
        toast.success("Tadbir yaratildi!");
        reset();
      } else {
        const msg =
          Array.isArray(result.message?.message) ? result.message.message[0] : result.message;
        toast.error(msg || "Xatolik yuz berdi.");
      }
    } catch (err) {
      toast.error("Server bilan ulanishda xato.");
      console.error(err);
    }
  };

  const handleJoin = (event) => {
    setJoinedEvents((prev) => [...prev, event]);
    setCreatedEvents((prev) => prev.filter((e) => e.id !== event.id));
    toast.success("Tadbirga qo‘shildingiz!");
  };

  const renderEventCard = (event, showJoin = false) => (
    <div key={event.id} className="bg-white shadow rounded p-4 border space-y-2">
      <h3 className="text-lg font-semibold text-blue-700">{event.title}</h3>
      <p className="text-gray-600">{event.description}</p>
      <div className="text-sm text-gray-500 grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2">
          <Clock size={16} /> {event.time}
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} /> {event.location}
        </div>
        <div className="flex items-center gap-2">
          <Book size={16} /> {event.category}
        </div>
        <div>📅 {event.date}</div>
      </div>
      {showJoin && (
        <button
          onClick={() => handleJoin(event)}
          className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Qo‘shilish
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">📝 Tadbir Tizimi</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* ✅ QO‘SHISH */}
        <div className="bg-gray-50 rounded-lg shadow p-4">
          <h3 className="text-xl font-bold text-indigo-600 mb-4">➕ Todo Qo‘shish</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <input
              {...register("title", { required: true })}
              className="w-full px-3 py-2 border rounded"
              placeholder="Tadbir nomi"
            />
            <input
              type="date"
              {...register("date", { required: true })}
              className="w-full px-3 py-2 border rounded"
            />
            <textarea
              {...register("description")}
              className="w-full px-3 py-2 border rounded"
              placeholder="Tadbir tavsifi"
            />
            <input
              type="time"
              {...register("time", { required: true })}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              {...register("location", { required: true })}
              className="w-full px-3 py-2 border rounded"
              placeholder="Joylashuv"
            />
            <select
              {...register("category", { required: true })}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Kategoriya tanlang</option>
              <option value="TECHNOLOGY">Texnologiya</option>
              <option value="DESIGN">Dizayn</option>
              <option value="MARKETING">Marketing</option>
              <option value="EDUCATION">Ta'lim</option>
              <option value="NETWORKING">Tarmoq</option>
            </select>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              {isSubmitting ? "⏳ Yuborilmoqda..." : "➕ Yaratish"}
            </button>
          </form>
        </div>

        {/* 🕒 QILINMAGAN TADBIRLAR */}
        <div>
          <h3 className="text-lg font-bold text-gray-700 mb-3">⏳ Tashkil Etilgan Tadbirlar</h3>
          <div className="space-y-4">
            {createdEvents.length > 0 ? (
              createdEvents.map((event) => renderEventCard(event, true))
            ) : (
              <p className="text-sm text-gray-500">Hali tadbir yo‘q.</p>
            )}
          </div>
        </div>

        {/* ✅ QO‘SHILGANLAR */}
        <div>
          <h3 className="text-lg font-bold text-gray-700 mb-3">✅ Qo‘shilgan Tadbirlar</h3>
          <div className="space-y-4">
            {joinedEvents.length > 0 ? (
              joinedEvents.map((event) => renderEventCard(event))
            ) : (
              <p className="text-sm text-gray-500">Hech qanday tadbirga qo‘shilmagansiz.</p>
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Todo;
