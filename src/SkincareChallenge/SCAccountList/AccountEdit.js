import React, { useState } from "react";
import PageWrapper from "../../GlobalComponents/PageWrapper";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./AccountList.css";

function AccountEdit(props) {
  const [inputs, setInputs] = useState({
    ambassadorID: '',  
    name: '',
    email: ''
  });

  const { ambassadorID, name, email } = inputs;

  const user = props.location.state;

  const handleChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });
  
  const handleSubmit = () => {
    // Send the new info to the backend
  };

  const handlePasswordReset = () => {
    // Needs to be implemented
  };

  

  return (
    <div>
      <PageWrapper>
        <h1>Skincare Challenge Edit Account</h1>
        <div style={{ alignSelf: "flex-end", margin: "3px 30%" }}>
          <Link to="/Skincare-Challenge-Accounts">
            <button id="edit">Back to list</button>
          </Link>
        </div>
        <Main>
          <h5 style={div}>Account ID: {user.accountId}</h5>
          <div style={div}>
            Ambassador ID:{" "}
            <input type="text" defaultValue={user.ambassadorID} name='ambassadorID' onChange={handleChange}/>
          </div>
          <div style={div}>
            Name: <input type="text" defaultValue={user.name} name='name' onChange={handleChange}/>
          </div>
          <div style={div}>
            Email: <input type="text" defaultValue={user.email} name='email' onChange={handleChange}/>
          </div>
          <div style={div}>
            <button className="add-account-btn" onclick={handleSubmit}>
              Save
            </button>{" "}
            <button className="add-account-btn" onClick={handlePasswordReset}>
              Send Password Reset
            </button>
          </div>
        </Main>
      </PageWrapper>
    </div>
  );
}

export default AccountEdit;

const Main = styled.section`
  margin: 1% 5%;
  color: rgb(94, 93, 93);
  font-weight: 400;
  font-size: 17px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-around;
`;
const div = {
  margin: "1% 0px",
  padding: "7px",
  width: "450px",
};
