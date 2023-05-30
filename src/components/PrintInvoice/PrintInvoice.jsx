import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import Invoice from "../Invoice/Invoice";
import "../Invoice/invoice.css";
import { PrinterIcon } from "@heroicons/react/24/outline";

const PrintInvoice = () => {
  const InvComponentRef = useRef();
  return (
    <div>
      <div className="mt-5">
        <Invoice ref={InvComponentRef} />
      </div>
      {/* Print button */}
      <div className="flex justify-end items-center">
        <ReactToPrint
          trigger={() => (
            <button className="print-button">
              <PrinterIcon className="w-6 h-6" /> Print
            </button>
          )}
          content={() => InvComponentRef.current}
        />
      </div>
    </div>
  );
};

export default PrintInvoice;
