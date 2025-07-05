import React from "react";

function ToLessonCard() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)] px-4 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-md w-full text-center border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          🎓 Bizning Tekin Darsliklar
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Biz sizga samarali o'rganishingiz uchun bepul onlayn darsliklar
          platformasini taklif qilamiz.
        </p>
        <a
          href="https://www.sammi.ac/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition"
        >
          Ko‘rish →
        </a>
      </div>
    </div>
  );
}

export default ToLessonCard;
