import React , { useState } from 'react';
import { useParams,  Link, useHistory } from 'react-router-dom';
import {Row, Col } from 'react-bootstrap/';
import styled from "styled-components";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { EDIT_DOCUMENT  } from '../utils/mutations';
import {GET_DOCUMENT_BY_ID} from '../utils/GQLqueries';
import ReactHtmlParser from "react-html-parser";
import { useToasts } from 'react-toast-notifications';

const EditCOA = () => {
const [batchNumber, setBatchNumber] = useState('');
const [isExternal, setIsExternal] = useState(0);
const { productID, coaDocumentID } = useParams();
const productIDInt = parseInt(productID);
const coaDocumentIDInt = parseInt(coaDocumentID);
const uploadedOn = new Date().toISOString();
const { addToast} = useToasts();
const history = useHistory()

//error handling 
const [hasBlankBatchNumber, setHasBlankBatchNumber] = useState(false);


const { loading, data }  = useQuery(GET_DOCUMENT_BY_ID, {
   variables: {coaProductID: productIDInt, coaDocumentID: coaDocumentIDInt, batchNumber, isExternal, uploadedOn }
});

const [editDocument] = useMutation(EDIT_DOCUMENT);

const products = data?.products || [];
const documents = data?.documents || [];

    const handleSaveCoa = async event => {
        event.preventDefault();
        if (!batchNumber)  {
            handleValidation();
        }
        try {
            if (batchNumber) {
            await editDocument({
                variables: { coaProductID: productIDInt, coaDocumentID: coaDocumentIDInt, batchNumber, isExternal, uploadedOn }
              });
              addToast('COA updated successfully!', {appearance: 'success', autoDismiss: true})
              setBatchNumber('');

              redirect();
            }
        } catch (e) {
            console.error(e);
            addToast('Error occured while updating COA!', {appearance: 'error', autoDismiss: true})
          }
    }

    const handleValidation = () => {
        if (!batchNumber) {
            setHasBlankBatchNumber(true);
        }

    }

    const handleBatchNumber = event => {
        setBatchNumber(event.target.value);
    };

    const handleIsExternal = () => {
        setIsExternal(1);
    };

    const redirect = () => {
        history.push(`/Coa/documents/${productIDInt}`);
    }


    if (loading) {
        return <div>Loading...</div>;
      }

    return (    
    <PageWrapper>
                <Row className="text-left">
                    <Col xs={6} md={10} ><h1 className="text-secondary">COA Details</h1></Col>
                    <Col md={2} xs={6}><Link onClick={redirect}>Back to list</Link></Col>
                </Row>
                <Row className="text-left">
                    <Col xl={2}><p className="text-secondary">Product</p></Col>
                    <Col xl={2}><p className="text-secondary">{ReactHtmlParser(products[0].productName)}</p></Col>
                    <Col xl={1}></Col>
                    <Col xl={1}></Col>
                    <Col xl={1}><p className="text-secondary">Region</p></Col>
                    <Col  xl={1}><p className="text-secondary">{products[0].region}</p></Col>
                    <Col xl={2}></Col>
                    <Col xl={2}></Col>
                </Row>
                <SolidLine/>
                <Row className="text-left mt-3">
                    <Col xl={2}><p className="text-secondary">Batch Number</p></Col>
                    <Col xl={2}><input type="text" value={batchNumber} onChange={handleBatchNumber}></input></Col>
                    <Col xl={2}></Col>
                    <Col xl={6}></Col>
                </Row>
                <Row>
                {hasBlankBatchNumber && (
                    <small className='form-text text-danger'>
                      Batch Number cannot be blank.
                    </small>
                  )}
                </Row>
                <Row className="text-left">
                    <Col xl={2}><p className="text-secondary">Is External</p></Col>
                    <Col xl={2}><CheckBox value={isExternal} onClick={handleIsExternal} type="checkbox"/></Col>
                    <Col xl={2}></Col>
                    <Col xl={6}></Col>
                </Row>
                <Row>&nbsp;</Row><Row>&nbsp;</Row><Row>&nbsp;</Row><Row>&nbsp;</Row><Row>&nbsp;</Row>
                <Row className="text-left">
                <Col xl={2}> 
                    <SaveButton onClick={handleSaveCoa}>Save</SaveButton>

                </Col>
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