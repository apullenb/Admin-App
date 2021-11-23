import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { LoginSkincareAdmin } from "./redux/actions/Skincare/skincareActions";
import { Redirect } from "react-router";
import { toast } from "react-toastify";

function Login() {
  const fetching = useSelector(({ entries }) => entries.fetching);
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) =>
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });

  const handleLogin = async () => {
    if (userCredentials.username && userCredentials.password) {
      dispatch(LoginSkincareAdmin(userCredentials));
    } else {
      toast("Enter Username and Password");
    }
  };

  if (localStorage.getItem("Token")) {
    return <Redirect to="/" />;
  }

  return (
    <FormWrapper>
      <Title>ADMIN LOGIN</Title>
      <Form.Control
        name="username"
        placeholder="Enter Username"
        value={userCredentials.username}
        onChange={(e) => handleChange(e)}
      />
      <Form.Control
        name="password"
        type="password"
        placeholder="Enter Password"
        value={userCredentials.password}
        onChange={(e) => handleChange(e)}
      />
      {fetching ? (
        <Spinner animation="border" />
      ) : (
        <Button className="primary" onClick={() => handleLogin()}>
          Login
        </Button>
      )}
    </FormWrapper>
  );
}

export default Login;

const FormWrapper = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: flex-center;
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
