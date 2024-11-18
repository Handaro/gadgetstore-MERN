import React, { useEffect, useState } from "react";
import { Notyf } from "notyf";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const notyf = new Notyf();

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Fetch Cart Items
  const fetchCartItems = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setCartItems(data.cartItems);
        setTotalPrice(data.totalPrice); // Assuming the API sends cartItems
      } else {
        notyf.error(data.message || "Failed to load cart items");
      }
      setLoading(false);
    } catch (error) {
      notyf.error("Error fetching cart items");
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/cart/add-to-cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            productId,
            quantity,
          }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        notyf.success("Item added to cart");
        fetchCartItems(); // Refresh the cart after adding an item
      } else {
        notyf.error(data.message || "Failed to add item to cart");
      }
    } catch (error) {
      notyf.error("Error adding item to cart");
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/cart/update-cart-quantity`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ productId, newQuantity }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        notyf.success("Quantity updated");
        fetchCartItems(); // Refresh cart after updating quantity
      } else {
        notyf.error(data.message || "Failed to update quantity");
      }
    } catch (error) {
      notyf.error("Error updating quantity");
    }
  };

  const removeItem = async (productId) => {
    try {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/cart/${productId}/remove-from-cart`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Re-fetch updated cart items
      fetchCartItems();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const clearCart = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/clear-cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCartItems([]);
      setTotalPrice(0);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const checkout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/orders/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 201) {
        notyf.success("Checkout Successful");
      }
      setCartItems([]);
      setTotalPrice(0);
      navigate("/");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  if (loading) {
    return <div>Loading cart...</div>;
  }

  const incrementQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: (item.quantity + 1) * item.price,
            }
          : item
      )
    );
  };

  const decrementQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              subtotal: (item.quantity - 1) * item.price,
            }
          : item
      )
    );
  };

  return (
    <div className="container cart-page mt-4">
      <h2 className="text-center mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          Your cart is empty.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Subtotal</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item._id}>
                  <td>{item.productName}</td>
                  <td>{item.price.toFixed(2)}</td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      <button
                        className="btn btn-sm btn-outline-danger mr-2"
                        onClick={() => decrementQuantity(item._id)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-success ml-2"
                        onClick={() => incrementQuantity(item._id)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>{item.subtotal.toFixed(2)}</td>
                  <td>
                    <div className="d-flex gap-3">
                      <button
                        className="btn btn-sm btn-outline-primary mr-2"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity)
                        }
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger mr-2"
                        onClick={() => removeItem(item.productId)}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <Button variant="danger" className="mt-3" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </td>
                <td></td>
                <td></td>

                <td>
                  <h4 className="text-end mt-4">
                    Total: {totalPrice.toFixed(2)}
                  </h4>
                  ;
                </td>
                <td>
                  <Button variant="success" className="mt-3" onClick={checkout}>
                    Checkout
                  </Button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default CartPage;
