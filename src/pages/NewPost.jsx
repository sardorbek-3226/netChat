import React, { useEffect, useState } from "react";
import { FaPlus, FaPaperPlane, FaSearch, FaTimes } from "react-icons/fa";

const NewPost = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedPosts, setExpandedPosts] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://simpledev.duckdns.org/api/post/get", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          console.log("POSTLAR:", data.data); // 👈 bu yerga qo‘shing
          setPosts(data.data);
        } else {
          console.error("Kutilmagan format:", data);
        }
      })
      .catch((err) => console.error("GET xatolik:", err));
  }, []);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const toggleExpand = (index) => {
    setExpandedPosts((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const submitPost = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const payload = {
      title: formData.title,
      description: formData.description,
      tags: formData.tags.split(",").map((t) => t.trim()),
    };

    fetch("https://simpledev.duckdns.org/api/post/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error("Post qo‘shilmadi");

        alert("✅ Post qo‘shildi!");
        setPosts((prev) => [...prev, data]);
        setShowModal(false);
        setFormData({ title: "", description: "", tags: "" });
      })
      .catch((err) => {
        console.error("POST xatolik:", err.message);
        alert("❌ Post qo‘shilmadi!");
      });
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchTerm) ||
      p.description?.toLowerCase().includes(searchTerm)
  );


  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    const confirmDelete = window.confirm("Ushbu postni o‘chirmoqchimisiz?");
    if (!confirmDelete) return;
  
    fetch(`https://simpledev.duckdns.org/api/post/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("O‘chirishda xatolik yuz berdi");
        setPosts((prev) => prev.filter((post) => post.id !== id));
        alert("✅ Post muvaffaqiyatli o‘chirildi");
      })
      .catch((err) => {
        console.error("DELETE xatolik:", err);
        alert("❌ Postni o‘chirishda xatolik!");
      });
  };
  


  return (
    <div className="px-4 py-6 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto relative">
          <input
            type="text"
            placeholder="Post qidirish..."
            value={searchTerm}
            onChange={handleSearch}
            className="flex-1 p-2 border w-[600px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 "
          />
          <FaSearch className="text-gray-500 absolute top-3 right-3 text-xl" />
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          <FaPlus /> Yangi Post Qo‘shish
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-red-600"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              📝 Yangi Post Ma’lumotlari
            </h2>

            <form onSubmit={submitPost} className="grid gap-3">
              <input
                type="text"
                name="title"
                placeholder="Post sarlavhasi"
                value={formData.title}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />
              <textarea
                name="description"
                placeholder="Post mazmuni"
                value={formData.description}
                onChange={handleChange}
                className="p-2 border rounded"
                rows={5}
                required
              />
              <input
                type="text"
                name="tags"
                placeholder="Teglar (api, nestjs, prisma)"
                value={formData.tags}
                onChange={handleChange}
                className="p-2 border rounded"
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

      {filteredPosts.length === 0 ? (
        <p className="text-gray-500 mt-10">Mos post topilmadi.</p>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          {filteredPosts.map((post, index) => {
            const isExpanded = expandedPosts.includes(index);
            return (
              <div
                key={index}
                className="border p-4 rounded-lg shadow bg-white w-full "
              >
                <h3 className="text-xl font-bold text-indigo-700 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-700">
                  {isExpanded || post.description.length < 200 ? (
                    post.description
                  ) : (
                    <>
                      {post.description.slice(0, 200)}...
                      <span
                        className="text-blue-500 cursor-pointer ml-1"
                        onClick={() => toggleExpand(index)}
                      >
                        batafsil
                      </span>
                    </>
                  )}
                </p>
                {isExpanded && post.description.length >= 200 && (
                  <span
                    className="text-red-400 cursor-pointer text-sm mt-2 block"
                    onClick={() => toggleExpand(index)}
                  >
                    qisqartirish
                  </span>
                )}
                <div className="flex flex-wrap justify-between mt-3">
                  <div className="flex items-center gap-2 text-gray-500">
                    {post.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="border px-8 py-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:opacity-90 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NewPost;
