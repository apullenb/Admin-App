import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_DOCUMENTS_BY_PRODUCT_ID,
  GET_CATEGORIES,
} from "../utils/GQLqueries";
import { ADD_PRODUCT } from "../utils/mutations";
import COATable from "./COADocumentsTable";
import { useMediaQuery } from "react-responsive";

const COADocument = (props) => {
  const [addProduct, { data: updatedProductData }] = useMutation(ADD_PRODUCT);
  const currentProductData = props.location.state
    ? props.location.state
    : updatedProductData &&
      updatedProductData.addCoaProduct &&
      updatedProductData.addCoaProduct.coaProduct;

      console.log('tst', props.location)

  const [documents, setDocuments] = useState([]);
  const [dataCategories, setdataCategories] = useState([]);
  const [region, setRegion] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState(1);
  const [productExists, setProductExists] = useState(false);

  console.log("tstz", currentProductData);

  const { loading, data, refetch } = useQuery(
    GET_DOCUMENTS_BY_PRODUCT_ID,
    props.location.state && props.location.state.coaProductID
      ? {
          variables: {
            productID: props.location.state.coaProductID,
          },
        }
      : { skip: true }
  );

  const { data: categories } = useQuery(GET_CATEGORIES);

  const getDocuments = () => {
    setDocuments(data?.documents);
  };

  const getCategories = () => {
    setdataCategories(categories?.categories);
  };

  useEffect(() => {
    getDocuments();
  }, [data]);

  useEffect(() => {
    getCategories();
  }, [categories]);

  const isMobile = useMediaQuery({
    query: "(min-device-width: 568px)",
  });

  const handleAddProduct = () => {
    addProduct({
      variables: {
        product: productName,
        region: region,
        categoryID: Number(category),
        lastUpdatedOn: "2021-07-19",
      },
    });
    setProductExists(true);
  };

  const tableData = documents && documents.length > 0 ? documents : [];

  return (
    <div style={{ width: "100%" }}>
      <Container>
        <p style={{ fontSize: "32px" }}>COA Product Details</p>
        <Link to={"/COAs"} style={{ display: "flex", alignSelf: "center" }}>
          Back to list
        </Link>
      </Container>
      <div style={{ width: "100%", textAlign: "left" }}>
        <label style={{ fontSize: "20px", marginRight: "30px" }}>
          Product Name
        </label>{" "}
        <input
          style={{ width: "80%", border: "1px solid #0F4B8F" }}
          defaultValue={
            props.location.state && props.location.state.productName
              ? props.location.state.productName
              : null
          }
          onChange={(e) => setProductName(e.target.value)}
        />
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
          <label style={{ fontSize: "20px" }}>Regions</label>
          <select
            name="regions"
            defaultValue={
              currentProductData && currentProductData.region
                ? currentProductData.region
                : null
            }
            id="regions"
            style={{
              marginLeft: !isMobile ? "89px" : "90px",
              border: "1px solid #0F4B8F",
              width: "200px",
              height: "30px",
            }}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value={"USA"}>USA</option>
            <option value={"EU"}>EU</option>
            <option value={"LATAM"}>LATAM</option>
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
            name="categories"
            id="categories"
            onChange={(e) => setCategory(e.target.value)}
          >
            {dataCategories &&
              dataCategories.length > 0 &&
              dataCategories.map((category, index) => {
                return (
                  <option key={index} value={category.categoryID}>
                    {category.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div>
          <StyledButton disabled={productExists} onClick={handleAddProduct}>
            Save
          </StyledButton>
        </div>
      </div>
      <hr style={{ color: "#202525" }} />
      <Container>
        <p style={{ fontSize: "32px" }}>Product COAs</p>
        <Link
          to={`/COA/add/${
            currentProductData ? currentProductData.coaProductID : 0
          }/`}
        >
          <StyledButton disabled={!currentProductData && !productExists}>
            Add New COA
          </StyledButton>
        </Link>
      </Container>
      <COATable
        tableData={tableData}
        productID={
          currentProductData &&
          currentProductData.coaProductID &&
          currentProductData.coaProductID
        }
        refetch={refetch}
      />
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

export default COADocument;
