import React from "react";
import "./DepositSlip.css";

const DepositSlip = React.forwardRef((props, ref) => {
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
    </div>
  );
});

export default DepositSlip;
