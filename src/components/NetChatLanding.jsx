// components/NetChatLanding.jsx
import React, { useState } from "react";

function NetChatLanding() {
  const [showNotification, setShowNotification] = useState(true);

  const stats = [
    {
      title: "Active Events",
      value: "24",
      change: "+3 from last week",
      icon: "📅",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Network Size",
      value: "1,234",
      change: "+12% from last month",
      icon: "👥",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Job Opportunities",
      value: "89",
      change: "+7 new this week",
      icon: "💼",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Messages",
      value: "156",
      change: "+23 unread",
      icon: "💬",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const features = [
    {
      icon: "📅",
      title: "Networking Events",
      description: "Discover and join professional events in your area",
      details: "Connect with like-minded professionals at conferences, workshops, and meetups.",
      buttonText: "Browse Events",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: "💬",
      title: "Professional Chat",
      description: "Communicate with your network in real-time",
      details: "Stay connected with direct messages and group conversations.",
      buttonText: "Start Chatting",
      color: "from-green-500 to-green-600",
    },
    {
      icon: "💼",
      title: "Job Opportunities",
      description: "Find your next career opportunity",
      details: "Explore job listings from top companies in your industry.",
      buttonText: "View Jobs",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: "👥",
      title: "Expand Network",
      description: "Connect with industry professionals",
      details: "Build meaningful professional relationships and grow your network.",
      buttonText: "Connect Now",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: "📊",
      title: "Industry Insights",
      description: "Stay updated with industry trends",
      details: "Read posts and articles from thought leaders in your field.",
      buttonText: "Read Insights",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: "⭐",
      title: "Premium Features",
      description: "Unlock advanced networking tools",
      details: "Get access to premium features and enhanced networking capabilities.",
      buttonText: "Upgrade Now",
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Notification Popup */}
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent mb-6">
            Welcome to NetChat
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your professional networking platform for connecting with industry peers, discovering events, and finding
            career opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
            <button className="px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Explore Events
            </button>
            <button className="px-8 py-4 bg-white text-gray-800 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Find Connections
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.title}</div>
                </div>
              </div>
              <div className="text-sm text-green-600 font-medium">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                <p className="text-sm text-gray-500 mb-6">{feature.details}</p>
              </div>
              <button className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-black group-hover:text-white">
                {feature.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="text-4xl font-bold mb-4">Ready to expand your network?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are already building meaningful connections on NetChat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get Started Free
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-800 mb-4">NetChat</h3>
              <p className="text-gray-600 text-sm">Professional networking made simple and effective.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-800 transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-gray-800 transition-colors">Jobs</a></li>
                <li><a href="#" className="hover:text-gray-800 transition-colors">Networking</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-800 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-gray-800 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-gray-800 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-800 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-800 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-800 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-200">
            © 2024 NetChat. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}

export default NetChatLanding;
