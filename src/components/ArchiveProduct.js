import React from "react";
import Button from "react-bootstrap/Button";
import { Notyf } from "notyf";

const ArchiveProduct = ({ productId, isActive, fetchData }) => {
  const notyf = new Notyf();

  function archiveToggle(productId) {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/products/${productId}/archive`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId }),
      }
    ).then((res) =>
      res.json().then((data) => {
        if (data.message === "Product archived successfully") {
          notyf.success("Successfully Archived");
          fetchData();
        } else {
          notyf.error("Something went wrong");
          fetchData();
        }
      })
    );
  }

  const activateToggle = (productId) => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/products/${productId}/activate`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
        body: JSON.stringify({ productId }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Product activated successfully") {
          notyf.success("Product activated successfully");
          fetchData();
        } else if (data.message === "Product already activated") {
          notyf.error("Product already activated");
          fetchData();
        } else if (data.message === "Product not found") {
          notyf.error("Product not found");
          fetchData();
        } else {
          notyf.error("Something went wrong");
          fetchData();
        }
      });
  };

  return (
    <>
      {isActive ? (
        <Button variant="danger" onClick={() => archiveToggle(productId)}>
          Disable
        </Button>
      ) : (
        <Button variant="success" onClick={() => activateToggle(productId)}>
          Activate
        </Button>
      )}
    </>
  );
};

export default ArchiveProduct;
