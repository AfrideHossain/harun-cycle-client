import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function CustomerInfoUpdate() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // get token from cookie
  const token = Cookies.get("token");
  // get customer id from params
  const { id: customer_id } = useParams();
  // console.log("customer id: ", customer_id);

  // get customer info by id
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKURL}/manageclient/clientbyid/${customer_id}`,
      {
        method: "GET",
        headers: { "auth-token": token },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result?.client) {
          const client = result?.client;
          setFullName(client?.clientName);
          setPhone(client?.clientPhone);
          setAddress(client?.clientAddress);
        }
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Code to handle submitting updated customer info
    const updateData = {
      clientName: fullName,
      clientPhone: phone,
      clientAddress: address,
    };
    // console.log(updateData);
    fetch(
      `${import.meta.env.VITE_BACKURL}/manageclient/clientbyid/${customer_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(updateData),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (!result.success) {
          toast.error(`${result.msg} 😟`);
        } else {
          toast.success(`${result.msg} 🫡`);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto my-5"
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
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
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
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
          Address
        </label>
        <textarea
          id="address"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-gray-500"
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        >
          Update Info
        </button>
      </div>
    </form>
  );
}

export default CustomerInfoUpdate;
