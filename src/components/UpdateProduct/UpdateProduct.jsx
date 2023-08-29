import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
const UpdateProduct = () => {
  const mainUrl = import.meta.env.VITE_BACKURL;
  const token = Cookies.get("token");
  let loadedProduct = useLoaderData();
  let product = loadedProduct?.product;

  const [name, setName] = useState(product.name);
  const [brand, setBrand] = useState(product.brand);
  const [quantity, setQuantity] = useState(product.quantity);
  const [retail, setRetail] = useState(product.retail);
  const [wholesale, setWholesale] = useState(product.wholesale);
  const [warranty, setWarranty] = useState(product.warranty);

  const handleAddProduct = (e) => {
    e.preventDefault();
    let bodyData = {
      name,
      brand,
      quantity,
      warranty,
      retail,
      wholesale,
    };
    fetch(`${mainUrl}/manage/product/${product._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(bodyData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Yaay 🤩, Product Upadated");
        } else {
          toast.error("🙂 Add necessery changes to update product");
        }
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4 mt-5">
      <div className="bg-white shadow-md rounded-md p-6 md:max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Update product</h1>
        <form onSubmit={handleAddProduct}>
          <div className="mb-4">
            <label className="text-gray-700 font-bold mb-2" htmlFor="name">
              Product Name
            </label>
            <input
              id="product-name"
              type="text"
              placeholder="Enter product name"
              value={name}
              className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:bg-gray-100"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-bold mb-2" htmlFor="brand">
              Brand
            </label>
            <input
              id="product-brand"
              type="text"
              placeholder="Enter brand name"
              value={brand}
              className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:bg-gray-100"
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-bold mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input
              id="product-quantity"
              type="number"
              placeholder="How many items to add"
              value={quantity}
              className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:bg-gray-100"
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-bold mb-2" htmlFor="warranty">
              Warranty(if available)
            </label>
            <input
              id="product-warranty"
              type="text"
              placeholder="Enter warranty duration"
              value={warranty}
              className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:bg-gray-100"
              onChange={(e) => {
                setWarranty(e.target.value);
              }}
            />
          </div>

          <div className="flex gap-3 items-center justify-center w-full">
            <hr className="w-full border border-gray-200" />
            <p className="w-full text-center text-gray-700 font-bold mb-2">
              Price (per unit)
            </p>
            <hr className="w-full border border-gray-200" />
          </div>
          <div className="flex items-center md:gap-4 flex-col md:flex-row">
            <div className="mb-4">
              <label className="text-gray-700 font-bold mb-2" htmlFor="price">
                Retail
              </label>
              <input
                id="retail-price"
                type="text"
                placeholder="Enter retail price"
                value={retail}
                className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:bg-gray-100"
                onChange={(e) => {
                  setRetail(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-700 font-bold mb-2" htmlFor="price">
                Wholesale
              </label>
              <input
                id="wholesale-price"
                type="text"
                placeholder="Enter wholesale price"
                value={wholesale}
                className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:bg-gray-100"
                onChange={(e) => {
                  setWholesale(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <input
              type="submit"
              value="Update"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
