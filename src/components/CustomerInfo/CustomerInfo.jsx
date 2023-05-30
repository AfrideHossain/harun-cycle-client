import React, { useContext, useEffect, useState } from "react";
import {
  UserCircleIcon,
  CurrencyBangladeshiIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import Loading from "../Shared/Loading";

const CustomerInfo = () => {
  const [customerId, setCustomerId] = useState("");
  const token = Cookies.get("token");
  const mainUrl = import.meta.env.VITE_BACKURL;
  const [error, setError] = useState("");
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchClientHandler = (id) => {
    setLoading(true);
    fetch(`${mainUrl}/manageclient/client/${id}`, {
      method: "GET",
      headers: {
        "auth-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCustomer(data.client[0]);
        } else {
          setError(`User not found with id ${id}`);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      {loading && <Loading />}
      <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center py-5 md:py-0">
          <div className="px-4 py-5 sm:px-6">
            {/* {loading ? <p>Loading... Please wait</p> : ""} */}
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 flex items-center">
              <UserCircleIcon className="h-6 w-6 text-gray-600 mr-2" />
              Customer Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm sm:text-base text-gray-500">
              Personal details and contact information.
            </p>
          </div>
          <div className="flex items-center p-1 border border-gray-300 rounded text-base font-semibold text-gray-700 mx-4 sm:mx-6">
            <UserIcon className="w-8 mx-2" />
            <input
              type="text"
              id="customer-id"
              className="border-none"
              value={customerId}
              placeholder="Customer id"
              onChange={(e) => {
                setCustomerId(e.target.value);
              }}
            />
            <button
              className="bg-gray-700 text-white border-none px-5 py-3 rounded font-bold text-lg cursor-pointer transition duration-300 ease-in-out"
              type="button"
              onClick={() => searchClientHandler(customerId)}
            >
              Search
            </button>
          </div>
        </div>
        {error && (
          <p className="text-base text-red-600 font-medium form-control">
            {error}
          </p>
        )}
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-gray-600 font-medium">Full Name:</dt>
              <dd className="font-semibold text-gray-900">
                {customer?.clientName}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600 font-medium">Phone:</dt>
              <dd className="font-semibold text-gray-900">
                {customer?.clientPhone}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600 font-medium">Address:</dt>
              <dd className="font-semibold text-gray-900">
                {customer?.clientAddress}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600 font-medium">
                Customer Since:
              </dt>
              <dd className="font-semibold text-gray-900">
                {customer?.joiningDate}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600 font-medium">Due:</dt>
              <dd className="font-bold text-red-500">
                <CurrencyBangladeshiIcon className="h-5 w-5 inline-block mr-1 -mt-1" />
                {customer?.clientDueAmount}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600 font-medium">
                Last Transaction:
              </dt>
              <dd className="font-semibold text-gray-900">
                <CurrencyBangladeshiIcon className="h-5 w-5 inline-block mr-1 -mt-1" />
                {customer?.lastTransactionAmount} on{" "}
                {customer?.lastTransactionDate}
              </dd>
            </div>
          </dl>
        </div>
        <div className="flex justify-end items-center px-4 py-3 sm:px-6">
          {/* <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          <PencilSquareIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Modify
        </button> */}
        </div>
      </div>
    </>
  );
};

export default CustomerInfo;
