import React, { useState, useEffect } from "react";

const API_CHAT = "http://18.139.0.163:8080/api/groq/chat";
const API_HISTORY = "http://18.139.0.163:8080/api/groq/chat-ai/ansquery";

const users = [{ id: 1, name: "User" }];
const STORAGE_KEY = "chat_history_user_1";

const ChatApp = () => {
  const [selectedUser] = useState(users[0]);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedMessages = localStorage.getItem(STORAGE_KEY);
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch {
        fetchHistory();
      }
    } else {
      fetchHistory();
    }
  }, []);

  const fetchHistory = async () => {
    try {
      setError(null);
      const url = new URL(API_HISTORY);
      url.searchParams.append("userId", selectedUser.id);

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Server javobi xato holatda: ${errText}`);
      }

      const data = await res.json();
      console.log(data);
      
      if (Array.isArray(data)) {
        const msgs = [];
        data.forEach((item) => {
          msgs.push({ id: item.id + "_q", text: item.question, sender: "me", timestamp: item.createdAt });
          msgs.push({ id: item.id + "_a", text: item.answer, sender: "other", timestamp: item.createdAt });
        });
        setMessages(msgs);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
      } else {
        setMessages([]);
        console.warn("⚠️ API javobi array emas");
      }
    } catch (err) {
      setError("Xabarlar tarixini yuklashda xatolik");
      console.error(err.message);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const messageText = inputText.trim();
    setInputText("");
    setLoading(true);
    setError(null);

    const tempMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: "me",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => {
      const updated = [...prev, tempMessage];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    try {
      const res = await fetch(API_CHAT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ prompt: messageText, userId: selectedUser.id }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Yuborishda xatolik: ${text}`);
      }

      const result = await res.json();

      if (result.answer) {
        setMessages((prev) => {
          const updated = [...prev, {
            id: Date.now().toString() + "_ans",
            text: result.answer,
            sender: "other",
            timestamp: new Date().toISOString(),
          }];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          return updated;
        });
      }
    } catch (err) {
      setError("Xabar yuborishda xatolik yuz berdi");
      setMessages((prev) => {
        const updated = prev.filter((msg) => msg.id !== tempMessage.id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full h-screen flex font-sans bg-gray-100">
      {/* CHATS */}
      <div className="w-1/4 bg-white border-r shadow-md">
        <div className="p-4 font-bold text-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          💬 Foydalanuvchilar
        </div>
        <div className="overflow-y-auto h-[calc(100%-64px)]">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 border-b bg-blue-50 hover:bg-blue-100 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold text-gray-800">{user.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
  
      {/* CHAT BODY */}
      <div className="w-3/4 flex flex-col">
        <div className="p-4 bg-white border-b shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
            {selectedUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-800">{selectedUser.name}</h2>
            <p className="text-sm text-green-500">🟢 Online</p>
          </div>
        </div>
  
        {error && (
          <div className="p-3 bg-red-100 text-red-700 text-sm border border-red-300">
            ⚠️ {error}
          </div>
        )}
  
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-md px-4 py-2 rounded-lg shadow-sm text-sm ${
                  msg.sender === "me"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none border"
                }`}
              >
                <p>{msg.text}</p>
                <div className="text-xs mt-1 text-right opacity-60">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
  
          {loading && (
            <div className="flex justify-end">
              <div className="bg-blue-400 text-white px-4 py-2 rounded-lg text-sm animate-pulse">
                Yuborilmoqda...
              </div>
            </div>
          )}
        </div>
  
        {/* INPUT BAR */}
<div className="bg-white border-t shadow-sm fixed bottom-0 left-1/4 w-3/4 p-4 z-10">
  <div className="flex gap-2">
    <input
      type="text"
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      onKeyDown={handleKeyPress}
      placeholder="✍️ Xabar yozing..."
      disabled={loading}
      className="flex-1 border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
    />
    <button
      onClick={sendMessage}
      disabled={loading || !inputText.trim()}
      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
    >
      🚀 Yuborish
    </button>
  </div>
</div>

      </div>
    </div>
  );
  
};

export default ChatApp;
