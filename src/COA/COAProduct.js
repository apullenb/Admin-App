import React, {useState, useEffect} from "react";
import { Row, Col, FormControl, Button } from "react-bootstrap/";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import moment from "moment";



function COAProduct(props) {

   const productName = ReactHtmlParser(props.product.productName)
  const date = props.product.lastUpdatedOn
  const updated = moment(date).format('L')
   const handleDelete = () => {
  console.log('delete', props.product.coaProductID)
}

    return (

        <Row className='products'>
        <Col>{productName}</Col>
        <Col>{props.product.categoryID}</Col>
        <Col>{props.product.region}</Col>
        <Col>{updated}</Col>
        <Col> <Link
                        to={{
                          pathname: `/COA/${props.product.coaProductID}`,
                          state: props.product,
                        }}
                      >
                        <button id="edit">Edit</button>
                      </Link> |  <button id="edit" onClick={handleDelete}>Delete</button> </Col>
        </Row>
    )
}

export default COAProduct
