import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import {  MapPin, Clock, Book } from "react-feather";

const CreateEventForm = () => {
  const [createdEvent, setCreatedEvent] = useState(null);

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
      const res = await fetch(
        "http://18.139.0.163:8080/api/events/create-events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (res.ok) {
        toast.success("Tadbir muvaffaqiyatli yaratildi!");
        reset();
        setCreatedEvent(result); // 💾 Yaratilgan tadbirni saqlaymiz
      } else {
        const errors = result.message?.message || ["Noma’lum xato"];
        toast.error(errors.join("\n"));
      }
    } catch (error) {
      toast.error("Server bilan ulanishda xato yuz berdi.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      {/* FORM */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-center mb-6">Yangi Tadbir Qo‘shish</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("title", { required: true })}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Tadbir nomi"
          />
          <textarea
            {...register("description")}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Tadbir tavsifi"
          />
          <input
            type="date"
            {...register("date", { required: true })}
            className="w-full px-4 py-2 border rounded-md"
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
            className="w-full px-4 py-2 border rounded-md"
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
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Yuborilmoqda..." : "Tadbirni Yaratish"}
          </button>
        </form>
      </div>

      {/* CREATED EVENT CARD */}
      {createdEvent && (
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h3 className="text-xl font-bold mb-2">{createdEvent.title}</h3>
          <p className="text-gray-700 mb-2">{createdEvent.description}</p>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            
            {createdEvent.date}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <Clock size={16} />
            {createdEvent.time}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <MapPin size={16} />
            {createdEvent.location}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Book size={16} />
            Kategoriya: {createdEvent.category}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEventForm;
