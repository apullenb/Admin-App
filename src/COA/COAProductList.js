import React, { useState, useEffect } from "react";
import { Row, Col, FormControl, Button } from "react-bootstrap/";
import styled from "styled-components";
import { connect } from 'react-redux';
import COAProduct from "./COAProduct";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_PRODUCTS } from "../utils/GQLqueries";
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
import SpinnerLoader from "../GlobalComponents/ZilisSpinnerLoader";
import getPermissions from "./Selector";
import { useToasts } from 'react-toast-notifications';

const COAProductList = (props) => {
  const {error, loading, data, refetch } = useQuery(GET_PRODUCTS);
  const [products, setProducts] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  // const products = data?.products || [];
  const permissionFeched=true
  const view=true
  const edit=true

  
const {  PermissionsError}=props;
const { addToast } = useToasts();
  useEffect(() => {
      getProducts()
  }, [data]);
  useEffect(() => {
    if(data !== undefined)
    {
     console.log(error);
       refetch();
    }else if (data === undefined && loading===true){
     console.log(error,data);
      
    addToast('The information failed to load. Please refresh the page. Contact IT if the problem continues.', {
      appearance: 'error',
    })    
    }
    // console.log({data})
    // addToast('The information failed to load. Please refresh the page. Contact IT if the problem continues.', {
    //   appearance: 'error',
    // })

    // if(error){
    //   console.log(error);
      
    // }
  }, []);

  useEffect(() => {
    filter();
  }, [value, category]);

  const getProducts = () => {
    setProducts(data?.products || []);
  };

  const handleChange = (e, cat) => {
    setValue(e.target.value);
    setCategory(cat);
    if (value === "" || value === undefined || value === "All") {
      getProducts();
    }
  };

  const filter = () => {
    let temp = [];
    products &&
      products.filter((product) => {
        if (
          (product[category] && product[category].includes(value)) ||
          (product[category] && product[category].toLowerCase().includes(value))
        ) {
          temp.push(product);
        }
      });
    if (temp.length > 0) {
      setProducts(temp);
    } else {
      setValue("");
    }
  };

  return (<>
   {!loading && permissionFeched? (view ? <Table>
      <h1>COA Products</h1>
     { edit && <Row>
        <Col md={12} className="text-right">
          <Link to={{ pathname: "/Coa/documents/0" }}>
            <CustomButton>Add Products</CustomButton>
          </Link>
        </Col>
      </Row>}
      <Row className="search-box">
        <Col>
          <input
            placeholder="Product Name"
            onChange={(e) => handleChange(e, "productName")}
          />
        </Col>
        <Col>
          <select
            name="Product Category"
            defaultValue="Product Category"
            onChange={(e) => handleChange(e, "category")}
          >
            <option value="Product Category" disabled>
              Product Category
            </option>
            <option value="UltraCell">UltraCell</option>
            <option value="Lishe">Lishé</option>
            <option value="All">Show All</option>
          </select>
        </Col>
        <Col>
          <select
            name="Region"
            defaultValue="Region"
            onChange={(e) => handleChange(e, "region")}
          >
            <option value="Region" disabled>
              Region
            </option>
            <option value="USA">USA</option>
            <option value="EU">Europe</option>
            <option value="LATAM">LATAM</option>
            <option value="All">Show All</option>
          </select>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row className="name">
        <Col>Product Name</Col>
        <Col>Product Category</Col>
        <Col>Region</Col>
        <Col>Last Updated</Col>
        {edit && <Col>Actions</Col>}
      </Row>
      {!error && (view ? products?.length>0 &&
        products.map((product) => (
          <COAProduct
            key={product.coaProductID}
            product={product}
            fetch={setProducts}
            edit={edit}
          />
        )):<Redirect to='/NoPermission'/>)}
    </Table>:<Redirect to='NoPermission'/>):<SpinnerLoader/>}
    </>
  );
};
export default connect(getPermissions )(COAProductList);

const Table = styled.div`
  margin: 2% 2% 9%;
  max-width: 1600px;

  h1 {
    margin: 0 1%;
  }

  .search-box {
    margin: 10px 0px;
  }

  .search-box input {
    width: 100%;
    padding: 3px;
    font: Segoe UI;
    font-size: 15px;
    border: 1px solid #0f4b8f;
    letter-spacing: 0px;
    color: #0f4b8f;
    opacity: 0.4;
  }

  .search-box select {
    padding: 3px;
    width: 100%;
    border: 1px solid #0f4b8f;
    font: Segoe UI;
    font-size: 15px;
    letter-spacing: 0px;
    color: #0f4b8f;
    opacity: 0.5;
  }

  .search-box select option[disabled] {
    font-weight: 600;
  }
  .name {
    margin: 15px 0px;
    text-align: left;
    font: Segoe UI;
    font-size: 20px;
    color: #707070;
    opacity: 1;
  }

  .products {
    text-align: left;
    font: Segoe UI;
    font-size: 20px;
    opacity: 1;
    margin: 15px 0px;
    padding: 0;
  }

  #edit {
    margin: 0px;
    padding: 0;
  }
`;

const CustomButton = styled.button`
  background-color: #0f4b8f;
  color: white;
  font-size: 14px;
  margin: 6px 0%;
  border: none;
  padding: 3px 14px;
  font-weight: 500;
  text-align: center;

  &:hover {
    background: #345880;
    border: none;
    padding: 2px 13px;
  }
`;
