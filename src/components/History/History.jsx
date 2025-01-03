import React from "react";
import { CurrencyBangladeshiIcon } from "@heroicons/react/24/outline";

const History = ({ history }) => {
  const { _id, date, invoiceNumber, clientName, billAmount, purchaseItems } =
    history;
  return (
    <div className="container relative flex flex-col gap-4 p-6">
      <div className="w-full">
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between">
          <h1 className="text-[#474747] font-extrabold text-2xl mb-2 text-left">
            {new Date(date).toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </h1>
          <p className="gradient-text font-extrabold">{invoiceNumber}</p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between md:gap-5">
          <p className="text-orange-600 font-semibold text-base mb-2">
            Customer name: {clientName}
          </p>
          {/* location */}
          <div className="flex gap-6 mb-2">
            <p className="flex text-base font-semibold text-[#757575] items-center gap-2">
              <CurrencyBangladeshiIcon className="h-6 w-6" /> Bill Amount :{" "}
              {billAmount} Taka
            </p>
          </div>
        </div>
      </div>
      {/* <div className="overflow-x-auto">
        <div className="py-2 inline-block min-w-full">
          <div className="overflow-hidden rounded">
            <table className="min-w-full">
              <thead className="table-header-group bg-white border-b">
                <tr className="text-center">
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4"
                  >
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4"
                  >
                    Warranty
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4"
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {purchaseItems?.map((item, indx) => (
                  <tr
                    key={indx}
                    className={`${
                      (indx + 1) % 2 === 0 ? "bg-white" : "bg-gray-100"
                    } border-b`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {indx + 1}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item.warranty}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item.quantity}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-right">
                      {item.price} Taka
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default History;
