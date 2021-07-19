import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap"
import COATable from "./COATable";
import { useMediaQuery } from 'react-responsive'

const COA = () => {

  const isMobile = useMediaQuery({
    query: '(min-device-width: 568px)'
  })

  return (
    <div style={{ width: "100%" }}>
      <Container>
        <p style={{ fontSize: "32px" }}>COA Product Details</p>
        <Link style={{ display: "flex", alignSelf: "center" }}>
          Back to list
        </Link>
      </Container>
      <div style={{ width: "100%", textAlign: "left" }}>
        <label style={{ fontSize: "20px", marginRight: "30px" }}>
          Product Name
        </label>{" "}
        <input style={{ width: "80%", border: "1px solid #0F4B8F" }} />
      </div>
      <div
        style={{
          width: "100%",
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <label style={{ fontSize: "20px" }}>Country</label>
          <select
            name="cars"
            id="cars"
            style={{
              marginLeft: !isMobile ? "89px" : "0px",
              border: "1px solid #0F4B8F",
              width: "200px",
              height: "30px",
            }}
          >
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
          </select>
        </div>
        <div style={{ marginRight: "300px" }}>
          <label style={{ fontSize: "20px" }}>Category</label>
          <select
            style={{
              marginLeft: "30px",
              border: "1px solid #0F4B8F",
              width: "200px",
              height: "30px",
            }}
            name="cars"
            id="cars"
          >
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
          </select>
        </div>
      </div>
      <hr style={{ color: "#202525" }} />
      <Container>
        <p style={{ fontSize: "32px" }}>Product COAs</p>
        <StyledButton>Add New COA</StyledButton>
      </Container>
        <COATable />
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  color: #707070;
`;

const StyledButton = styled(Button)`
  background-color: #0f4b8f;
  color: white;
  height: 40px;
  font-weight: bold;
  margin-right: 74px;
`;

export default COA;
