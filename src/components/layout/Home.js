import React from "react";

import { Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/mails/inbox");
  };
  return (
    <Container fluid className="m-5">
      <h1>Welcome to Mail Box Client</h1>
      <Button
        variant="secondary"
        className="rounded-4 fw-bold px-4"
        onClick={clickHandler}
      >
        Let's Start!
      </Button>
    </Container>
  );
};

export default Home;
