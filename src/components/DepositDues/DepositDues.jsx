import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const DepositDues = () => {
  const token = Cookies.get("token");
  const mainUrl = import.meta.env.VITE_BACKURL;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const customerInfo = useLoaderData();
  const [customer, setCustomer] = useState(customerInfo || null);
  const [deposit, setDeposit] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqBody = {
      deposit,
      customerId: customer._id,
    };
    fetch(`${mainUrl}/manageclient/deposit`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(reqBody),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Dues deposit successful.",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            setDeposit(0);
          });
        }
      });
  };

  return (
    // <>{console.log(customer)}</>
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto my-5"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="full-name"
        >
          Full Name
        </label>
        <input
          id="full-name"
          type="text"
          placeholder="Enter full name"
          value={customer.clientName}
          //   onChange={(e) => setFullName(e.target.value)}
          readOnly
          className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
          Phone
        </label>
        <input
          id="phone"
          type="text"
          placeholder="Enter phone number"
          value={customer.clientPhone}
          readOnly
          //   onChange={(e) => setPhone(e.target.value)}
          className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
          Address
        </label>
        <input
          id="address"
          placeholder="Enter address"
          value={customer.clientAddress}
          readOnly
          //   onChange={(e) => setAddress(e.target.value)}
          className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="due">
          Due
        </label>
        <input
          id="due"
          type="text"
          placeholder="Enter due amount"
          value={`${customer.clientDueAmount} Taka`}
          //   onChange={(e) => setDue(e.target.value)}
          readOnly
          className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="deposit">
          Deposit Amount
        </label>
        <input
          id="deposit"
          type="number"
          placeholder="Enter deposit amount"
          value={deposit}
          onChange={(e) => setDeposit(e.target.value)}
          className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-gray-500"
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold p-4 rounded-md focus:outline-none focus:shadow-outline"
        >
          Deposit
        </button>
      </div>
    </form>
  );
};

export default DepositDues;
