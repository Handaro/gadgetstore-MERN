import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { Notyf } from "notyf";

export default function EditProduct({ product, fetchData }) {
  const [productId, setProductId] = useState(product._id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const [showEdit, setShowEdit] = useState(false);

  const notyf = new Notyf();

  const openEdit = () => {
    setShowEdit(true);

    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
  };

  const closeEdit = () => {
    setShowEdit(false);

    setName("");
    setDescription("");
    setPrice(0);
  };

  const editProduct = (e, productId) => {
    e.preventDefault();

    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/products/${productId}/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          description,
          price,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Product updated successfully") {
          notyf.success("Successfully Updated");
          closeEdit();
          fetchData();
        } else {
          notyf.error("Something went wrong");
          closeEdit();
          fetchData();
        }
      });
  };
  return (
    <>
      <Button variant="primary" onClick={() => openEdit()} size="sm">
        Update
      </Button>

      <Modal show={showEdit} onHide={closeEdit}>
        <Form onSubmit={(e) => editProduct(e, productId)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="productName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="productDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => closeEdit()}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
