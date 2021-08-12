import React from "react";
import styled from "styled-components";

const UserAuthorizationStatusHeader = () => {
  return (
    <Container>
      <UserTitleContainer>
        <Title>User Accounts</Title>
        <StyledButton>Add User</StyledButton>
      </UserTitleContainer>
    </Container>
  );
};

const Container = styled.div``;


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

const StyledButton = styled.button`
  background-color: #0f4b8f;
  color: white;
  font-weight: bold;
  border: none;
  height: 36px;
  padding-left: 14px;
  padding-right: 14px;
`;


export default UserAuthorizationStatusHeader;
