import React, {useState, useEffect} from "react";
import { Row, Col, FormControl, Button } from "react-bootstrap/";
import styled from "styled-components";
import COAProduct from "./COAProduct";


const COAProductList = () => {

const [products, setProducts] = useState('')
const [value, setValue] = useState('')
const [category, setCategory] = useState('')


useEffect(() => {
getProducts()
}, [])

useEffect(() => {
  filter()
  }, [value, category])

const getProducts = () => {

const testProducts = [
  {id: 1, productName: '<b>ULTRACELL <span style="color:#CD1971">BERRY</span></b>', region: 'USA' , category: 'UltraCell' },
  {id: 2, productName: '<b><span style="color:#1A1818">FOAMING CLEANSER</span></b>', region: 'USA' , category: 'UltraCell' },
  {id: 3, productName: '<b>ULTRACELL <span style="color:#CD1971">BERRY</span></b>', region: 'USA' , category: 'UltraCell' },
  {id: 7, productName: '<b>ULTRA<span style="color:#8900C6">BLISS</span></b>', region: 'USA' , category: 'Lishé' },
  {id: 4, productName: '<b>ULTRACELL <span style="color:#FAE019">LEMON</span></b>', region: 'Europe' , category: 'UltraCell' },
  {id: 5, productName: '<b>ULTRA<span style="color:#8900C6">BLISS</span></b>', region: 'USA' , category: 'Lishé' },
  {id: 6, productName: '<b>ULTRA<span style="color:#8900C6">BLISS</span></b>', region: 'Europe' , category: 'Lishé' },
  {id: 8, productName: '<b><span style="color:#1A1818">FOAMING CLEANSER</span></b>', region: 'LATAM' , category: 'UltraCell' },
]
  setProducts(testProducts)
}
  
const handleChange = (e, cat) => {
  setValue(e.target.value);
  console.log(e.target.value)
  setCategory(cat);
  console.log(category, value)
  if (value === "" || value === undefined || value === 'All') {
    getProducts();
  }
};


const filter = () => {
 
  let temp = [];
  products && products.filter((product) => {
      if (
        (product && product[category].includes(value)) ||
        product[category].toLowerCase().includes(value)
      ) {
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
        <Col><CustomButton>Add Products</CustomButton></Col>
        
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
      
        {products && products.map(product => <COAProduct key={product.id} product={product} /> )}
 
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


