import React from "react";
import { FaRegHeart, FaRegCommentDots, FaShareSquare } from "react-icons/fa";

const ProfilePost = () => {
  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-5 mt-10">
      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full" />
        <div>
          <h2 className="font-semibold text-lg">Aziza Karimova</h2>
          <p className="text-gray-500 text-sm">Frontend Developer · 30 daqiqa oldin</p>
        </div>
      </div>

      {/* Post Text */}
      <p className="mt-4 text-gray-800 leading-relaxed">
        Yangi React loyiham ustida ishlayapman! 🚀 TypeScript va Next.js dan
        foydalanmoqdaman. Kimda tajriba bor, maslahat bering!
      </p>

      {/* Tags */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {["#React", "#TypeScript", "#Frontend"].map((tag) => (
          <span
            key={tag}
            className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Image Placeholder */}
      <div className="mt-4 bg-gray-100 rounded-xl h-64 flex items-center justify-center">
        <span className="text-gray-400 text-sm">Rasm yuklanmagan</span>
      </div>

      {/* Footer Stats */}
      <div className="flex justify-between items-center text-gray-500 text-sm mt-4">
        <span>24 like</span>
        <span>8 izoh</span>
        <span>3 ulashish</span>
      </div>

      {/* Action Icons */}
      <div className="border-t mt-4 pt-3 flex justify-around text-sm text-gray-600">
        <button className="flex items-center gap-1 hover:text-red-500">
          <FaRegHeart /> Like
        </button>
        <button className="flex items-center gap-1 hover:text-blue-500">
          <FaRegCommentDots /> Izoh
        </button>
        <button className="flex items-center gap-1 hover:text-green-500">
          <FaShareSquare /> Ulashish
        </button>
      </div>
    </div>
  );
};

export default ProfilePost;
