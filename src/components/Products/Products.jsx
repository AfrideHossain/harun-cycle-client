import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import Cookies from "js-cookie";
import Loading from "../Shared/Loading";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(true);
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
  return (
    <div className="container mt-5">
<<<<<<< HEAD
      <div className="grid md:grid-cols-2 mx-auto gap-3">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
=======
      {loading ? (
        <Loading />
      ) : (
        <div className="grid md:grid-cols-2 mx-auto gap-3">
          {products?.map((product) => (
            <Product key={product._id} product={product} refetch={setRefetch} />
          ))}
        </div>
      )}
>>>>>>> 4c4259ac8f6d7c948766b1d64b5d323356edb25e
    </div>
  );
};

export default Products;
