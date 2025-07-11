import React from "react";

const plans = [
  {
    name: "Free",
    price: "0",
    features: [
      "10 ta tadbir yaratish",
      "Oddiy statistika ko‘rish",
      "1 foydalanuvchi",
      "Mahalliy yordam",
    ],
    isPopular: false,
  },
  {
    name: "Premium",
    price: "19",
    features: [
      "Cheksiz tadbirlar",
      "Statistika va grafikalar",
      "Jamoa bilan ishlash",
      "24/7 yordam",
      "Qo‘shimcha xususiyatlar",
    ],
    isPopular: true,
  },
];

const PlansPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
        🛠️ Tarif Rejalari
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border rounded-lg shadow-md bg-white p-6 transition transform hover:scale-[1.02] ${
              plan.isPopular ? "border-indigo-600" : "border-gray-300"
            }`}
          >
            {plan.isPopular && (
              <p className="text-sm text-white bg-indigo-600 px-3 py-1 inline-block rounded-full mb-4">
                Eng mashhur
              </p>
            )}
            <h2 className="text-2xl font-semibold mb-2">{plan.name} Reja</h2>
            <p className="text-3xl font-bold text-indigo-700 mb-4">
              ${plan.price}
              <span className="text-sm text-gray-600">/oy</span>
            </p>
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  ✅ <span className="ml-2">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-2 rounded-md text-white font-semibold ${
                plan.isPopular ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-600 hover:bg-gray-700"
              } transition`}
            >
              {plan.isPopular ? "Premiumga o‘tish" : "Bepul boshlash"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlansPage;
