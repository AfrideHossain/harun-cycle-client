import React, { useEffect, useState } from "react";
import {
  UserCircleIcon,
  CurrencyBangladeshiIcon,
  UserIcon,
  BanknotesIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import Loading from "../Shared/Loading";
import { Link, useParams } from "react-router-dom";
import History from "../History/History";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const CustomerInfo = () => {
  const [customerPhone, setCustomerPhone] = useState("");
  const [histories, setHistories] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("token");
  const mainUrl = import.meta.env.VITE_BACKURL;
  const { id } = useParams();

  // Search for a client by phone number
  const searchClientHandler = async (phone) => {
    try {
      setLoading(true);
      setError("");
      if (!token) throw new Error("Auth Token not found");

      const response = await fetch(`${mainUrl}/manageclient/client/${phone}`, {
        method: "GET",
        headers: { "auth-token": token },
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error(`User not found with phone number ${phone}`);
      }

      setCustomer(data.client);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch customer details on component mount or when ID changes
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        setLoading(true);
        if (!token) throw new Error("Auth Token not found");

        const response = await fetch(`${mainUrl}/manageclient/client/${id}`, {
          method: "GET",
          headers: { "auth-token": token },
        });
        const data = await response.json();

        setCustomer(data.client);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch customer details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCustomerDetails();
  }, [id, token, mainUrl]);

  // Fetch customer's history and deposits when customer data changes
  useEffect(() => {
    const fetchCustomerHistory = async () => {
      try {
        if (!token || !customer?._id) return;

        const response = await fetch(
          `${mainUrl}/manageclient/customerHistory/${customer._id}`,
          {
            method: "GET",
            headers: { "auth-token": token },
          }
        );
        const data = await response.json();
        // console.log("customer's history -> ", data);

        setHistories(data?.allHistory || []);
        setDeposits(data?.allDeposits || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch customer history.");
      }
    };

    fetchCustomerHistory();
  }, [customer, token, mainUrl]);
  // console.log("Customer's deposit history -> ", deposits);

  return (
    <div className="max-w-screen-2xl mx-auto">
      {loading && <Loading />}
      <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center py-5 md:py-0">
          <div className="px-4 py-5 sm:px-6">
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
              type="tel"
              id="customer-phone"
              className="border-none focus:ring focus:ring-gray-300"
              value={customerPhone}
              placeholder="Customer Phone Number"
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
            <button
              className="bg-gray-700 text-white px-5 py-3 rounded font-bold text-lg cursor-pointer transition duration-300 ease-in-out"
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

        {/* Customer Details */}
        {customer && (
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-gray-600 font-medium">
                  Full Name:
                </dt>
                <dd className="font-semibold text-gray-900">
                  {customer.clientName}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600 font-medium">Phone:</dt>
                <dd className="font-semibold text-gray-900">
                  {customer.clientPhone}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600 font-medium">Address:</dt>
                <dd className="font-semibold text-gray-900">
                  {customer.clientAddress}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600 font-medium">
                  Customer Since:
                </dt>
                <dd className="font-semibold text-gray-900">
                  {customer.joiningDate}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600 font-medium">Due:</dt>
                <dd className="font-bold text-red-500">
                  <CurrencyBangladeshiIcon className="h-5 w-5 inline-block mr-1 -mt-1" />
                  {customer.clientDueAmount}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600 font-medium">
                  Last Transaction:
                </dt>
                <dd className="font-semibold text-gray-900">
                  <CurrencyBangladeshiIcon className="h-5 w-5 inline-block mr-1 -mt-1" />
                  {customer.lastTransactionAmount} on{" "}
                  {customer.lastTransactionDate}
                </dd>
              </div>
            </dl>
          </div>
        )}

        {/* Add Deposit Button */}
        {customer?.clientDueAmount > 0 && (
          <div className="flex justify-end items-center gap-4 px-4 py-3 sm:px-6">
            <Link
              to={`/customerinfoupdate/${customer._id}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <PencilIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Modify
            </Link>
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
          </div>
        )}
      </div>

      {/* History and Deposits */}
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
            {histories.length > 0 ? (
              histories.map((history) => (
                <History key={history._id} history={history} />
              ))
            ) : (
              <p className="text-gray-500 text-center">
                No purchase history available.
              </p>
            )}
          </TabPanel>
          <TabPanel>
            {deposits.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium">
                    <tr>
                      <th className="px-6 py-4 text-center">SL</th>
                      <th className="px-6 py-4 text-center">Date</th>
                      <th className="px-6 py-4 text-center">Type</th>
                      <th className="px-6 py-4 text-center">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deposits.map((deposit, indx) => (
                      <tr className="border-b" key={deposit._id}>
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                          {indx + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-left">
                          {deposit?.date}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center">
                          {deposit?.type}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right font-semibold">
                          {/* <CurrencyBangladeshiIcon className="inline-block w-5 h-5 -mt-1" /> */}
                          {deposit?.amount
                            .toString()
                            .replace(
                              /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                              ","
                            )}{" "}
                          Taka
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                No deposit history available.
              </p>
            )}
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerInfo;
