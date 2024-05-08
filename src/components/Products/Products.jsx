import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import Cookies from "js-cookie";
import Loading from "../Shared/Loading";
import { RectangleStackIcon } from "@heroicons/react/24/outline";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(true);
  const [pname, setPname] = useState("");
  const [error, setError] = useState("");

  const token = Cookies.get("token");
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKURL}/manage/allproducts/`, {
      method: "GET",
      headers: {
        "auth-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.allProducts);
        setLoading(false);
        setRefetch(false);
      });
  }, [refetch]);

  const searchProductsHandler = (pName) => {
    if (pName.length >= 3 || pName.length === 0) {
      setLoading(true);
      fetch(
        `${import.meta.env.VITE_BACKURL}/manage/searchProduct?pName=${pName}`,
        {
          method: "GET",
          headers: {
            "auth-token": token,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setProducts(data.allProducts);
          } else {
            setError(`Product not found with keyword ${pName}`);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setError("Enter at least 3 letters to search...");
    }
  };
  return (
    <div className="container mt-5">
      <div className="my-6">
        <div className="flex justify-center items-center gap-2 p-1 rounded text-base font-semibold text-gray-700 mx-4 sm:mx-auto bg-slate-300 w-fit">
          <RectangleStackIcon className="w-8 mx-2" />
          <input
            type="text"
            id="customer-id"
            className="border-none"
            // value={pname}
            placeholder="Search by product's name"
            onChange={(e) => {
              // setError("");
              // setPname(e.target.value);
              searchProductsHandler(e.target.value);
            }}
          />
          <button
            className="bg-sky-600 text-white border-none px-5 py-3 rounded font-bold text-lg cursor-pointer transition duration-300 ease-in-out"
            type="button"
            onClick={() => searchProductsHandler(pname)}
          >
            Search
          </button>
        </div>
        {error && (
          <p className="text-red-600 bg-white w-fit p-2 mx-auto mt-3 rounded-md font-semibold">
            {error}
          </p>
        )}
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid md:grid-cols-2 mx-auto gap-3">
          {products?.map((product) => (
            <Product key={product._id} product={product} refetch={setRefetch} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
