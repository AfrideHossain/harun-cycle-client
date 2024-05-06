import React, { useContext, useEffect, useState } from "react";
import {
  CurrencyBangladeshiIcon,
  ArrowPathIcon,
  PlusIcon,
  UserIcon,
  DocumentPlusIcon,
  Cog6ToothIcon,
  CubeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
// solid icons
import { EyeIcon } from "@heroicons/react/24/solid";
import Statistics from "../Statistics/Statistics";
import Cookies from "js-cookie";
import { AuthContext } from "../Context/AuthContextProvider";
import { Link } from "react-router-dom";
import Loading from "../Shared/Loading";
import { toast } from "react-toastify";
// import WarningBox from "../Warning/WarningBox";
const Dashboard = () => {
  // const [incomeToday, setIncomeToday] = useState(0);
  const { incomeToday, setIncomeToday } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [logMessage, setLogMessage] = useState("");
  const [todaysBills, setTodaysBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");
  const { user } = useContext(AuthContext);
  const [stockPrice, setStockPrice] = useState(0);

  const fetchIncome = () => {
    setLoading(true);
    const currentDate = new Date();
    let date = currentDate.toDateString();
    let reqUrl = new URL(`${import.meta.env.VITE_BACKURL}/manage/incometoday`);
    reqUrl.searchParams.append("date", date);
    // console.log(reqUrl.toString());
    let fetchIncome = fetch(reqUrl, {
      method: "GET",
      headers: {
        "auth-token": token,
      },
    });
    fetchIncome
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          setIncomeToday(data.totalIncome);
          toast.success(`💸 Chief, Your today's income ৳${data.totalIncome}`);
        } else {
          setIncomeToday(0);
          toast.success(`😓 Sorry Chief, ${data.msg}`);
        }
        setLoading(false);
      });
  };
  const passUpdateHandler = (password) => {
    fetch(`${import.meta.env.VITE_BACKURL}/auth/updatepass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ password, username: user.username }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          toast.success("Password updated, Chief 🫡");
          setLogMessage(`Password updated, chief 🫡`);
        } else {
          toast.error("😓 Sorry chief, failed to update password.");
          setLogMessage(`${data.error}`);
        }
        setPassword("");
      });
  };
  useEffect(() => {
    setLoading(true);
    const currentDate = new Date();
    let date = currentDate.toDateString();
    let reqUrl = new URL(`${import.meta.env.VITE_BACKURL}/manage/billstoday`);
    reqUrl.searchParams.append("date", date);
    // console.log(reqUrl.toString());
    let fetchBills = fetch(reqUrl, {
      method: "GET",
      headers: {
        "auth-token": token,
      },
    });
    fetchBills
      .then((resp) => resp.json())
      .then((data) => {
        let newBills = [];
        data?.allBills?.map((bill) => {
          // console.log(bill);
          newBills.push(bill);
        });
        setTodaysBills(newBills);
        setLoading(false);
      });
    // fetch current stock
    let loadStock = fetch(
      `${import.meta.env.VITE_BACKURL}/manage/allproducts`,
      {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      }
    );
    loadStock
      .then((res) => res.json())
      .then((data) => {
        /* let totalStockValue = 0;
        let fullStock = data.allProducts;
        fullStock.map((stock) => {
          totalStockValue += stock.total_cost;
        });
        // console.log(totalStockValue); */
        setStockPrice(data.stockValue);
      });
  }, []);
  return (
    <div className="container mx-auto">
      {loading && <Loading />}
      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-3 mt-4">
        <div className="bg-white shadow-sm rounded-lg p-4 h-32">
          <div className="flex items-center">
            <div className="flex flex-col justify-center">
              <Cog6ToothIcon className="h-10 w-10 text-gray-500" />
            </div>
            <div className="ml-4">
              <div className="flex items-center p-1 border border-gray-300 rounded text-base font-semibold text-gray-700">
                <input
                  type="text"
                  id="customer-id"
                  className="border-none"
                  value={password}
                  placeholder="Set New Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button
                  className="bg-gray-700 text-white border-none p-2 rounded font-bold text-base cursor-pointer transition duration-300 ease-in-out"
                  type="button"
                  onClick={() => passUpdateHandler(password)}
                >
                  Change
                </button>
              </div>
            </div>
          </div>
          <p className="text-blue-700 mt-2 text-sm">
            <span className="font-semibold">Log:</span>{" "}
            {logMessage || "Change password whenever you feel insecure"}
          </p>
        </div>
        <div className="relative flex items-center bg-white shadow-sm rounded-lg p-4 h-32">
          <div className="flex flex-col justify-center">
            <CubeIcon className="h-10 w-10 text-gray-500" />
          </div>
          <div className="ml-4">
            <div className="text-lg font-medium text-gray-700">
              Current Stock Value
            </div>
            <div className="text-2xl font-semibold text-gray-900">
              ৳ {stockPrice}
            </div>
            <Link className="absolute top-2 right-2" to="/products">
              <EyeIcon className="h-6 w-6 text-blue-500" />
              {/* <BadgeCheckIcon className="h-6 w-6 text-blue-400" /> */}
            </Link>
          </div>
        </div>
        <div className="relative flex items-center bg-white shadow-sm rounded-lg p-4 h-32">
          <div className="flex flex-col justify-center">
            <CurrencyBangladeshiIcon className="h-10 w-10 text-gray-500" />
          </div>
          <div className="ml-4">
            <div className="text-lg font-medium text-gray-700">
              Today's Current Sell Status
            </div>
            <div className="text-2xl font-semibold text-gray-900">
              {incomeToday} Taka
            </div>
          </div>
          <button className="absolute top-2 right-2" onClick={fetchIncome}>
            <ArrowPathIcon className="h-6 w-6 text-blue-400" />
            {/* <BadgeCheckIcon className="h-6 w-6 text-blue-400" /> */}
          </button>
        </div>
      </div>
      {/* Warning box hidden */}
      {/* <div className="bg-white shadow-sm rounded-lg p-4 mt-4 w-full">
        <WarningBox />
      </div> */}
      {/* graph and buttons */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4 xl:grid-cols-4 mt-4">
        {/* graph component */}
        <div className="container col-span-1 md:col-span-3 xl:col-span-3">
          <Statistics bills={todaysBills} />
        </div>
        {/* Buttons */}
        <div className="h-auto grid grid-cols-1 gap-2">
          <Link
            to="/addproduct"
            className="flex items-center bg-white shadow-sm rounded-lg p-4"
          >
            <div className="flex flex-col justify-center">
              <PlusIcon className="h-10 w-10 text-gray-500" />
            </div>
            <div className="ml-4">
              <div className="text-lg font-medium text-gray-700">
                Add New Product
              </div>
              <div className="text-lg font-semibold text-gray-900"></div>
            </div>
          </Link>

          <Link
            to="/customerinfo"
            className="flex items-center bg-white shadow-sm rounded-lg p-4"
          >
            <div className="flex flex-col justify-center">
              <UserIcon className="h-10 w-10 text-gray-500" />
            </div>
            <div className="ml-4">
              <div className="text-lg font-medium text-gray-700">
                View Client Info
              </div>
            </div>
          </Link>

          <Link
            to="/buildinvoice"
            className="flex items-center bg-white shadow-sm rounded-lg p-4"
          >
            <div className="flex flex-col justify-center">
              <DocumentPlusIcon className="h-10 w-10 text-gray-500" />
            </div>
            <div className="ml-4">
              <div className="text-lg font-medium text-gray-700">
                Make An Invoice
              </div>
              <div className="text-lg font-semibold text-gray-900"></div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
