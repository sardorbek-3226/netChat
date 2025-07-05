import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaUser,
  FaTag,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://18.139.0.163:8080/api/users/all", {
      method: "GET", // GET so‘rovi
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then((res) => res.json())
      .then((response) => {
        const userList = response.data; // <-- faqat kerakli massivni olish
        if (Array.isArray(userList)) {
          setUsers(userList);
          setFilteredUsers(userList);
        } else {
          console.error("API noto‘g‘ri ma’lumot qaytardi:", response);
          setUsers([]);
          setFilteredUsers([]);
        }
      })
      .catch((err) => console.error("Xatolik:", err));
  }, []);
  

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    const filtered = users.filter((user) => user.tags.includes(tag));
    setFilteredUsers(filtered);
    setSearchTerm("");
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
    setSelectedTag("");
  };

  const clearFilter = () => {
    setSelectedTag("");
    setSearchTerm("");
    setFilteredUsers(users);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Qidiruv */}
      <div className="flex items-center gap-2 mb-6">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Username bo‘yicha qidirish..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        {(searchTerm || selectedTag) && (
          <button
            onClick={clearFilter}
            className="flex items-center gap-1 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            <FaTimes /> Tozalash
          </button>
        )}
      </div>

      {/* Foydalanuvchilar */}
      <div className="grid md:grid-cols-2 gap-6">
        {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-gray-500 flex items-center gap-1">
                    <FaUser /> @{user.username}
                  </p>
                  <p className="text-gray-500 flex items-center gap-1">
                    <FaMapMarkerAlt /> {user.location}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 italic mb-2">"{user.bio}"</p>

              <div className="flex flex-wrap gap-2 mt-2">
                {user.skills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-teal-100 text-teal-800 text-sm px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {user.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    onClick={() => handleTagClick(tag)}
                    className="bg-gray-100 text-gray-800 text-sm hover:bg-teal-600 hover:text-white px-2 py-1 rounded cursor-pointer flex items-center gap-1 transition-all"
                  >
                    <FaTag /> {tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-2 text-center text-gray-500">
            Foydalanuvchi topilmadi.
          </p>
        )}
      </div>
    </div>
  );
};

export default Users;
