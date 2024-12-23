import React, { useContext } from "react";
import "./CustomerStatement.css";
import { AuthContext } from "../Context/AuthContextProvider";

const CustomerStatement = React.forwardRef((props, ref) => {
  const { customerStatement } = useContext(AuthContext);
  console.log("customerStatement: ", customerStatement);
  return (
    <div ref={ref} className="statement_container">
      <div className="statement_header">
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
          <h2>Customer Statement</h2>
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
      {/* customer Information */}

      <div>
        <div className="customer-info-container">
          <h3 className="text-xl font-bold">Customer Information</h3>
          <div className="customer-info">
            <p>
              <strong>Customer ID:</strong> {customerStatement.customer?._id}
            </p>
            <p>
              <strong>Customer Name:</strong>{" "}
              {customerStatement.customer?.clientName}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {customerStatement.customer?.clientAddress}
            </p>
            <p>
              <strong>Phone:</strong> {customerStatement.customer?.clientPhone}
            </p>
          </div>
        </div>
      </div>
      {/* Invoices tables */}
      <div className="invoice-tables">
        <h2
          style={{
            fontSize: "20pt",
            fontWeight: "600",
            textAlign: "center",
            lineHeight: 2,
          }}
        >
          Purchases History
        </h2>
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Date</th>
              <th>Invoice Number</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {customerStatement?.invoices?.map((invoice, index) => (
              <tr>
                <td>{index + 1}</td>
                <td style={{ textAlign: "left" }}>
                  {new Date(invoice?.date).toLocaleDateString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td>{invoice?.invoiceNumber}</td>
                <td style={{ textAlign: "right" }}>
                  {invoice?.billAmount
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  Taka
                </td>
              </tr>
            ))}
            {/* <tr>
              <td>Date</td>
              <td>Details</td>
              <td>4953</td>
            </tr> */}
          </tbody>
        </table>
      </div>

      <h3>Total Amount: 234534</h3>

      <div className="invoice-tables">
        <h2
          style={{
            fontSize: "20pt",
            fontWeight: "600",
            textAlign: "center",
            lineHeight: 2,
          }}
        >
          Deposits History
        </h2>
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {customerStatement?.deposits?.map((deposit, index) => (
              <tr>
                <td>{index + 1}</td>
                <td style={{ textAlign: "left" }}>
                  {new Date(deposit?.date).toLocaleDateString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td style={{ textAlign: "right" }}>
                  {deposit?.amount
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  Taka
                </td>
              </tr>
            ))}
            {/* <tr>
              <td>Date</td>
              <td>Details</td>
              <td>4953</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default CustomerStatement;
