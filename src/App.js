import "./App.css";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import AppNavbar from "./components/AppNavBar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Products from "./pages/Products";
import CartPage from "./pages/CartPage";
import ProductView from "./pages/ProductView";

function App() {
  const [user, setUser] = useState({ id: null, isAdmin: null });

  function unsetUser() {
    localStorage.clear();
  }

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser({
            id: data.user._id,
            isAdmin: data.user.isAdmin,
          });
        })
        .catch((error) => console.error("Error fetching user details:", error));
    } else {
      setUser({ id: null, isAdmin: null });
    }
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/products/" element={<Products />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products/:productId" element={<ProductView />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
