import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./AccountList.scss";
import config from "../../config/env-urls";
import { useToasts } from "react-toast-notifications";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import getComponentData from "./selector";

function AccountEdit(props) {
  const user = props.location.state;
  if (user.userId) {
    user.id = user.userId
  }
  const {edit} = props
  const [inputs, setInputs] = useState({
    ambassadorId: user.ambassadorId,
    name: user.name,
    username: user.username,
    email: user.email,
  });

  const { addToast } = useToasts();
  const { ambassadorId, username, name, email } = inputs;
  
  const handleChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    
      const body = { ambassadorId, username, name, email };
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };
      const response = await fetch(
        `${config.SKINCAREBASEURL}/api/challenge/update-user/${user.id}`,
        requestOptions
      );
      const parseRes = await response.json();
      if (parseRes.error) {
        console.error(parseRes.error);
        addToast(parseRes.error, { appearance: "error", autoDismiss: true });
      } else {
        addToast("Your Changes Have Been Saved Successfully", {
          appearance: "success",
          autoDismiss: true,
        });
      }
  };

  const handlePasswordReset = async () => {
   
    const body = { email: inputs.email, targetURL: config.SCTARGETURL };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    const request = await fetch(
      `${config.SKINCAREBASEURL}/api/challenge/reset-password`,
      requestOptions
    );
    const parseRes = await request.json();
    if (parseRes.error) {
      console.error(parseRes.error);
      addToast(parseRes.error, { appearance: "error", autoDismiss: true });
    } else {
      addToast("Password Reset Email Sent!", {
        appearance: "success",
        autoDismiss: true,
      });
    }
  };

  return (
    <div>
      <div className="page-header">
        Skincare Challenge Edit Account
        <div className="page-header-link"><Link to="/Challenge/Accounts">Back to list</Link></div>
      </div>
      <Main>
        <h5 style={div}>Account ID: {user.id}</h5>
        <div style={div}>
          Ambassador ID:
          {edit?<input
            type="text"
            defaultValue={user.ambassadorId}
            name="ambassadorId"
            onChange={edit && handleChange}
          />:<input
          type="text"
          readOnly
          value={user.ambassadorId}
          name="ambassadorId"
        />}
        </div>
        <div style={div}>
          Name:{" "}
         {edit?<input
            type="text"
            // {editPermission && readOnly}
            defaultValue={user.name}
            name="name"
            onChange={edit && handleChange}
          />:
          <input
          type="text"
          readOnly
          value={user.name}
          name="name"
        />}
        </div>
        <div style={div}>
          Username:{" "}
          {edit?<input
            type="text"
            defaultValue={user.username}
            name="username"
            onChange={handleChange}
          />:<input
          type="text"
          value={user.username}
          name="username"
          readOnly
        />}
        </div>
        <div style={div}>
          Email:{" "}
         { edit?<input
            type="text"
            defaultValue={user.email}
            name="email"
            onChange={handleChange}
          />: <input
          type="text"
          value={user.email}
          name="email"
          readOnly
        />}
        </div>
        <div style={div}>

         {edit? <><button className="add-account-btn" onClick={handleSubmit}>
            Save
          </button>
          <button className="add-account-btn" onClick={handlePasswordReset}>
            Send Password Reset
          </button></>
          :<Button style={{background:"#043769", marginRight: "50px", padding: "10px 25px"}} disabled>
            Save
          </Button>}
        </div>
      </Main>
    </div>
  );
}

export default connect(getComponentData)(AccountEdit);

const Main = styled.section`
  color: rgb(94, 93, 93);
  font-weight: 400;
  font-size: 17px;
  width: 1400px;
  text-align: left;
`;
const div = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "3% 0%",
  padding: "5px 10px",
  width: "355px",
};
