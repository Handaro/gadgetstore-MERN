import { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Notyf } from "notyf";

export default function AddProduct(product, fetchData) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility

  const navigate = useNavigate();
  const notyf = new Notyf();

  useEffect(() => {
    if (productName !== "" && productDescription !== "" && productPrice) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [productName, productDescription, productPrice]);

  function addNewProduct(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: productName,
        description: productDescription,
        price: productPrice,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Product already exists") {
          notyf.error("Product Already Exists");
        } else if (data.message === "Failed to save the product") {
          notyf.error("Unsuccessful Product Creation");
          fetchData();
          setProductName("");
          setProductDescription("");
          setProductPrice("");
        } else if (data.result !== null) {
          notyf.success("Product Added");
          navigate("/products");
          fetchData();
          setProductName("");
          setProductDescription("");
          setProductPrice("");
        } else {
          notyf.error("Unsuccessful Product Creation");
          fetchData();
          setProductName("");
          setProductDescription("");
          setProductPrice("");
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }

  return (
    <div>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add New Product
      </Button>

      {/* Modal for adding product */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              addNewProduct(e);
              setShowModal(false); // Close the modal after submission
            }}
          >
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </Form.Group>

            {isActive ? (
              <Button variant="primary" type="submit" id="submitBtn">
                Submit
              </Button>
            ) : (
              <Button variant="danger" type="submit" id="submitBtn" disabled>
                Submit
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
