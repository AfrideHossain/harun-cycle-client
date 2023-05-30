import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import { useLoaderData } from "react-router-dom";

const Products = () => {
  const productsLoader = useLoaderData();
  const [products, setProducts] = useState(productsLoader?.allProducts);
  return (
    <div className="container mt-5">
      <div className="grid md:grid-cols-2 mx-auto gap-3">
        {products?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
