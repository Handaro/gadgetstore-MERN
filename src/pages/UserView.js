import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const UserView = ({ productsData }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (productsData) {
      setProducts(productsData);
    }
  }, [productsData]);

  return (
    <div>
      <h1>Available Products</h1>
      <div>
        {products.length > 0 ? (
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default UserView;
