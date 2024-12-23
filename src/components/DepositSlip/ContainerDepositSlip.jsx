import React, { useRef } from 'react'
import DepositSlip from './DepositSlip';
import ReactToPrint from 'react-to-print';
import { PrinterIcon } from '@heroicons/react/24/outline';

const ContainerDepositSlip = () => {
    const DepositSlipRef = useRef();
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
          content={() => DepositSlipRef.current}
        />
      </div>
      <div className="mt-5">
        <DepositSlip ref={DepositSlipRef} />
      </div>
    </div>
  );
}

export default ContainerDepositSlip