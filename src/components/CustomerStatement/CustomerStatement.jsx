import React from "react";
import "./CustomerStatement.css";

const CustomerStatement = React.forwardRef((props, ref) => {
  const { customer, invoices, deposits } = props;
  console.log("customer: ", customer);
  console.log("invoices: ", invoices);
  console.log("deposits: ", deposits);
  return (
    <div ref={ref} className="statement_container">
      <div className="statement_header">
        <div className="flex flex-col">
          <h1 className="text-black m-0 p-0">Harun Cycle Store</h1>
          <p className="text-xs">Borogachi Bus Stand, Pangsha, Rajbari</p>
          <p className="text-xs">
            <span>+880 </span>1761748833, <span>+880 </span>1711937175
          </p>
          <p className="text-xs">haruncycle2018@gmail.com</p>
        </div>
        <h2>Customer Statement</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Details</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Date</td>
            <td>Details</td>
            <td>4953</td>
          </tr>
        </tbody>
      </table>
      <h3>Total Amount: 234534</h3>
    </div>
  );
});

export default CustomerStatement;
