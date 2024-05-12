import React, { useEffect, useState } from "react";
import {
  UserCircleIcon,
  CurrencyBangladeshiIcon,
  UserIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import Loading from "../Shared/Loading";
import { Link, useLoaderData } from "react-router-dom";
import History from "../History/History";

// import react tabs things
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const CustomerInfo = () => {
  // const [customerId, setCustomerId] = useState("");
  const [customerPhone, setcustomerPhone] = useState("");
  const [histories, setHistories] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const token = Cookies.get("token");
  const mainUrl = import.meta.env.VITE_BACKURL;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const customerInfo = useLoaderData();
  const [customer, setCustomer] = useState(customerInfo || null);

  const searchClientHandler = (phone) => {
    setLoading(true);
    fetch(`${mainUrl}/manageclient/client/${phone}`, {
      method: "GET",
      headers: {
        "auth-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCustomer(data.client);
        } else {
          setError(`User not found with phone number ${phone}`);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKURL}/manageclient/customerHistory/${
        customer?._id
      }`,
      {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setHistories(result.allHistory);
        setDeposits(result.allDiposits);
      });
  }, [customer]);
  return (
    <div className="max-w-screen-2xl mx-auto">
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
              id="customer-pho"
              className="border-none"
              value={customerPhone}
              placeholder="Customer Phone Number"
              onChange={(e) => {
                setcustomerPhone(e.target.value);
              }}
            />
            <button
              className="bg-gray-700 text-white border-none px-5 py-3 rounded font-bold text-lg cursor-pointer transition duration-300 ease-in-out"
              type="button"
              onClick={() => searchClientHandler(customerPhone)}
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
          {customer.clientDueAmount > 0 && (
            <Link
              to={`/depositdues/${customer.clientPhone}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <BanknotesIcon
                className="-ml-1 mr-2 h-5 w-5"
                aria-hidden="true"
              />
              Add Deposit
            </Link>
          )}
        </div>
      </div>
      <h1 className="mt-5 w-fit mx-auto text-lg sm:text-xl text-center font-semibold text-gray-200 items-center border-b py-3 px-8">
        Customer's History
      </h1>
      <div className="bg-white p-4 rounded-lg">
        <Tabs>
          <TabList>
            <Tab>Purchase</Tab>
            <Tab>Deposit</Tab>
          </TabList>

          <TabPanel>
            <div className="space-y divide-y divide-gray-500">
              {histories &&
                histories?.map((history) => (
                  <History key={history._id} history={history} />
                ))}
            </div>
          </TabPanel>
          <TabPanel>
            {deposits.length > 0 ? (
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                          <tr>
                            <th scope="col" className="px-6 py-4 text-center">
                              SL
                            </th>
                            <th scope="col" className="px-6 py-4 text-center">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-4 text-center">
                              Type
                            </th>
                            <th scope="col" className="px-6 py-4 text-center">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {deposits &&
                            deposits?.map((deposit, indx) => (
                              <tr
                                className="border-b dark:border-neutral-500"
                                key={deposit._id}
                              >
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {indx + 1}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {deposit.date}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {deposit.type}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {deposit.amount} Taka
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <h1 className="text-center p-4 text-2xl font-semibold">
                No deposit history found
              </h1>
            )}
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerInfo;
