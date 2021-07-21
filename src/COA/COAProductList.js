import React, {useState, useEffect} from "react";
import { Row, Col, FormControl, Button } from "react-bootstrap/";
import styled from "styled-components";
import COAProduct from "./COAProduct";
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCTS } from '../utils/GQLqueries';


const COAProductList = () => {
const { loading, data } = useQuery(GET_PRODUCTS);
const [productsState, setProductsState] = useState([])

const products = data?.products || [];
const [search, setSearch] = useState('');
const [searchValue, setSearchValue] = useState([]);

 
useEffect(() => {
getProducts();
console.log(productsState);
}, [products]);

const getProducts = () => {
  setProductsState(products);
}

const handleSearchChange = event => {
  const filteredList = productsState.filter(product => product.productName.includes(event)
  );
  setSearchValue(filteredList);
  console.log(searchValue, 'Break');
}


useEffect(() => {
  if (data) {
    handleSearchChange(search);
  }
}, [data, search]);


  return (
    <Table>
      <h1>COA Products</h1>
      <Row>
      <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col><CustomButton>Add Products</CustomButton></Col>
        
      </Row>
      <Row className="search-box">
        <Col><input defaultValue="Product Name" value={search} onChange={(e) => setSearch(e.target.value)}/></Col>
        <Col>
          <select name="Product Category" defaultValue='Product Category' >
          <option value='Product Category' disabled>Product Category</option>
            <option value="UltraCell">UltraCell</option>
            <option value="Lishé">Lishé</option>
            <option value="All">Show All</option>
          </select>
        </Col>
        <Col>
          <select name="Region" defaultValue='Region' >
          <option value='Region' disabled>Region</option>
            <option value="USA">USA</option>
            <option value="Europe">Europe</option>
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
      {search === "" ? productsState && productsState.length >= 1 && productsState.map(product => <COAProduct key={product.coaProductID} product={product} /> )
      : searchValue.map(product => <COAProduct key={product.coaProductID} product={product} /> )
      };
        
 
    </Table>
  );
};

export default COAProductList;

const Table = styled.div`
  margin: 2% 1% 9%;
  max-width: 1200px;


  .search-box {
    margin: 0 2px;
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


