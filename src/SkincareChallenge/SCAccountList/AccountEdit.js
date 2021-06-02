import React, { useState } from "react";
import PageWrapper from "../../GlobalComponents/PageWrapper";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./AccountList.scss";
import config from '../../config/env-urls'
function AccountEdit(props) {
  const [inputs, setInputs] = useState({
    ambassadorId: '',  
    name: '',
    username: '',
    email: ''
  });

  const { ambassadorId, username, name, email } = inputs;

  const user = props.location.state;

  const handleChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });

  
  const handleSubmit = async () => {
      try{
        const body = {ambassadorId, username, name, email}
       const requestOptions = {
          method: 'PUT',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        };
      const response = await fetch(`${config.SKINCAREBASEURL}/api/challenge/update-user/${user.id}`, requestOptions)
      console.log('response', response);
      
      } catch (err){
        console.error(err.message)
      }
    };
  

  const handlePasswordReset = () => {
    // Needs to be implemented
  };

  

  return (
    <div>
      <h1>Skincare Challenge Edit Account</h1>
      <div style={{ alignSelf: "flex-end", margin: "15px 1%" }}>
        <Link to="/Challenge/Accounts">
          <button id="edit">Back to list</button>
        </Link>
      </div>
      <Main>
        <h5 style={div}>Account ID: {user.id}</h5>
        <div style={div}>
          Ambassador ID:
          <input type="text" defaultValue={user.ambassadorId} name='ambassadorId' onChange={handleChange}/>
        </div>
        <div style={div}>
          Name: <input type="text" defaultValue={user.name} name='name' onChange={handleChange}/>
        </div>
        <div style={div}>
          Username: <input type="text" defaultValue={user.username} name='username' onChange={handleChange}/>
        </div>
        <div style={div}>
          Email: <input type="text" defaultValue={user.email} name='email' onChange={handleChange}/>
        </div>
        <div style={div}>
          <button className="add-account-btn" onClick={handleSubmit}>
            Save
          </button>{" "}
          <button className="add-account-btn" onClick={handlePasswordReset}>
            Send Password Reset
          </button>
          </div>
      </Main>
    </div>
  );
}

export default AccountEdit;

const Main = styled.section`
  color: rgb(94, 93, 93);
  font-weight: 400;
  font-size: 17px;
  padding: 1px 1%;
  
`;
const div = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent:'space-between',
  alignItems:'center',
  margin: "3% 0%",
  padding: '5px 10px',
  width: "355px",

};
