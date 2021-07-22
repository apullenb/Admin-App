import React, {useState, useEffect} from "react";
import { Row, Col, FormControl, Button } from "react-bootstrap/";
import styled from "styled-components";
import COAProduct from "./COAProduct";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_PRODUCTS } from '../utils/GQLqueries';
import { REMOVE_PRODUCT  } from '../utils/mutations'
import { Link } from "react-router-dom";


const COAProductList = () => {
  const { loading, data } = useQuery(GET_PRODUCTS);
const [products, setProducts] = useState("")
const [value, setValue] = useState('')
const [category, setCategory] = useState('')
// const products = data?.products || [];

useEffect(() => {
  getProducts()
  }, [data])
  


useEffect(() => {
  filter()
  }, [value, category])

const getProducts = () => {
  setProducts(data?.products || [])
  console.log(products)
}
  
const handleChange = (e, cat) => {
  setValue(e.target.value);
  setCategory(cat);
  console.log(category, value)
  if (value === "" || value === undefined || value === 'All') {
    getProducts()
  }
};


const filter = () => {
 
  let temp = [];
  products && products.filter(product => {
    console.log(product[category])
      if (product[category] && product[category].includes(value) || product[category] &&
        product[category].toLowerCase().includes(value)) {
        temp.push(product);
      }
    });
  if (temp.length > 0) {
    setProducts(temp);
    
  } else {
    setValue("");
    console.log(value)
  }
};



  return (
    <Table>
      <h1>COA Products</h1>
      <Row>
      <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col><Link to={{pathname: '/COA/0'}}><CustomButton>Add Products</CustomButton></Link></Col>
      </Row>
      <Row className="search-box">
        <Col><input defaultValue="Product Name" onChange={(e)=>handleChange(e, 'productName')}/></Col>
        <Col>
          <select name="Product Category" defaultValue='Product Category' onChange={(e)=>handleChange(e, 'category')}>
          <option value='Product Category' disabled>Product Category</option>
            <option value="UltraCell">UltraCell</option>
            <option value="Lishé">Lishé</option>
            <option value="All">Show All</option>
          </select>
        </Col>
        <Col>
          <select name="Region" defaultValue='Region' onChange={(e)=>handleChange(e, 'region')}>
          <option value='Region' disabled>Region</option>
            <option value="USA">USA</option>
            <option value="EU">Europe</option>
            <option value="LATAM">LATAM</option>
            <option value="All">Show All</option>
          </select>
        </Col>
        <Col></Col>
        <Col></Col>
      
        
      </Row>
      <Row className='name'>
        <Col>Product Name</Col>
        <Col>Product Category</Col>
        <Col>Region</Col>
        <Col>Last Updated</Col>
        <Col>Actions</Col>
      </Row>
      
        {products && products.length >= 1 && products.map(product => <COAProduct key={product.coaProductID} product={product} /> )}
 
    </Table>
  );
};

export default COAProductList;

const Table = styled.div`
  margin: 2% 12% 9%;
  max-width: 1400px;

  h1 {
    margin: 0 1%;
  }

  .search-box {
    margin: 0 0px;
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
    margin: 0px;
    text-align: left;
    font: Segoe UI;
    font-size: 19px;
    color: #707070;
    opacity: 1;
  }

  .products {
    text-align: left;
    font: Segoe UI;
    font-size: 20px;
    opacity: 1;
    margin: 10px 0;
    padding: 0;
  }



`;

const CustomButton = styled.button`
  background-color: #0F4B8F;
  color: white;
  font-size: 14px;
  margin: 3px;
  border: none;
  padding: 2px 15px;
  font-weight: 500;
  width: 150px;
  text-align: center;

  &:hover {
    background: #345880;
    border: 2px solid #022b53;
    padding: 0px 13px;
  }
`;


