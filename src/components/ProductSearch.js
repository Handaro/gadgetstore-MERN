import React, { useState } from "react";
import ProductCard from "./ProductCard";

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/products/search-by-name`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productName: searchQuery }),
        }
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching for courses:", error);
    }
  };

  return (
    <div>
      <h2>Product Search</h2>
      <div className="form-group">
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          className="form-control"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
      <h3>Search Results By Name:</h3>
      <ul>
        <ul>
          {searchResults.map((product) => (
            /* <li key={course.id}>{course.name}</li> */
            <ProductCard productProp={product} key={product._id} />
          ))}
        </ul>
      </ul>
    </div>
  );
};

export default ProductSearch;