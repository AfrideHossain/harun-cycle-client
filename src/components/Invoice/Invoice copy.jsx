import React, { useContext } from "react";
import "./invoice.css";
import { AuthContext } from "../Context/AuthContextProvider";

const Invoice = React.forwardRef((props, ref) => {
  const { invoiceData } = useContext(AuthContext);
  return (
    <>
      <div ref={ref} className="invoice_continer" id="invoice_continer">
        <div className="header">
          <h1>Harun Cycle Store</h1>
          <h2>Invoice</h2>
        </div>

        <div className="date-section">
          <p>
            <strong>Date:</strong> {invoiceData.date}
          </p>
          <p>
            <strong>Invoice No:</strong> {invoiceData.invoiceNumber}
          </p>
        </div>

        <div className="details">
          <div className="client">
            <strong>Invoiced To:</strong>
            <p>
              Customer ID : <span>{invoiceData.clientId}</span>
            </p>
            <p>{invoiceData.fullName}</p>
            <p>{invoiceData.address}</p>
            <p>
              <span>+880 </span>
              {invoiceData.phone}
            </p>
          </div>
          <div className="payto">
            <strong>Pay To:</strong>
            <p>Harun Cycle Store</p>
            <p>Borogachi Bus Stand, Pangsha, Rajbari</p>
            <p>
              <span>+880 </span>1761748833, <span>+880 </span>1971748833
            </p>
            <p>haruncycle2018@gmail.com</p>
          </div>
        </div>

        {invoiceData.purchaseItems ? (
          <table>
            <thead>
              <tr>
                <th className="left-td">Product</th>
                <th className="left-td">Warranty</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.purchaseItems.map((product) => (
                <tr key={product.name}>
                  <td className="left-td">{product.name}</td>
                  <td className="left-td">{product.warranty}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price} Taka</td>
                  <td>{product.quantity * product.price} Taka</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>You have not purchased any products</p>
        )}
        <div className="flex justify-between items-center px-3">
          {invoiceData.paid ? (
            <p className="font-bold text-blue-900 text-5xl ps-10">Paid</p>
          ) : (
            <p className="font-bold text-red-600 text-xl ps-10">
              Due: {Math.abs(invoiceData.currentPayment - invoiceData.total)}{" "}
              Taka
            </p>
          )}
          <div>
            <div className="total mb-5">
              <p>
                <strong>Sub Total:</strong>{" "}
                {Math.abs(invoiceData.due - invoiceData.total)} Taka
              </p>
            </div>

            <div className="total">
              <p>
                <strong>Previous Due:</strong> {invoiceData.due} Taka
              </p>
            </div>

            <div className="total border-b border-black pb-3">
              <p>
                <strong>Grand Total:</strong> {invoiceData.total} Taka
              </p>
            </div>
            <div className="total mt-2">
              <p>
                <strong>Current payment:</strong> {invoiceData.currentPayment}{" "}
                Taka
              </p>
            </div>
          </div>
        </div>

        <div className="signature">
          <p>Signature</p>
        </div>

        <div className="footer">
          <p>
            Thank you for choosing us. We value your trust and look forward to
            serving you again in the future.
          </p>
        </div>
      </div>
    </>
  );
});

export default Invoice;
