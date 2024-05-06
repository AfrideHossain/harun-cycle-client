import { UserIcon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [customerPhone, setCustomerPhone] = useState("");
  const token = Cookies.get("token");
  const mainUrl = import.meta.env.VITE_BACKURL;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const searchClientHandler = (phone) => {
    setLoading(true);
    fetch(`${mainUrl}/manageclient/searchcustomers?phone=${phone}`, {
      method: "GET",
      headers: {
        "auth-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCustomers(data.allCustomers);
        } else {
          setError(`User not found with phone ${phone}`);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKURL}/manageclient/allcustomers/`, {
      method: "GET",
      headers: {
        "auth-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data.allCustomers);
        setRefetch(false);
      });
    setLoading(false);
  }, [refetch]);

  const handleUserDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "All information (including bills) of this user will be deleted. You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#00b330",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `${import.meta.env.VITE_BACKURL}/manageclient/deletecustomer/${id}`,
          {
            method: "DELETE",
            headers: {
              "auth-token": token,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setRefetch(true);
              Swal.fire("Deleted!", "The user has been deleted.", "success");
            } else {
              Swal.fire("Failed", "Failed to delete the user", "error");
            }
          })
          .catch(() => {
            Swal.fire(
              "Sorry!",
              "Something went wrong, Please try again later. ",
              "warning"
            );
          });
        // Swal.fire("Deleted!", "The user has been deleted.", "success");
      }
    });
  };

  return (
    // Show message if there is no customer
    customers?.length > 0 ? (
      <>
        <div className="mt-6 flex justify-center items-center gap-2 p-1 rounded text-base font-semibold text-gray-700 mx-4 sm:mx-auto bg-slate-300 w-fit">
          <UserIcon className="w-8 mx-2" />
          <input
            type="text"
            id="customer-id"
            className="border-none"
            value={customerPhone}
            placeholder="Search by phone"
            onChange={(e) => {
              setError("");
              setCustomerPhone(e.target.value);
            }}
          />
          <button
            className="bg-sky-600 text-white border-none px-5 py-3 rounded font-bold text-lg cursor-pointer transition duration-300 ease-in-out"
            type="button"
            onClick={() => searchClientHandler(customerPhone)}
          >
            Search
          </button>
        </div>
        {error && (
          <p className="text-base text-red-600 font-medium form-control">
            {error}
          </p>
        )}

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden rounded-md">
                <table className="min-w-full">
                  <thead className="table-header-group bg-white border-b">
                    <tr className="text-center">
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        Customer ID
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        Customer Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        Phone Number
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        Due
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers?.map((customer, indx) => (
                      <tr
                        key={customer._id}
                        className={`${
                          (indx + 1) % 2 === 0 ? "bg-white" : "bg-gray-100"
                        } border-b`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {indx + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {customer._id}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {customer.clientName}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {customer.clientPhone}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {customer.clientAddress}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-right">
                          {customer.clientDueAmount}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <div className="grid md:grid-cols-2 gap-2">
                            <Link
                              to={`/customerinfo/${customer.clientPhone}`}
                              className="font-medium text-white bg-indigo-600 p-2 rounded hover:bg-indigo-500"
                            >
                              View
                            </Link>
                            <button
                              className="btn font-medium text-white bg-red-600 p-2 rounded hover:bg-red-500"
                              onClick={() => handleUserDelete(customer._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 left-0 mt-2 flex justify-center items-center gap-2 p-5 rounded text-sm text-gray-900 mx-4 sm:mx-auto bg-slate-300 bg-opacity-90 w-64">
          <p className="text-justify font-bold">
            After searching customers by phone number if you want to see all
            customer's again. Then please refresh the page.
          </p>
        </div>
      </>
    ) : (
      <div className="h-96 flex justify-center items-center">
        <h1 className="font-bold text-3xl text-center text-gray-300 my-10">
          There is no customer exists
        </h1>
      </div>
    )
  );
};

export default AllCustomers;
