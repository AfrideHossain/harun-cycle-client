import React from "react";
import {
  CurrencyBangladeshiIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const { _id, name, brand, quantity, retail, wholesale, warranty } = product;
  return (
    <div className="container relative flex gap-4 items-center bg-white border border-[#E8E8E8] rounded-lg w-full p-6">
      <div>
        <h1 className="text-[#474747] font-extrabold text-2xl mb-2 text-left">
          {name}
        </h1>
        <p className="text-orange-600 font-semibold text-base mb-2">
          Available Quantity:{" "}
          <span className="text-orange-500">{quantity}</span>
        </p>
        {/* tags */}
        <div className="flex gap-2 mb-2">
          <div className="border border-[#9873FF] rounded px-3 py-2">
            <p className="gradient-text font-extrabold cursor-pointer">
              {brand}
            </p>
          </div>
          <div className="border border-[#9873FF] rounded px-3 py-2">
            <p className="gradient-text font-extrabold cursor-pointer">
              {warranty}
            </p>
          </div>
        </div>
        {/* location */}
        <div className="flex gap-6 mb-2">
          <p className="flex text-base font-semibold text-[#757575] items-center gap-2">
            <CurrencyBangladeshiIcon className="h-6 w-6" /> Retail : {retail} Tk
          </p>
          <p className="flex text-base font-semibold text-[#757575] items-center gap-2">
            <CurrencyBangladeshiIcon className="h-6 w-6" /> Wholesale :{" "}
            {wholesale} Tk
          </p>
        </div>
      </div>
      {/* button */}
      <Link
        className="absolute top-6 right-6 p-2 rounded-md border bg-gray-600"
        to={`/updateproduct/${_id}`}
      >
        <PencilSquareIcon className="h-5 w-5 text-white" />
      </Link>
    </div>
  );
};

export default Product;
