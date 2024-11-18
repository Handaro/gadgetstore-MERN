import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductCard from "./ProductCard";

const ProductPriceSearch = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  // Function to handle the search request
  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");

    if (!minPrice || !maxPrice || Number(minPrice) > Number(maxPrice)) {
      setError("Please enter valid price range (min <= max).");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/products/search-by-price`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            minPrice: Number(minPrice),
            maxPrice: Number(maxPrice),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSearchResults(data);
      } else {
        setError(data.message || "Error fetching courses.");
      }
    } catch (err) {
      setError("Error connecting to the server.");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Search Products by Price:</h3>
      <form className="mt-3" onSubmit={handleSearch}>
        <div className="form-row">
          <div className="col-md-5 mb-3">
            <label htmlFor="minPrice">Minimum Price</label>
            <input
              type="number"
              className="form-control"
              id="minPrice"
              placeholder="Enter minimum price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              required
            />
          </div>
          <div className="col-md-5 mb-3">
            <label htmlFor="maxPrice">Maximum Price</label>
            <input
              type="number"
              className="form-control"
              id="maxPrice"
              placeholder="Enter maximum price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              required
            />
          </div>
          <div className="col-md-2 mb-3 align-self-end">
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
      </form>

      {setSearchResults.length > 0 && (
        <div className="mt-4">
          <h4>Product Results</h4>
          <ul>
            {searchResults.map((product) => (
              /* <li key={course.id}>{course.name}</li> */
              <ProductCard productProp={product} key={product._id} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductPriceSearch;
