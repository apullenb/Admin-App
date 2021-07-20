import React, {useState, useEffect} from "react";
import { Row, Col, FormControl, Button } from "react-bootstrap/";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";




function COAProduct(props) {

   const productName = ReactHtmlParser(props.product.productName)

   const handleDelete = () => {
  console.log('delete', props.product.id)
}

    return (

        <Row className='products'>
        <Col>{productName}</Col>
        <Col>{props.product.categoryID}</Col>
        <Col>{props.product.region}</Col>
        <Col>Last Updated</Col>
        <Col> <Link
                        to={{
                          pathname: `/Coa/edit/${props.product.id}`,
                          state: props.product,
                        }}
                      >
                        <button id="edit">Edit</button>
                      </Link> |  <button id="edit" onClick={handleDelete}>Delete</button> </Col>
        </Row>
    )
}

export default COAProduct
