import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { MapPin, Clock, Book, CheckCircle } from "react-feather";
import "react-toastify/dist/ReactToastify.css";

const Todo = ({ onAddTask }) => {
  const [createdEvent, setCreatedEvent] = useState(null);
  const [joined, setJoined] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

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
      console.log("Backend javobi:", result); // 👈 Bu yerda tekshiring

      if (res.ok) {
        const eventData = result.data || result; // data ichida bo‘lishi mumkin
        setCreatedEvent(eventData);
        reset();
        setJoined(false);
        toast.success("Tadbir muvaffaqiyatli yaratildi!");
        if (onAddTask) onAddTask(eventData);
      } else {
        const errors = result.message?.message || ["Noma’lum xato"];
        toast.error(errors.join("\n"));
      }
    } catch (error) {
      toast.error("Server bilan ulanishda xato yuz berdi.");
      console.error(error);
    }
  };

  const handleJoinClick = () => {
    setJoined(true);
    toast.success("Siz tadbirga qo‘shildingiz!");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      {/* FORM */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-center mb-6">Yangi Tadbir Qo‘shish</h2>

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
            <option value="">Kategoriya tanlang</option>
            <option value="TECHNOLOGY">Texnologiya</option>
            <option value="DESIGN">Dizayn</option>
            <option value="ENTREPRENEURSHIP">Biznes</option>
            <option value="MARKETING">Marketing</option>
            <option value="EDUCATION">Ta’lim</option>
            <option value="NETWORKING">Tarmoq</option>
          </select>

          <button
            type="submit"
            disabled={isSubmitting}
            className="md:col-span-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Yuborilmoqda..." : "Tadbirni Yaratish"}
          </button>
        </form>
      </div>

      {/* CREATED EVENT */}
      {createdEvent && (
        <div className="bg-white shadow-lg rounded-lg p-6 border space-y-3">
          <h3 className="text-2xl font-bold text-blue-700">{createdEvent.title}</h3>
          <p className="text-gray-700">{createdEvent.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {createdEvent.time}
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              {createdEvent.location}
            </div>
            <div className="flex items-center gap-2">
              <Book size={16} />
              Kategoriya: {createdEvent.category}
            </div>
            <div className="flex items-center gap-2">
              📅 Sana: {createdEvent.date}
            </div>
          </div>

          {/* TADBIRGA QO‘SHILISH TUGMASI */}
          <button
            onClick={handleJoinClick}
            disabled={joined}
            className={`mt-4 px-4 py-2 rounded-md text-white font-semibold transition ${
              joined ? "bg-green-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {joined ? (
              <span className="flex items-center gap-1">
                <CheckCircle size={16} /> Qo‘shildingiz
              </span>
            ) : (
              "Tadbirga Qo‘shilish"
            )}
          </button>
        </div>
      )}

      {/* ToastContainer */}
      <ToastContainer />
    </div>
  );
};

export default Todo;
