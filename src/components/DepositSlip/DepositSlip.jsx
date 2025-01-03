import React, { useContext, useEffect } from "react";
import "./DepositSlip.css";
import { AuthContext } from "../Context/AuthContextProvider";

const DepositSlip = React.forwardRef((props, ref) => {
  // get deposit slip from context
  const { depositSlip } = useContext(AuthContext);
  // console.log("depositSlip: ", depositSlip);

  useEffect(() => {
    // Inject the @page style dynamically
    const style = document.createElement("style");
    // style.type = "text/css";
    style.textContent = `
      @media print {
        @page {
          size: A4 portrait;
          margin: 0.5cm;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Cleanup the injected style on component unmount
      document.head.removeChild(style);
    };
  }, []);
  return (
    <div ref={ref} className="deposit_slip_container">
      <div className="deposit_slip_header">
        <div className="flex flex-col">
          <h1 className="text-black m-0 p-0">Harun Cycle Store</h1>
          <div className="normal-texts">
            <p>Borogachi Bus Stand, Pangsha, Rajbari</p>
            <p>
              <span>+880 </span>1761748833, <span>+880 </span>1711937175
            </p>
            <p>haruncycle2018@gmail.com</p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <h2>Deposit Receipt</h2>
          <div className="normal-texts">
            <p>
              Issued on{" "}
              {new Date().toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="main-content-container grid grid-cols-2 gap-6">
        {/* Customer Information Section */}
        <div className="customer-info">
          <h3 className="section-title">Customer Information</h3>
          <div className="info-box">
            <p>
              <strong>Customer ID:</strong> {depositSlip.customer?._id || "N/A"}
            </p>
            <p>
              <strong>Name:</strong> {depositSlip.customer?.clientName || "N/A"}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {depositSlip.customer?.clientAddress || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              {depositSlip.customer?.clientPhone || "N/A"}
            </p>
          </div>
        </div>

        {/* Deposit Details Section */}
        <div className="deposit-details">
          <h3 className="section-title">Deposit Details</h3>
          <div className="info-box">
            <p>
              <strong>Date:</strong>{" "}
              {new Date(depositSlip?.date).toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              }) || "N/A"}
            </p>
            <p>
              <strong>Amount:</strong>{" "}
              {depositSlip?.deposit
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") || "N/A"}{" "}
              Taka
            </p>
            <p>
              <strong>Previous Due:</strong>{" "}
              {depositSlip?.customer?.clientDueAmount
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") || "N/A"}{" "}
              Taka
            </p>
            <p>
              <strong>Current Due:</strong>{" "}
              {(depositSlip?.customer?.clientDueAmount - depositSlip?.deposit)
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") || "N/A"}{" "}
              Taka
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer text-center mt-6">
        <p className="text-gray-500 text-sm">
          Thank you for choosing Harun Cycle Store. If you have any questions,
          feel free to contact us.
        </p>
        <p className="text-gray-500 text-xs mt-2">
          © 2024 Harun Cycle Store. All rights reserved.
        </p>
      </div>
      <div></div>
    </div>
  );
});

export default DepositSlip;
