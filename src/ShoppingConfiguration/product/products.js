/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Product from "./product";
import AddProduct from "./addProduct";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ZilisLoader from "../../GlobalComponents/ZilisLoader";
import { handleFetchProductsAsync } from "../../redux/actions/Configuration/productConfig/productActions";
import "../../App.scss";

import Styled from "styled-components";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

const Products = (props) => {
  const dispatch = useDispatch();
  const { products, fetching } = useSelector((state) => state.products);
  let { path, url } = useRouteMatch();
  const [productsArray, setProducts] = useState([]);

  useEffect(() => {
    dispatch(handleFetchProductsAsync());
  }, []);

  useEffect(() => {
    setProducts(products);
  }, [products]);

  const filterItems = (filter) => {
    //search products
    const filterdItems = productsArray.filter((item) =>
      item.sku.includes(filter.toUpperCase())
    );
    setProducts(filterdItems);
  };

  return (
    <ProductBodyWrapper>
      <ProductsWrapper>
        <SearchWrapper>
          <h2>Products page</h2>
          <InputGroup className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <i className="fas fa-binoculars"></i>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="text"
              name="search"
              onChange={(e) => {
                filterItems(e.target.value);
              }}
              placeholder="Search..."
            />
          </InputGroup>
        </SearchWrapper>

        <div style={{ marginTop: "40%" }}>
          <div>
            {fetching ? (
              <ZilisLoader width={50} height={50} />
            ) : (
              <b>Products List</b>
            )}
          </div>
          <ListWrapper>
            {productsArray &&
              productsArray.map((product) => {
                return (
                  <li key={product.id}>
                    <Link to={`${url}/${product.id}`}>{product.sku}</Link>
                  </li>
                );
              })}
          </ListWrapper>
        </div>
      </ProductsWrapper>

      <ProductWapper>
        <AddProductWrapper>
          <AddProductButtonWrapper>
            <label className="add-button-label form-labels">
              Create A New Product
            </label>
            <Link to={`${url}/addProduct`}>
              <Button variant="success" style={{ fontSize: 30, width: "50px" }}>
                &#43;
              </Button>
            </Link>
          </AddProductButtonWrapper>
        </AddProductWrapper>

        <Switch>
          <Route exact path={path}></Route>
          <Route path={`${path}/addProduct`}>
            <AddProduct />
          </Route>

          <Route path={`${path}/:id`}>
            <Product />
          </Route>
        </Switch>
      </ProductWapper>
    </ProductBodyWrapper>
  );
};

export default Products;

const ProductBodyWrapper = Styled.div`
    width:90%;
    display:flex;
    flex-direction:row ;
    margin: 0 auto;
    padding:2%;
    text-align:center;
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
    z-index:1;
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

const SearchWrapper = Styled.div`
  display: flex;
  justify-content:center;
  flex-direction:column;
  position:absolute;
  width:282px;
  background-color:#5a5e63;
  border-radius:8px 0 0 0 ;

  h2{
    color:#fff;
  }
`;
