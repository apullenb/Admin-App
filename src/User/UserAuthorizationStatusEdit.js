import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const options = [
  { id: 1, value: "Not Allowed" },
  { id: 2, value: "View" },
  { id: 3, value: "Edit" },
  { id: 4, value: "Approve" },
  { id: 5, value: "View and Edit" },
  { id: 6, value: "View, Edit and Approve" },
];

const UserAuthorizationStatusEdit = (props) => {
  const [userPermission, setUserPermission] = useState([]);
  const getPermissions = async (email) => {
    try {
      const requestOptions = {
        method: "GET",
      };
      const response = await fetch(
        `https://zidentityapidev.azurewebsites.net/Permission?Email=${email}`,
        requestOptions
      );
      const data = await response.json();

      setUserPermission(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getPermissions(props.location.state.email);
  }, []);

  const generateDefaultValue = (area) => {
    const level =
      userPermission.length > 0 &&
      userPermission.find((item) => {
        return item.area === area;
      }).level;

    return level;
  };

  return (
    <Container>
      <UserTitleContainer>
        <Title>Account Details</Title>
        <Link to="/Settings/users">Back to List</Link>
      </UserTitleContainer>
      <AccountDetailsContainer>
        <div>
          <label>Email</label>
          <StyledInput defaultValue={props.location.state.email} />
          <br />
          <label>Name: </label>
          <StyledInput defaultValue={props.location.state.name} />
          <br />
          <label
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              marginLeft: "27px",
            }}
          >
            Date Created:{" "}
            <span style={{ marginLeft: "40px" }}>
              {" "}
              {props.location.state.createdDate}
            </span>
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
          <p
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              color: "#707070",
              textAlign: "left",
            }}
          >
            Shopping Configuration
          </p>
          <div>
            <label name="countries">Countries</label>
            <StyledSelect value={generateDefaultValue("Countries")}>
              {options.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </StyledSelect>
          </div>
          <div>
            <label name="kits">Kits</label>
            <StyledSelect value={generateDefaultValue("Kits")}>
              {options.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </StyledSelect>
          </div>
          <div>
            <label name="categories">Categories</label>
            <StyledSelect value={generateDefaultValue("Categories")}>
              {options.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </StyledSelect>
          </div>
          <div>
            <label name="products">Products</label>
            <StyledSelect value={generateDefaultValue("Products")}>
              {options.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </StyledSelect>
          </div>
        </div>
        <div>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              color: "#707070",
              textAlign: "left",
            }}
          >
            COAs
          </p>
          <div>
            <label name="countries">Countries</label>
            <StyledSelect value={generateDefaultValue("Products")}>
              {options.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </StyledSelect>
          </div>
          <div>
            <label name="kits">Kits</label>
            <StyledSelect value={generateDefaultValue("Kits")}>
              {options.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </StyledSelect>
          </div>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              color: "#707070",
              textAlign: "left",
            }}
          >
            Admin Settings
          </p>
          <div>
            <label name="categories">Categories</label>
            <StyledSelect value={generateDefaultValue("Categories")}>
              {options.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </StyledSelect>
          </div>
          <div>
            <label name="products">Products</label>
            <StyledSelect value={generateDefaultValue("Products")}>
              {options.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </StyledSelect>
          </div>
        </div>
      </AccountConfigContainer>
      <BottomAccountConfig>
        <div>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              color: "#707070",
              textAlign: "left",
            }}
          >
            Skincare Challenge
          </p>
          <div>
            <label name="countries">Accounts</label>
            <StyledSelect value={generateDefaultValue("Accounts")}>
              {options.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </StyledSelect>
          </div>
          <div>
            <label name="kits">Entries</label>
            <StyledSelect value={generateDefaultValue("Entries")}>
              {options.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </StyledSelect>
          </div>
          <div>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#707070",
                textAlign: "left",
              }}
            >
              Event Calendar
            </p>
            <div>
              <label name="countries">Corp Events</label>
              <StyledSelect value={generateDefaultValue("Corp Events")}>
                {options.map((option) => (
                  <option key={option.id}>{option.value}</option>
                ))}
              </StyledSelect>
            </div>
            <div>
              <label name="kits">AMB Events</label>
              <StyledSelect value={generateDefaultValue("AMB Events")}>
                {options.map((option) => (
                  <option key={option.id}>{option.value}</option>
                ))}
              </StyledSelect>
            </div>
          </div>
          <div>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#707070",
                textAlign: "left",
              }}
            >
              Incentive Trip
            </p>
            <div>
              <label name="countries">Incentive Trip</label>
              <StyledSelect>
                {options.map((option) => (
                  <option
                    value={generateDefaultValue("Incentive Trip")}
                    key={option.id}
                  >
                    {option.value}
                  </option>
                ))}
              </StyledSelect>
            </div>
          </div>
        </div>
      </BottomAccountConfig>
      <div style={{ display: "flex" }}>
        <StyledButton>Save</StyledButton>
      </div>
    </Container>
  );
};

const StyledButton = styled(Button)`
  background-color: #0f4b8f;

  color: white;

  height: 40px;

  font-weight: bold;

  width: 130px;
  text-align: center;
  margin-top: 75px;
  margin-bottom: 45px;
`;

const BottomAccountConfig = styled.div`
  display: flex;
`;
const Container = styled.div`
  label {
    width: 100px;
  }
`;

const AccountConfigContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 89%;
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
