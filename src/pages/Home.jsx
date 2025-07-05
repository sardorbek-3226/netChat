// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import {
  FaHome,
  FaComments,
  FaPlusSquare,
  FaUserFriends,
  FaRegCalendarAlt,
  FaChalkboardTeacher,
  FaBriefcase,
  FaTasks,
  FaUserCircle
} from 'react-icons/fa';
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { Link } from 'react-router-dom';

// 🟪 Sahifalar
import NetChatLanding from '../components/NetChatLanding';
import Mentors from './Mentors';
import Messages from './ChatApp';
import Plan from './Plan';
import Profile from './Profile';
import Vacancies from './Vacancies';
import Users from './Users';
import NewPost from './NewPost';
import Head from './Head';
import ToLessonCard from './ToLessonCard';
import Todo from '../pages/Todo'
// 🟦 Header komponent
import UserInHeader from '../components/userInHeader';

function Home() {
  const [activePage, setActivePage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const savedPage = localStorage.getItem('activePage');
    if (savedPage) {
      setActivePage(savedPage);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setMenuOpen(!mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (key) => {
    setActivePage(key);
    localStorage.setItem('activePage', key);
    if (isMobile) setMenuOpen(false);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'head': return <Head />;
      case 'messages': return <Messages />;
      case 'newpost': return <NewPost />;
      case 'users': return <Users />;
      case 'events': return <Plan />;
      case 'mentors': return <Mentors />;
      case 'vacancies': return <Vacancies />;
      case 'plan': return <Plan />;
      case 'profile': return <Profile />;
      case 'todo': return <Todo />; // ✅ BU ISHLAYDI ENDI
      case 'toLessons': return <ToLessonCard />;
      case 'home':
      default: return <NetChatLanding />;
    }
  };

  const navItems = [
    { key: 'home', icon: <FaHome />, label: 'Bosh Sahifa' },
    { key: 'messages', icon: <FaComments />, label: 'Xabarlar' },
    { key: 'newpost', icon: <FaPlusSquare />, label: 'Posts' },
    { key: 'users', icon: <FaUserFriends />, label: 'Foydalanuvchilar' },
    { key: 'events', icon: <FaRegCalendarAlt />, label: 'Tadbirlar' },
    { key: 'mentors', icon: <FaChalkboardTeacher />, label: 'Mentorlar' },
    { key: 'vacancies', icon: <FaBriefcase />, label: 'Vakansiyalar' },
    { key: 'plan', icon: <FaTasks />, label: 'Plan' },
    { key: 'todo', icon: <FaTasks />, label: 'Todo' },
    { key: 'toLessons', icon: <FaChalkboardTeacher />, label: 'Darsliklar' },
    { key: 'profile', icon: <FaUserCircle />, label: 'Profil' },
  ];

  const linkClass = (page) =>
    `group flex items-center justify-center gap-3 pl-[8px] py-[8px] rounded-xl transition-all duration-300 cursor-pointer
     ${activePage === page
      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white scale-[1.02]'
      : 'hover:bg-gradient-to-r from-purple-100 to-pink-100 text-gray-700 hover:scale-[1.02]'}
     ${menuOpen && !isMobile ? 'justify-start' : 'justify-center'}`;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-purple-50 h-[calc(20vh--550px)]">
      {isMobile ? (
        <div className="flex items-center justify-between p-4 bg-white shadow-md fixed top-0 left-0 right-0 z-30">
          <div className="flex items-center gap-3">
            <Link className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <img className="w-5 h-5 text-white" width="24" height="24" src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/speech-bubble--v1.png" alt="speech-bubble" />
            </Link>
            <span className="text-[22px] font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Netchat</span>
          </div>
          <button
            onClick={() => setMenuOpen(true)}
            className="text-2xl font-bold text-purple-600"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      ) : (
        <UserInHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      )}

      <div className="relative">
        <div
          className={`bg-white z-40 shadow-lg transition-all duration-500 ease-in-out
          ${isMobile
            ? `fixed top-0 left-0 w-full h-[80vh] border-b 
               ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`
            : `fixed top-[72px] left-0 h-[calc(100vh-72px)] 
               ${menuOpen ? 'w-64' : 'w-20'}`}`}
        >
          {isMobile && menuOpen && (
            <div className="flex justify-end p-2">
              <button onClick={() => setMenuOpen(false)} className="text-xl font-bold">
                ✕
              </button>
            </div>
          )}

          <nav className="flex flex-col gap-2 p-2 pt-2 overflow-y-auto h-full">
            {navItems.map(({ key, icon, label }) => (
              <div
                key={key}
                onClick={() => handleNavClick(key)}
                className={linkClass(key)}
                title={!menuOpen && !isMobile ? label : ''}
              >
                <span className="text-lg">{icon}</span>
                <span className={`
                  text-sm font-semibold transition-all duration-200
                  ${menuOpen || isMobile ? 'opacity-100 ml-2' : 'opacity-0 w-0 overflow-hidden'}
                `}>
                  {label}
                </span>
              </div>
            ))}
          </nav>
        </div>

        <div
          className="transition-all duration-300"
          style={{
            paddingLeft: !isMobile ? (menuOpen ? '16rem' : '5rem') : 0,
            paddingTop: isMobile ? '60px' : '72px',
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Home;
