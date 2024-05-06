import React from "react";
import {
  CurrencyBangladeshiIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Product = ({ product, refetch }) => {
  const { _id, name, brand, quantity, retail, wholesale, warranty } = product;
  const token = Cookies.get("token");
  const deleteProductHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00b330",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_BACKURL}/manage/deleteproduct/${id}`, {
          method: "DELETE",
          headers: {
            "auth-token": token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            refetch(true);
            Swal.fire("Deleted!", "Your product has been deleted.", "success");
          });
      }
    });
  };
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
      {/* buttons */}
      <div className="absolute top-6 right-6 p-2 w-10 flex flex-col gap-2">
        <button
          onClick={() => deleteProductHandler(_id)}
          className="rounded-md border bg-red-600 w-10 h-10 flex items-center justify-center"
        >
          <TrashIcon className="h-6 w-6 text-white" />
        </button>
        <Link
          className="rounded-md border bg-cyan-600 w-10 h-10 flex items-center justify-center"
          to={`/updateproduct/${_id}`}
        >
          <PencilSquareIcon className="h-6 w-6 text-white" />
        </Link>
      </div>
    </div>
  );
};

export default Product;
