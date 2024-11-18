import { useState, useEffect, useContext } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import UserContext from "../context/UserContext";

import { Notyf } from "notyf";

export default function ProductView() {
  const { productId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [subtotal, setSubtotal] = useState(quantity * price);

  const notyf = new Notyf();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
      });
  }, [productId]);

  function addToCart(productId) {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        productId,
        quantity,
        subtotal,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Product added to cart") {
          notyf.success("Product added to cart");
          navigate("/products");
        } else if (data.message === "Cart not found") {
          notyf.error("Cart not found");
          navigate("/products");
        } else {
          notyf.error("Internal Server Error. Notify System Admin");
        }
      });
  }

  return (
    <Row>
      <Col lg={{ span: 6, offset: 3 }}>
        <Card>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle>Description:</Card.Subtitle>
            <Card.Text>{description}</Card.Text>
            <Card.Subtitle>Price:</Card.Subtitle>
            <Card.Text>PhP {price}</Card.Text>
            <Card.Subtitle>Quantity</Card.Subtitle>
            <Form.Select onChange={(e) => setQuantity(e.target.value)}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
            </Form.Select>
            {user.id !== null ? (
              <Button variant="primary" onClick={() => addToCart(productId)}>
                Add To Cart
              </Button>
            ) : (
              <Link className="btn btn-danger" to="/login">
                Login
              </Link>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
