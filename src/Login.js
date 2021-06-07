import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import PageWrapper from '../src/GlobalComponents/PageWrapper'

function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeU = (e) => setUserName(e.target.value);
  const handleChangeP = (e) => setPassword(e.target.value);

  const handleLogin = () => {
      // Login function using Admin Authentication
  }
  return (
      <PageWrapper>
    <FormWrapper>
      <h2 className="common-page-title">ADMIN LOGIN</h2>
      <Form>
        <Form.Group controlId="formUserName">
          <Form.Label>Admin User Name</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter Username"
            value={userName}
            onChange={(e) => handleChangeU(e)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => handleChangeP(e)}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Form>
      <br />
    </FormWrapper>
    </PageWrapper>
  );
}

export default Login;


const FormWrapper = styled.div`
  display: flex;
  margin: 3%;
  justify-content: center;
  align-self: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 3%;
  width: 40%;
  border-radius: 5px;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.3);
`;
