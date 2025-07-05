// Vakansiyalar komponenti (React Icons + chiroyli modal dizayni bilan)
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiSearch, FiPlus, FiX, FiSend, FiLoader } from 'react-icons/fi';
import { MdWorkOutline } from 'react-icons/md';

function Vacancies() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    requirements: ''
  });

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const token = localStorage.getItem('token');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://18.139.0.163:8080/api/vacansy/get', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      console.log(res);
      
      const data = await res.json();
      if (Array.isArray(data.data)) setJobs(data.data);
      else if (Array.isArray(data)) setJobs(data);
      else {
        console.error("Noto‘g‘ri formatdagi javob:", data);
        toast.error("❌ Serverdan noto‘g‘ri maʼlumot keldi.");
        setJobs([]);
      }
    } catch (err) {
      console.error('GET xatolik:', err);
      toast.error('❌ Eʼlonlarni olishda xatolik.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.salary || isNaN(Number(formData.salary))) {
      toast.warn("Iltimos, barcha maydonlarni to‘g‘ri to‘ldiring.");
      return;
    }
    const newJob = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      salary: Number(formData.salary),
      requirements: formData.requirements.split(',').map(r => r.trim()).filter(r => r.length > 0),
    };
    setSubmitting(true);
    try {
      const res = await fetch('http://18.139.0.163:8080/api/vacansy/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newJob)
      });
      const result = await res.json();
      if (res.ok) {
        toast.success("✅ Eʼlon muvaffaqiyatli qoʻshildi!");
        setFormData({ title: '', description: '', location: '', salary: '', requirements: '' });
        setIsOpen(false);
        fetchJobs();
      } else {
        console.error("❌ POST xatolik:", result);
        toast.error(`Xatolik: ${result.message || 'So‘rov noto‘g‘ri.'}`);
      }
    } catch (err) {
      console.error('❌ Server xatolik:', err);
      toast.error("❌ Serverga ulanishda muammo.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const s = search.toLowerCase();
    return (
      job.title?.toLowerCase().includes(s) ||
      job.description?.toLowerCase().includes(s) ||
      job.location?.toLowerCase().includes(s) ||
      (Array.isArray(job.requirements)
        ? job.requirements.join(' ').toLowerCase().includes(s)
        : job.requirements?.toLowerCase().includes(s))
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <MdWorkOutline className="text-blue-600 text-3xl" /> Vakansiyalar
      </h1>

      <div className="mb-4 flex gap-2">
        <div className="relative w-full max-w-sm">
          <FiSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full w-[600px] pl-10 pr-4 py-2 border rounded-xl"
          />
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          <FiPlus /> Yangi eʼlon
        </button>
      </div>

      {loading && <p><FiLoader className="inline animate-spin" /> Yuklanmoqda...</p>}

      {filteredJobs.map(job => (
  <div key={job.id} className="bg-white p-6 rounded-xl mb-6 shadow-md hover:shadow-xl transition-all">
    <h3 className="text-2xl font-semibold text-gray-800">{job.title}</h3>
    <p><strong className="font-medium text-gray-700">Tavsif:</strong> {job.description}</p>
    <p><strong className="font-medium text-gray-700">Manzil:</strong> {job.location}</p>
    <p><strong className="font-medium text-gray-700">Maosh:</strong> ${job.salary}</p>
    <p><strong className="font-medium text-gray-700">Talablar:</strong> {Array.isArray(job.requirements) ? job.requirements.join(', ') : job.requirements}</p>
    
    <p className="text-sm text-gray-500 mt-2">
      <span className="font-medium text-gray-700">E'lon qilindi:</span> {new Date(job.createdAt).toLocaleString()}
    </p>

    {/* Murojaat qilish uchun tugma */}
    <div className="mt-4 flex justify-end">
      <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">
        Murojaat qilish
      </button>
    </div>
  </div>
))}


      {!loading && filteredJobs.length === 0 && (
        <p className="text-center text-gray-500">🚫 Eʼlonlar topilmadi.</p>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          <div className="relative z-50 bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl space-y-6">
            <button
              className="absolute top-4 right-4 text-gray-600 text-2xl hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              <FiX />
            </button>
            <h2 className="text-3xl font-semibold text-center text-blue-700">📝 Yangi Vakansiya Qo‘shish</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {['title', 'description', 'location', 'salary', 'requirements'].map((field) => (
                <label key={field} className="block">
                  <span className="text-gray-600 font-medium capitalize">{field}:</span>
                  <input
                    type={field === 'salary' ? 'number' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border rounded-xl focus:ring focus:border-blue-400"
                    required 
                  />
                </label>
              ))}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
              >
                {submitting ? <FiLoader className="animate-spin" /> : <FiSend />} Eʼlon berish
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vacancies;
