import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeU = (e) => setUserName(e.target.value);
  const handleChangeP = (e) => setPassword(e.target.value);

  const handleLogin = () => {
    // Login function using Admin Authentication
  };
  return (
    <FormWrapper>
      <Title>ADMIN LOGIN</Title>
      <Form.Control
        type="username"
        placeholder="Enter Username"
        value={userName}
        onChange={(e) => handleChangeU(e)}
      />
      <Form.Control
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => handleChangeP(e)}
      />
      <Button className="primary" onClick={handleLogin}>
        Login
      </Button>
    </FormWrapper>
  );
}

export default Login;

const FormWrapper = styled.div`
  display: flex;
  margin: 3%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 2% 6%;
  width: 35%;
  height: 350px;
  border-radius: 5px;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.3);
`;

const Title = styled.span`
  text-align: center;
  font-size: 40px;
  color: rgb(92, 90, 90, 0.8);
  font-weight: 450;
  margin: 10px;
`;
