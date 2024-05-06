import React from "react";

const Footer = () => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mt-4">
      <div className="flex justify-center items-center">
        <div className="max-w-lg flex flex-col justify-center items-center">
          <div className="mb-4 w-fit">
            <h2 className="text-center text-2xl font-bold text-gray-800">
              Stock Management System
            </h2>
            <p className="text-right text-xs">version 1.2.0</p>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-center">
              A Stock management system. Where you can manage your products and
              track your stock. You can make and print invoices with an
              eye-catching design.
            </p>
            <p className="text-sm text-center">
              &copy; 2023 | Designed and Developed by{" "}
              <span className="gradient-text font-semibold">
                <a href="https://afredehossain.netlify.app/" target="_blank">
                  Afrede Hossain
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
