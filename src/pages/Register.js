import { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { Notyf } from "notyf";
import UserContext from "../context/UserContext";

export default function Register() {
  const notyf = new Notyf();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      mobileNo !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      mobileNo.length === 11 &&
      password === confirmPassword
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

  function registerUser(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Registered Successfully") {
          setFirstName("");
          setLastName("");
          setEmail("");
          setMobileNo("");
          setPassword("");
          setConfirmPassword("");
          navigate("/login");

          notyf.success("Registration successful");
        } else if (data.message === "Email invalid") {
          notyf.error("Email is invalid.");
        } else if (data.message === "Mobile number is invalid") {
          notyf.error("Mobile number is invalid");
        } else if (data.message === "Password must be atleast 8 characters") {
          notyf.error("Password must be atleast 8 characters");
        } else {
          notyf.error("Something went wrong");
        }
      });
  }

  return user.id !== null ? (
    <Navigate to="/login" />
  ) : (
    <Form onSubmit={(e) => registerUser(e)}>
      <h1 className="my-5 text-center">Register</h1>

      <Form.Group>
        <Form.Label>First Name:</Form.Label>

        <Form.Control
          type="text"
          placeholder="Enter First Name"
          required
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Last Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Last Name"
          required
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Mobile No:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter 11 Digit No."
          required
          value={mobileNo}
          onChange={(e) => {
            setMobileNo(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirm Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </Form.Group>
      {/* Conditional rendering where the submit button is only enabled when the isActive is set to true */}
      {
        // if isActive state hook is set to true
        isActive ? (
          // display the enabled button
          <Button variant="primary" type="submit" id="submitBtn">
            Submit
          </Button>
        ) : (
          // else, the isActive state hook is set to false
          // display the disabled button
          <Button variant="danger" type="submit" id="submitBtn" disabled>
            Submit
          </Button>
        )
      }
    </Form>
  );
}
