// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const Home = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="">
        <h1 className="fw-bolder">Welcome to GadgetHub</h1>
        <p className="">
          Discover the latest and greatest in tech! From cutting-edge gadgets to
          must-have accessories, we’ve got everything you need to stay ahead of
          the curve.
        </p>
        <Nav.Link as={Link} to="/products" exact="true">
          <button className="btn btn-primary">Shop Now</button>
        </Nav.Link>
      </div>
    </div>
  );
};

export default Home;
