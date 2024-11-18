// src/components/AppNavBar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import UserContext from "../context/UserContext";

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="bg-primary">
      <Container className="ms-0">
        <Navbar.Brand as={Link} to="/" className="text-white">
          Gadget Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" exact="true" className="text-white">
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/products"
              exact="true"
              className="text-white"
            >
              Products
            </Nav.Link>
            {user.id !== null ? (
              user.isAdmin ? (
                <>
                  <Nav.Link as={Link} to="/logout" className="text-white">
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    as={Link}
                    to="/cart"
                    exact="true"
                    className="text-white"
                  >
                    Cart
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/logout"
                    exact="true"
                    className="text-white"
                  >
                    Logout
                  </Nav.Link>
                </>
              )
            ) : (
              <>
                <Nav.Link as={Link} to="/login" exact="true">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" exact="true">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
