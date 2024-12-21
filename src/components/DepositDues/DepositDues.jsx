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
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const reqBody = {
      deposit,
      customerId: customer._id,
      date,
    };

    try {
      const response = await fetch(`${mainUrl}/manageclient/deposit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(reqBody),
      });

      const data = await response.json();
      setLoading(false);

      if (data.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Dues deposit successful.",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setDeposit(0);
          setDate("");
        });
      } else {
        setError(data.message || "An error occurred.");
      }
    } catch (err) {
      setLoading(false);
      setError("Failed to deposit. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen text-gray-800 flex items-center justify-center py-10 px-5">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-500">
          Deposit Dues
        </h1>

        {/* Customer and dues information */}
        <div className="mb-6">
          <div className="p-4 bg-gray-100 rounded-lg mb-4 shadow-sm">
            <h2 className="text-xl font-semibold text-blue-500 mb-2">
              Customer Details
            </h2>
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {customer.clientName || "Not Available"}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {customer.clientPhone || "Not Available"}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {customer.clientEmail || "Not Available"}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {customer.clientAddress || "Not Available"}
            </p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg text-center shadow-sm">
            <h2 className="text-xl font-semibold text-blue-500 mb-2">
              Current Due Amount
            </h2>
            <p className="text-3xl font-bold text-green-600">
              {customer.clientDueAmount
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
              TK
            </p>
          </div>
        </div>

        {/* Deposit form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="deposit" className="mb-2 font-medium">
                Deposit Amount
              </label>
              <input
                type="number"
                id="deposit"
                className="bg-gray-100 border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                placeholder="Enter deposit amount"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="date" className="mb-2 font-medium">
                Date
              </label>
              <input
                type="date"
                id="date"
                className="bg-gray-100 border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit Deposit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepositDues;
