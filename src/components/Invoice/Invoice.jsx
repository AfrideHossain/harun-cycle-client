import React, { useContext, useEffect } from "react";
import "./invoice.css";
import { AuthContext } from "../Context/AuthContextProvider";
import { Helmet } from "react-helmet";

const Invoice = React.forwardRef((props, ref) => {
  const { invoiceData } = useContext(AuthContext);
  // useEffect(() => {
  //   document.title = `Harun Cycle Store ${invoiceData.invoiceNumber}`;
  // }, []);
  // setting up page
  useEffect(() => {
    // Inject the @page style dynamically
    const style = document.createElement("style");
    // style.type = "text/css";
    style.textContent = `
      @media print {
        @page {
          size: A5;
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
    <>
      <Helmet>
        <title>Harun Cycle Store {invoiceData.invoiceNumber}</title>
      </Helmet>
      <div ref={ref} className="invoice_continer" id="invoice_continer">
        <div className="header">
          <h1 className="text-black">Harun Cycle Store</h1>
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
            {/* <p>
              <strong>Customer ID :</strong> <span>{invoiceData.clientId}</span>
            </p> */}
            <p className="semibold">{invoiceData.fullName}</p>
            <p>{invoiceData.address}</p>
            <p>
              <span>+880 </span>
              {invoiceData.phone}
            </p>
          </div>
          <div className="payto">
            <strong>Pay To:</strong>
            <p className="semibold">Harun Cycle Store</p>
            <p>Borogachi Bus Stand, Pangsha, Rajbari</p>
            <p>
              <span>+880 </span>1761748833, <span>+880 </span>1711937175
            </p>
            <p>haruncycle2018@gmail.com</p>
          </div>
        </div>

        {invoiceData.purchaseItems ? (
          <table>
            <thead>
              <tr>
                <th className="text-center">SL</th>
                <th className="left-td">Product</th>
                {/* <th className="left-td">Warranty</th> */}
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.purchaseItems.map((product, indx) => (
                <tr key={product.name}>
                  <td className="right-td">{indx + 1}</td>
                  <td className="left-td">{product.name}</td>
                  {/* <td className="left-td">{product.warranty || "N/A"}</td> */}
                  <td>{`${product.quantity} ${product.unit || ""}`}</td>
                  <td className="text-right">
                    {product.price
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    Taka
                  </td>
                  <td className="text-right">
                    {(product.quantity * product.price)
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    Taka
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>You have not purchased any products</p>
        )}
        <div className="flex justify-between items-center px-3">
          {invoiceData.paid ? (
            <p className="font-bold text-blue-900 text-2xl ps-10">Paid</p>
          ) : (
            <p className="font-bold text-red-600 text-lg ps-10">
              Due:{" "}
              {Math.abs(invoiceData.currentPayment - invoiceData.total)
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
              Taka
            </p>
          )}
          <div>
            <div className="total mb-2">
              <p>
                <strong>Sub Total:</strong>{" "}
                {Math.abs(invoiceData.due - invoiceData.total)
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
                Taka
              </p>
            </div>

            <div className="total">
              <p>
                <strong>Previous Due:</strong>{" "}
                {invoiceData.due
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
                Taka
              </p>
            </div>

            <div className="total border-b border-black pb-1">
              <p>
                <strong>Grand Total:</strong>{" "}
                {invoiceData.total
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
                Taka
              </p>
            </div>
            <div className="total mt-1">
              <p>
                <strong>Current payment:</strong>{" "}
                {invoiceData.currentPayment
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
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
