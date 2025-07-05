"use client"

import { useState } from "react"

function Profile() {
  const [formData, setFormData] = useState({
    fullName: "Alexa Rawles",
    nickName: "",
    gender: "",
    country: "",
    language: "",
    timeZone: "",
  })

  const [emails] = useState([
    {
      email: "alexarawles@gmail.com",
      addedDate: "1 month ago",
      isPrimary: true,
    },
  ])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border p-8 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Alexa Rawles</h1>
                <p className="text-gray-600">alexarawles@gmail.com</p>
              </div>
            </div>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
              Edit
            </button>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Full Name", name: "fullName", type: "text" },
              { label: "Nick Name", name: "nickName", type: "text" }
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                <input
                  type={type}
                  value={formData[name]}
                  onChange={(e) => handleInputChange(name, e.target.value)}
                  placeholder={`Your ${label}`}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            ))}

            {[
              { label: "Gender", name: "gender", options: ["male", "female", "other"] },
              { label: "Country", name: "country", options: ["uzbekistan", "usa", "uk", "canada"] },
              { label: "Language", name: "language", options: ["english", "uzbek", "russian", "spanish"] },
              { label: "Time Zone", name: "timeZone", options: ["utc+5", "utc-5", "utc+0", "utc+3"] }
            ].map(({ label, name, options }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                <div className="relative">
                  <select
                    value={formData[name]}
                    onChange={(e) => handleInputChange(name, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                  >
                    <option value="">Select {label}</option>
                    {options.map((opt) => (
                      <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Email Addresses Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">My email Address</h3>

            <div className="space-y-3">
              {emails.map((emailItem, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{emailItem.email}</p>
                    <p className="text-sm text-gray-500">{emailItem.addedDate}</p>
                  </div>
                  {emailItem.isPrimary && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                      Primary
                    </span>
                  )}
                </div>
              ))}
            </div>

            <button className="mt-4 flex items-center space-x-2 text-blue-500 hover:text-blue-600 font-medium transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add Email Address</span>
            </button>
          </div>

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-4">
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Cancel
            </button>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
