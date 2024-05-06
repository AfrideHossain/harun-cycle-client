import React, { useContext, useEffect, useState } from "react";
import {
  UsersIcon,
  UserCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowLeftOnRectangleIcon,
  CurrencyBangladeshiIcon,
  Cog6ToothIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import haruncyclelogo from "../../assets/haruncyclelogo.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, incomeToday } = useContext(AuthContext);
  const logoutHandler = () => {
    Cookies.remove("token");
    window.location.reload();
  };
  return (
    <div className="sticky top-0 z-10 container mx-auto bg-white shadow-lg rounded-lg">
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img
              src={haruncyclelogo}
              className="h-10 w-auto"
              alt="Harun Cycle"
            />
          </Link>
          <div className="hidden md:block ml-4 text-gray-700">
            <h2 className="text-lg font-semibold">Dashboard</h2>
            <p className="text-sm">Manage your clients and products.</p>
          </div>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="block text-gray-700 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
          >
            <span className="sr-only">Open mobile menu</span>
            {isMenuOpen ? (
              <ArrowLeftIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        <nav className="hidden md:flex space-x-8">
          <Link className="flex items-center space-x-2" to="/customers">
            <UserGroupIcon className="h-6 w-6 text-gray-700" />
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Customers</h3>
            </div>
          </Link>
          <div className="flex items-center space-x-2">
            <CurrencyBangladeshiIcon className="h-6 w-6 text-gray-700" />
            <div>
              <h3 className="text-sm font-semibold text-gray-700">
                Today's income
              </h3>
              <p className="text-lg font-bold text-gray-900">
                ৳ {incomeToday} Taka
              </p>
            </div>
          </div>

          <button
            className="bg-blue-500 text-white rounded-full py-2 px-4 flex items-center space-x-2"
            onClick={logoutHandler}
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
            <div>
              <h4 className="text-xs font-medium text-white">
                {user?.username}
              </h4>
              <p className="text-bas font-semibold text-white">Logout</p>
            </div>
          </button>
        </nav>
      </div>
      {isMenuOpen && (
        <div className="md:hidden py-3 px-6 border-t border-gray-200">
          <div className="flex flex-col space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-2 rounded p-2 gap-2">
                <CurrencyBangladeshiIcon className="h-6 w-6 text-gray-700" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 hover:text-gray-900">
                    Today's sell status
                  </h3>
                  <p className="text-lg font-bold text-gray-900">
                    ৳ {incomeToday} Taka
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />
            <button
              className="bg-blue-500 text-white rounded-lg py-2 px-4 flex items-center justify-center space-x-2"
              onClick={logoutHandler}
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-6" />
              <div>
                <h4 className="text-xs font-medium text-white">
                  {user?.username}
                </h4>
                <p className="text-bas font-semibold text-white">Logout</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
