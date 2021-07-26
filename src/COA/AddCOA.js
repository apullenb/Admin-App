import React , { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Row, Col, FormControl, Button } from 'react-bootstrap/';
import styled from "styled-components";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ADD_DOCUMENT, EDIT_DOCUMENT  } from '../utils/mutations';
import {GET_DOCUMENT_BY_ID} from '../utils/GQLqueries';
import { Redirect } from 'react-router-dom';

const AddCOA = () => {
const [batchText, setBatchText] = useState('');
const { productID, coaDocumentID } = useParams();
const productIDInt = parseInt(productID);
const coaDocumentIDInt = parseInt(coaDocumentID);


const { loading, data }  = useQuery(GET_DOCUMENT_BY_ID, {
   variables: {coaProductID: productIDInt, coaDocumentID: coaDocumentIDInt }
});

const [addDocument] = useMutation(ADD_DOCUMENT);

const products = data?.products || [];

    const handleSaveCoa = async event => {
        console.log("btn was clicked");
        event.preventDefault();
        try {
            await addDocument({
                variables: { productIDInt }
              });
              setBatchText('');
           //   return <Redirect to='/COA/:productId' />
        } catch (e) {
            console.error(e);
          }
//after save the COA, redirect them to the product edit list
    }

    const uploadCoa = () => {

    }

    const handleBatchText = event => {
        setBatchText(event.target.value);
    };

    if (loading) {
        return <div>Loading...</div>;
      }

    return (    
    <PageWrapper>
                <Row className="text-left">
                    <Col xl={10} lg={10} md={10} sm={6} xs={6} ><h1 className="text-secondary">COA Details</h1></Col>
                    <Col xl={2} lg={2} md={2} sm={6} xs={6}>Back to list</Col>
                </Row>
                <Row className="text-left">
                    <Col xl={2} lg={2} md={2} sm={2} xs={2}><p className="text-secondary">Product</p></Col>
                    <Col xl={2} lg={2} md={2} sm={2} xs={2}><p className="text-secondary">{products[0].productName}</p></Col>
                    <Col xl={1} lg={1} md={1} sm={1} xs={1}></Col>
                    <Col xl={1} lg={1} md={1} sm={1} xs={1}></Col>
                    <Col xl={1} lg={1} md={1} sm={1} xs={1}><p className="text-secondary">Region</p></Col>
                    <Col  xl={1} lg={1} md={1} sm={1} xs={1}><p className="text-secondary">{products[0].region}</p></Col>
                    <Col xl={2} lg={2} md={2} sm={2} xs={2}></Col>
                    <Col xl={2} lg={2} md={2} sm={2} xs={2}></Col>
                </Row>
                <SolidLine/>
                <Row className="text-left mt-3">
                    <Col xl={2} lg={2} md={2} sm={2} xs={2}><p className="text-secondary">Batch Number</p></Col>
                    <Col xl={2} lg={2} md={2} sm={2} xs={2}><input value={batchText}  onChange={handleBatchText}></input></Col>
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
                <Col xl={2} lg={2} md={2} sm={2} xs={2}> <SaveButton onClick={handleSaveCoa}>Save</SaveButton></Col>
                </Row>
        </PageWrapper>
    )
}

export default AddCOA;
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