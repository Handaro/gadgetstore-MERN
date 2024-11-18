import { PropTypes } from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";

export default function ProductCard({ productProp }) {
  const { name, description, price, _id } = productProp;

  return (
    <Card
      className="shadow-sm mb-4 rounded-lg d-flex"
      style={{ maxWidth: "20rem", border: "none" }}
    >
      <Card.Body className="">
        <Card.Title
          className="mb-2"
          style={{ fontSize: "1.5rem", fontWeight: "bold" }}
        >
          {name}
        </Card.Title>

        <Card.Subtitle
          className="mb-1 text-muted fw-bold"
          style={{ fontSize: "1rem" }}
        >
          Description:
        </Card.Subtitle>
        <Card.Text
          className="mb-3"
          style={{ fontSize: "0.95rem", color: "#555" }}
        >
          {description}
        </Card.Text>

        <Card.Subtitle className="mb-1 text-muted" style={{ fontSize: "1rem" }}>
          Price:
        </Card.Subtitle>
        <Card.Text
          className="mb-3"
          style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#333" }}
        >
          PhP {price}
        </Card.Text>

        <Link
          className="btn btn-primary w-100"
          to={`/products/${_id}`}
          style={{
            backgroundColor: "#007bff",
            borderColor: "#007bff",
            fontSize: "1rem",
          }}
        >
          View Details
        </Link>
      </Card.Body>
    </Card>
  );
}

// Check if the CourseCard component is getting the correct prop types
// Proptypes are used for validating information passed to a component and is a tool normally used to help developers ensure the correct information is passed from one component to the next
ProductCard.propTypes = {
  // The "shape" method is used to check if a prop object conforms to a specific "shape"
  productProp: PropTypes.shape({
    // Define the properties and their expected types
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};
