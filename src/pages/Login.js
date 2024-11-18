import { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { Notyf } from "notyf";

export default function Login() {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);

  const notyf = new Notyf();

  function authenticate(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access !== undefined) {
          localStorage.setItem("token", data.access);
          retrieveUserDetails(data.access);

          setEmail("");
          setPassword("");

          notyf.success(`You are now logged in`);
        } else if (data.error === "Email and password do not match") {
          notyf.error(`Email and password do not match`);
        } else {
          notyf.error(`${email} does not exist`);
        }
      });
  }

  function retrieveUserDetails(accessToken) {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      // the token will be sent as part of the Authorization headers
      // we still put "Bearer" infront of the token because of the implementation for JWTs
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin,
        });
      });
  }

  useEffect(() => {
    // Validation to enable submit button when all fields are populated and both passwords match
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return user.id !== null ? (
    <Navigate to="/products" />
  ) : (
    <Form onSubmit={(e) => authenticate(e)}>
      <h1 className="my-5 text-center">Login</h1>
      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      {isActive ? (
        <Button variant="primary" type="submit" id="loginBtn">
          Login
        </Button>
      ) : (
        <Button variant="danger" type="submit" id="loginBtn" disabled>
          Login
        </Button>
      )}
    </Form>
  );
}
