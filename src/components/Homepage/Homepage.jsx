import React from "react";

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900">
          Stock Management Web App
        </h1>
        <p className="mt-4 text-gray-500">
          Welcome to our stock management web app. You can use this app to
          manage your inventory and track your stock levels.
        </p>
        <div className="mt-8">
          <a
            href="#"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
