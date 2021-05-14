import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Product from './product';
import AddProduct from './addProduct';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Styled from "styled-components";
import {
  Link,
  Route,
  Switch,
  useRouteMatch
} from "react-router-dom";


const ProductBodyWrapper = Styled.div`
    display:flex;
    flex-direction:row ;
 `;

const ProductsWrapper = Styled.div`
    display:flex;
    flex-direction:column;
    overflow: auto;
    min-width:300px;
    max-width:300px;
    height:500px;
    box-shadow: 0 5px 8px 0 rgba(0,0,0,0.3);
`;

const ListWrapper = Styled.div`
    list-style:none;
    padding:5%;
`;

const ProductWapper = Styled.div`
    background-color: #F0F1F2;
    width:100%;
    height:100vh;
    margin: 0 10px;
    overflow:auto;
    padding: 2%;
    box-shadow: 0 5px 8px 0 rgba(0,0,0,0.5);
`;

const AddProductWrapper = Styled.div`
  width:80%;
  margin-left:10%;
  margin-bottom:5%;
  display:flex;
  justify-content:flex-start;
`;

const AddProductButtonWrapper = Styled.span`
  width:100%;
  background-color: rgba(52,58,64,0.8);
  border:2px solid rgba(0,0,0,0.5);
  border-radius:8px;
  padding: 1%;
  color:#fff;
  
`;

const Products = (props) => {
  let { path, url } = useRouteMatch();

  const products = props.products;
  const [productsArray, setProducts] = useState(products);

  useEffect(()=>{
      setProducts(products);  // we use this in order to force reload of products on reload or if the porducts from parent props update
  },[products])

  const filterItems = (filter) => { //search products
      const filterdItems = products.filter(item => { 
        if (item.sku.includes(filter.toUpperCase())){
           return item;
          }
      });
      setProducts(filterdItems);
  }

  return (
    <ProductBodyWrapper>
      <ProductsWrapper>
        <h2>Products page</h2>

        <InputGroup className="mb-2 mr-sm-2">
        <InputGroup.Prepend>
        <InputGroup.Text><i class="fas fa-binoculars"></i></InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl type='text' name='search' onChange={(e)=>{filterItems(e.target.value)}} placeholder="Search..."  />
        </InputGroup>

        <Button
          variant="primary"
          onClick={() => {
            props.handlegetAllProducts();
          }}
        >
          {props.isLoading? 'Loading...'  :  'Get all Products'}
        </Button>
        <ListWrapper>
          {(productsArray||[]).map((product) => {
            return (
              <li key={product.id}>
                <Link to={`${url}/${product.id}`}>{product.sku}</Link>
              </li>
            );
          })}
        </ListWrapper>
      </ProductsWrapper>

      <ProductWapper>
        <AddProductWrapper>
        <AddProductButtonWrapper>
          <label className='add-button-label form-labels'>Create A New Product</label><Link to={`${url}/addProduct`}><Button variant="success" style={{fontSize:30, width:'50px'}}>&#43;</Button></Link>
          </AddProductButtonWrapper>
        </AddProductWrapper>

        <Switch>
          <Route exact path={path}></Route>
          <Route  path={`${path}/addProduct`}>
             <AddProduct 
              handlegetAllProducts={props.handlegetAllProducts}
             />
          </Route>

          <Route  path={`${path}/:id`}>
            <Product
              products={props.products}
              handlegetAllProducts={props.handlegetAllProducts}
            />
          </Route>
        </Switch>
      </ProductWapper>
    </ProductBodyWrapper>
  );
};


export default Products;
