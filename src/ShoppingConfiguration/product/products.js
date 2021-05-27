import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import Button from "react-bootstrap/Button";
import Product from './product';
import AddProduct from './addProduct';
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import PageWrapper from '../../GlobalComponents/PageWrapper';
import {handleFetchProductsAsync} from '../../redux/actions/ProductConfig/productConfig/productActions';

import {
  Link,
  Route,
  Switch,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Styled from "styled-components";


const ProductBodyWrapper = Styled.div`
    width:90%;
    display:flex;
    flex-direction:row ;
    margin: 0 auto;
    padding:2%;
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
  const dispatch = useDispatch();
  const { products, fetching } = useSelector(state => state.products)
  let { path, url } = useRouteMatch();
  const [productsArray, setProducts] = useState([]);

  useEffect(()=>{
    dispatch(handleFetchProductsAsync());
  },[])

  useEffect(()=>{
    console.log(products)
      setProducts(products); 
  },[products])


  const filterItems = (filter) => { //search products
      const filterdItems = productsArray.filter(item => { 
        if (item.sku.includes(filter.toUpperCase())){
           return item;
          }
      });
      setProducts(filterdItems);
  }

  return (
    <PageWrapper>
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
          {fetching? 'Loading...'  :  'Get all Products'}
        </Button>
        <ListWrapper>
          {productsArray && productsArray.map((product) => {
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

          <Route path={`${path}/:id`}>
            <Product
              products={props.products}
              handlegetAllProducts={props.handlegetAllProducts}
            />
          </Route>
        </Switch>
      </ProductWapper>
    </ProductBodyWrapper>
    </PageWrapper>
  );
};


export default Products;
