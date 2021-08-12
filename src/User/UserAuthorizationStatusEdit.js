import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UserAuthorizationStatusEdit = (props) => {
  console.log("tst", props.location);
  return (
    <Container>
      <UserTitleContainer>
        <Title>Account Details</Title>
        <Link to="/Users">Back to List</Link>
      </UserTitleContainer>
      <AccountDetailsContainer>
        <div>
          <label>Email</label>
          <StyledInput defaultValue={props.location.state.email} />
          <br />
          <label>Name: </label>
          <StyledInput defaultValue={props.location.state.name} />
          <br />
          <label style={{ marginRight: "95px" }}>
            Date Created: {props.location.state.createdDate}{" "}
          </label>
        </div>
        <div>
          <p>Date Last Modified: {props.location.state.modifiedDate} </p>
          <p>Created by: {props.location.state.createdBy} </p>
        </div>

        <div />
      </AccountDetailsContainer>
      <hr />
      <AccountConfigContainer>
        <div>
        <p style={{ fontWeight: "bold", fontSize: "20px", color: "#707070",textAlign: 'left'}}>
          Shopping Configuration
        </p>
        <div>
          <label>Countries</label>
          <StyledSelect></StyledSelect>
        </div>
        <div>
          <label>Kits</label>
          <StyledSelect></StyledSelect>
        </div>
        <div>
          <label>Categories</label>
          <StyledSelect></StyledSelect>
        </div>
        <div>
          <label>Products</label>
          <StyledSelect></StyledSelect>
        </div>
        </div>
      </AccountConfigContainer>
    </Container>
  );
};

const Container = styled.div``;

const AccountConfigContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.p`
  color: #707070;
  font-size: 36px;
  text-align: left;
`;

const AccountDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  label {
    color: #707070;
  }
  p {
    color: #707070;
  }
`;
const StyledInput = styled.input`
  border: 2px solid #0f4b8f;
  width: 271px;
  margin-left: 65px;
`;

const StyledSelect = styled.select`
  border: 2px solid #0f4b8f;
  width: 271px;
  margin-left: 65px;
`;

export default UserAuthorizationStatusEdit;
