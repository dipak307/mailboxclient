import React, { useState } from "react";

import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/auth-hook";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [authAction] = useAuth();

  const inputFormHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
      e.preventDefault();

      const inputData = { ...formData, returnSecureToken: true };
      if (inputData.password !== inputData.confirmPassword) {
        alert("please set correct password");
      } else {
        authAction(inputData, "signup");
      }

  };

  return (
    <Container
      className="bg-alitlightmx-5 mx-auto"
      style={{ maxWidth: "450px", marginTop: "150px" }}
    >
      <Card className="bg-secondary shadow p-3 px-4">
        <h2 className="py-3 text-center">Sign Up</h2>
        <Form onSubmit={submitHandler}>
          <Form.Floating className="mb-2">
            <Form.Control
              id="email"
              type="email"
              placeholder="email"
              name="email"
              onChange={inputFormHandler}
              value={formData.email}
              required
            />
            <label htmlFor="email">Email</label>
          </Form.Floating>
          <Form.Floating className="mb-2">
            <Form.Control
              id="password"
              type="password"
              placeholder="password"
              name="password"
              onChange={inputFormHandler}
              value={formData.password}
              required
            />
            <label htmlFor="password">Password</label>
          </Form.Floating>
          <Form.Floating className="mb-2">
            <Form.Control
              id="confirmPassword"
              type="password"
              placeholder="confrimPassword"
              name="confirmPassword"
              onChange={inputFormHandler}
              value={formData.confirmPassword}
              required
            />
            <label htmlFor="confirmPassword">Confrim Password</label>
          </Form.Floating>
          <div className="d-flex flex-column align-items-center justify-content-center gap-2  mt-2">
            <Button type="submit">Sign Up</Button>
            <Link to="/login">
              <Button variant="boder-info">
                Already have an account? Login
              </Button>
            </Link>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default SignUp;
