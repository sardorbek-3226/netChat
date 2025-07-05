import React from "react";
import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from "react-icons/fa";

const EventCard = ({ event }) => {
  // Sanani "2025-07-09T12:08:00.000Z" -> "9 Iyul, 2025" formatga o‘tkazish
  const formatDate = (iso) => {
    const date = new Date(iso);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("uz-UZ", options);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition-all">
      <h3 className="text-xl font-bold text-indigo-700 mb-2">{event.title}</h3>
      <p className="text-gray-700 mb-3">{event.description}</p>

      <div className="text-sm text-gray-600 space-y-1 mb-3">
        <div className="flex items-center gap-2">
          <FaCalendarAlt /> <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaClock /> <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt /> <span>{event.location}</span>
        </div>
      </div>

      <div className="text-xs px-3 py-1 inline-block bg-indigo-100 text-indigo-700 rounded-full">
        {event.category}
      </div>
    </div>
  );
};

export default EventCard;
