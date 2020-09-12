import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import Button from "react-bootstrap/Button";
import Product from './product';
import AddProduct from './addProduct';


import {
  Link,
  Route,
  Switch,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Styled from "styled-components";

const ProductBodyWrapper = Styled.div`
    display:flex;
    flex-direction:row ;
 `;

const ProductsWrapper = Styled.div`
    display:flex;
    flex-direction:column;
    overflow: auto;
    width:275px;
    height:500px;
    box-shadow: 0 5px 8px 0 rgba(0,0,0,0.3);
`;

const ListWrapper = Styled.div`
    list-style:none;
    padding:5%;
`;

const ProductWapper = Styled.div`
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
  background-color: rgba(52,58,64,0.8);
  border:2px solid rgba(0,0,0,0.5);
  border-radius:8px;
  padding: 1%;
  color:#fff;
  
`;

const Products = (props) => {
  let { path, url } = useRouteMatch();
    

  return (
    <ProductBodyWrapper>
      <ProductsWrapper>
        <h2>Products page</h2>
        <Button
          variant="primary"
          onClick={() => {
            props.handlegetAllProducts();
          }}
        >
          {props.isLoading? 'Loading...'  :  'Get all Products'}
        </Button>
        <ListWrapper>
          {props.products.map((product) => {
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
