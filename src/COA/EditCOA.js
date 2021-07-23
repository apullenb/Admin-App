import React from 'react';
import {Row, Col, FormControl, Button } from 'react-bootstrap/';
import styled from "styled-components";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ADD_DOCUMENT, EDIT_DOCUMENT  } from '../utils/mutations';
import { GET_PRODUCTS, GET_PRODUCT_BY_ID } from '../utils/GQLqueries';

const EditCOA = () => {
const data  = useQuery(GET_PRODUCTS);
const products = data?.products || [];


    const saveCoa = () => {
        console.log("btn was clicked");
    }

    
    const uploadCoa = () => {
        console.log("btn was clicked");
    }


    return (    
    <PageWrapper>
                <Row className="text-left">
                    <Col xl={10} lg={10} md={10} sm={6} xs={6} ><h1 className="text-secondary">COA Details</h1></Col>
                    <Col xl={2} lg={2} md={2} sm={6} xs={6}>Back to list</Col>
                </Row>
                <Row className="text-left">
                    <Col xl={2} lg={2} md={2} sm={2} xs={2}><p className="text-secondary">Product</p></Col>
                    <Col xl={2} lg={2} md={2} sm={2} xs={2}><p className="text-secondary">{products.productName}</p></Col>
                    <Col xl={1} lg={1} md={1} sm={1} xs={1}></Col>
                    <Col xl={1} lg={1} md={1} sm={1} xs={1}></Col>
                    <Col xl={1} lg={1} md={1} sm={1} xs={1}><p className="text-secondary">Region</p></Col>
                    <Col  xl={1} lg={1} md={1} sm={1} xs={1}><p className="text-secondary">{products.region}</p></Col>
                    <Col xl={2} lg={2} md={2} sm={2} xs={2}></Col>
                    <Col xl={2} lg={2} md={2} sm={2} xs={2}></Col>
                </Row>
                <SolidLine/>
                <Row className="text-left mt-3">
                    <Col xl={2} lg={2} md={2} sm={2} xs={2}><p className="text-secondary">Batch Number</p></Col>
                    <Col xl={2} lg={2} md={2} sm={2} xs={2}><input/></Col>
                    <Col xl={2} lg={2} md={2} sm={2} xs={2}></Col>
                    <Col xl={6} lg={6} md={6} sm={6} xs={6}></Col>
                </Row>
                <Row className="text-left">
                    <Col xl={2} lg={2} md={2} sm={2} xs={2}><p className="text-secondary">Is External</p></Col>
                    <Col xl={2} lg={2} md={2} sm={2} xs={2}><CheckBox type="checkbox"/></Col>
                    <Col xl={2} lg={2} md={2} sm={2} xs={2}></Col>
                    <Col xl={6} lg={6} md={6} sm={6} xs={6}></Col>
                </Row>
                <Row className="text-left">
                    <Col xl={2} lg={2} md={2} sm={2} xs={2}><p className="text-secondary">File</p></Col>
                    <Col xl={2} lg={2} md={2} sm={2} xs={2}><CustomButton onClick={uploadCoa}>Upload</CustomButton></Col>
                    <Col xl={2} lg={2} md={2} sm={2} xs={2}>File Name</Col>
                    <Col xl={3} lg={3} md={3} sm={3} xs={3}></Col>
                    <Col xl={6} lg={6} md={6} sm={6} xs={6}></Col>
                </Row>
                <Row>&nbsp;</Row><Row>&nbsp;</Row><Row>&nbsp;</Row><Row>&nbsp;</Row><Row>&nbsp;</Row>
                <Row className="text-left">
                <Col xl={2} lg={2} md={2} sm={2} xs={2}> <SaveButton onClick={saveCoa}>Save</SaveButton></Col>
                </Row>
        </PageWrapper>
    )
}

export default EditCOA;
const PageWrapper = styled.div`
  width: 1400px;
`;

const SolidLine = styled.div`
border-top: 10px;
border:solid;
color: #C8C8C8;
border-width: 1px;
`;

const CustomButton = styled.button`
background-color: #09497e;
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

const SaveButton = styled.button`
background-color: #09497e;
color: white;
font-size: 14px;
margin: 3px;
border: none;
padding: 2px 15px;
font-weight: 500;
width: 100px;
text-align: center;

&:hover {
    background: #345880;
    border: 2px solid #022b53;
    padding: 0px 13px;
  }
`;

const CheckBox = styled.input`
background-color: #09497e;

&:checked {
    background-color: #09497e !important;;
}

&:hover {
    background: #345880;
    border: 2px solid #022b53;
    padding: 0px 13px;
  }
`;