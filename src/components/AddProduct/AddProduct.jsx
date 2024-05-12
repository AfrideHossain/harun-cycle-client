import Cookies from "js-cookie";
import React, { useState } from "react";
import { toast } from "react-toastify";
const AddProduct = () => {
  const mainUrl = import.meta.env.VITE_BACKURL;
  const token = Cookies.get("token");

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState(null);
  const [retail, setRetail] = useState(null);
  const [wholesale, setWholesale] = useState(null);
  const [warranty, setWarranty] = useState("");
  const [unit, setUnit] = useState("");
  const handleAddProduct = (e) => {
    e.preventDefault();
    let bodyData = {
      name,
      brand,
      quantity: parseFloat(quantity),
      unit,
      warranty,
      retail,
      wholesale,
    };
    console.log(bodyData);
    fetch(`${mainUrl}/manage/addproduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(bodyData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Yaay 🤩, Product Added");
        }
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4 mt-5">
      <div className="bg-white shadow-md rounded-md p-6 md:max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Add new product</h1>
        <form onSubmit={handleAddProduct}>
          <div className="mb-4">
            <label className="text-gray-700 font-bold mb-2" htmlFor="name">
              Product Name
            </label>
            <input
              id="product-name"
              type="text"
              placeholder="Enter product name"
              className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:bg-gray-100"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
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
              type="text"
              placeholder="How many items to add"
              className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:bg-gray-100"
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="text-gray-700 font-bold mb-2"
              htmlFor="product-unit"
            >
              Unit
            </label>
            {/* <input
              id="product-unit"
              type="text"
              placeholder="E.g: Kg"
              className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:bg-gray-100"
              onChange={(e) => {
                setUnit(e.target.value);
              }}
              required
            /> */}
            <select
              id="product-unit"
              type="text"
              placeholder="E.g: Kg"
              className="border rounded-md w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:bg-gray-100"
              onChange={(e) => {
                setUnit(e.target.value);
              }}
              required
            >
              <option id="UnitNull" value="">
                Select Unit
              </option>
              <option id="Kg" value="Kg">
                Kg
              </option>
              <option id="Pcs" value="Pcs">
                Pcs
              </option>
              <option id="Pair" value="Pair">
                Pair
              </option>
              <option id="Set" value="Set">
                Set
              </option>
              <option id="Dozen" value="Dozen">
                Dozen
              </option>
            </select>
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-bold mb-2" htmlFor="warranty">
              Warranty(if available)
            </label>
            <input
              id="product-warranty"
              type="text"
              placeholder="Enter warranty duration"
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
                className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:bg-gray-100"
                onChange={(e) => {
                  setRetail(e.target.value);
                }}
                required
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
                className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:bg-gray-100"
                onChange={(e) => {
                  setWholesale(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="flex justify-center">
            <input
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
