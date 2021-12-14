import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";

import {
  GET_DOCUMENTS_BY_PRODUCT_ID,
  GET_CATEGORIES,
  GET_PRODUCT_BY_ID,
} from "../utils/GQLqueries";

import { ADD_PRODUCT, UPDATE_PRODUCT } from "../utils/mutations";

import COATable from "./COADocumentsTable";

import { useMediaQuery } from "react-responsive";

import { useHistory } from "react-router-dom";

const COADocument = (props) => {
  const [addProduct, { data: addedProductData }] = useMutation(ADD_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const { productID } = useParams();

  const productIDInt = parseInt(productID);
  const history = useHistory();

  const [documents, setDocuments] = useState([]);
  const [dataCategories, setdataCategories] = useState([]);
  const [region, setRegion] = useState("USA");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState(1);
  const [productExists, setProductExists] = useState(false);
  const [validation, setValidation] = useState(false);

  const { data, refetch } = useQuery(GET_DOCUMENTS_BY_PRODUCT_ID, {
    variables: { productID: productIDInt },
  });
  const { data: product, refetch: refetchProductInfo } = useQuery(
    GET_PRODUCT_BY_ID,
    {
      variables: { coaProductID: productIDInt },
    }
  );

  useEffect(() => {
    if (props.history.action === "PUSH") {
      refetch();
      refetchProductInfo();
    }
  }, []);

  const currentProductData = props.location.state
  ? props.location.state
  : product && product.products[0];


  useEffect(() => {

    if (currentProductData) {
      setProductExists(true)
    }
  }, []);


  const { data: categories } = useQuery(GET_CATEGORIES);

  useEffect(() => {
    if (currentProductData && currentProductData.categoryID) {
      setCategory(currentProductData.categoryID);
    }
  }, []);

  useEffect(() => {
    if (currentProductData && currentProductData.productName) {
      setProductName(currentProductData.productName);
    }

    if ( productName === "") {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }, []);

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

  useEffect(() => {
    if (currentProductData) {
      setCategory(currentProductData.categoryID);
    }
  }, [currentProductData]);

  const isMobile = useMediaQuery({
    query: "(min-device-width: 568px)",
  });

  const handleAddEditProduct = () => {
    const dataToSubmit = {};
    if (productIDInt) {
      dataToSubmit.coaProductID = productIDInt;
    }

    if (productName) {
      dataToSubmit.product = productName;
    }

    if (region) {
      dataToSubmit.region = region;
    }

    if (category) {
      dataToSubmit.categoryID = category;
    }

    const current = new Date();
    const dd = String(current.getDate()).padStart(2, "0");
    const mm = String(current.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = current.getFullYear();

    let today = mm + "/" + dd + "/" + yyyy;

    dataToSubmit.lastUpdatedOn = today;

    !props.location.state
      ? addProduct({
          variables: dataToSubmit,
        })
      : updateProduct({
          variables: dataToSubmit,
        });
    setProductExists(true);
    if (
      !props.location.state &&
      addedProductData &&
      addedProductData.addCoaProduct &&
      addedProductData.addCoaProduct.coaProduct.coaProductID
    ) {
      history.push(
        `/Coa/documents/${addedProductData.addCoaProduct.coaProduct.coaProductID}`
      );
    }
  };

  const tableData = documents && documents.length > 0 ? documents : [];

  const currentRegion =
    product && product.products[0] && product.products[0].region;

  const currentCategory =
    product && product.products[0] && product.products[0].category;

  const evaluatedRouteProductID =
    product && product.products[0] && product.products[0].coaProductID
      ? product.products[0].coaProductID
      : (!props.location.state &&
          addedProductData &&
          addedProductData.addCoaProduct &&
          addedProductData.addCoaProduct.coaProduct.coaProductID) ||
        0;

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
          value={productName}
          onChange={(e) => {
            setProductName(e.target.value);
            if (e.target.value === "") {
              setValidation(true);
            } else {
              setValidation(false);
            }
          }}
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
            value={region || currentRegion}
            id="regions"
            style={{
              marginLeft: !isMobile ? "89px" : "90px",
              border: "1px solid #0F4B8F",
              width: "200px",
              height: "30px",
            }}
            onChange={(e) => {
              setValidation(false);
              setRegion(e.target.value)
            }}
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
            value={category || currentCategory}
            id="categories"
            onChange={(e) => {
              setValidation(false);
              setCategory(parseInt(e.target.value))}}
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
          <StyledButton
            disabled={validation}
            onClick={handleAddEditProduct}
          >
            Save
          </StyledButton>
        </div>
      </div>
      <hr style={{ backgroundColor: "#d0d0d0", height: "1px" }} />
      <Container>
        <p style={{ fontSize: "32px" }}>Product COAs</p>
        <Link
          to={{
            pathname: `/COA/add/${evaluatedRouteProductID}/`,
        }}
        >
          <StyledButton disabled={!productExists && props.match.params.productID}>
            Add New COA
          </StyledButton>
        </Link>
      </Container>

      <COATable
        tableData={tableData}
        productID={
          product && product.products[0] && product.products[0].coaProductID
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
