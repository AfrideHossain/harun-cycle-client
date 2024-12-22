import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import CustomerStatement from "./CustomerStatement";
import ReactToPrint from "react-to-print";
import { PrinterIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../Context/AuthContextProvider";

const ContainerCustomerStatement = () => {
  const StatementRef = useRef();
  const { phone } = useParams();
  // states
  const [customer, setCustomer] = useState({});
  const [invoices, setInvoices] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(false);

  // auth token from cookie
  const token = Cookies.get("token");
  // set statement function from context
  const { setCustomerStatement } = useContext(AuthContext);

  // console.log("phone: ", phone);
  // backern url
  const mainUrl = import.meta.env.VITE_BACKURL;

  // fetch customer details
  useEffect(() => {
    const fetchCustomerStatement = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${mainUrl}/manageclient/client/${phone}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );
        const data = await response.json();
        setCustomer(data.client);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchCustomerStatement();
  }, [token]);

  useEffect(() => {
    //   fetch customer's invoices and deposits
    const fetchCustomerHistory = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${mainUrl}/manageclient/customerHistory/${customer?._id}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );
        const data = await response.json();
        setInvoices(data?.allHistory || []);
        setDeposits(data?.allDeposits || []);
        setCustomerStatement({
          customer: customer || {},
          invoices: data?.allHistory || [],
          deposits: data?.allDeposits || [],
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchCustomerHistory();
  }, [customer, token]);
  //   console.log("customer: ", customer);
  //   console.log("invoices: ", invoices);
  //   console.log("deposits: ", deposits);
  return (
    <div>
      {/* Print button */}
      <div className="flex justify-end items-center">
        <ReactToPrint
          trigger={() => (
            <button className="print-button">
              <PrinterIcon className="w-6 h-6" /> Print
            </button>
          )}
          content={() => StatementRef.current}
        />
      </div>
      <div className="mt-5">
        <CustomerStatement ref={StatementRef} />
      </div>
    </div>
  );
};

export default ContainerCustomerStatement;
