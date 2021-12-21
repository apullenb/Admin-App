import React , { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import {Row, Col } from 'react-bootstrap/';
import styled from "styled-components";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ADD_DOCUMENT } from '../utils/mutations';
import {GET_PRODUCT_BY_ID } from '../utils/GQLqueries';
import ReactHtmlParser from "react-html-parser";
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';

const AddCOA = () => {

    
    const [batchNumber, setBatchNumber] = useState('');
    const [isExternal, setIsExternal] = useState(0);
    const [fileInput, setFileInput] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [uploadSuccessful, setUploadSuccessful] = useState(false);
    const [cloudinaryUrl, setCloudinaryUrl] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [hasBlankBatchNumber, setHasBlankBatchNumber] = useState(false);

    const { addToast} = useToasts();
    const uploadedOn = new Date().toISOString();
    const sortOrder = 1;
    const { productID } = useParams();
    const productIDInt = parseInt(productID);
    const history = useHistory()


    //cloudinary
    const dataCld = new FormData()
    dataCld.append("file", selectedFile)
    dataCld.append("upload_preset", "coa-documents")
    dataCld.append("cloud_name", "zilis")

    const cloudinaryUpload = () =>{
        axios.post('https://api.cloudinary.com/v1_1/zilis/upload', dataCld, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })

        .then(res =>  {
            if (res.data.url !== "") {
                setCloudinaryUrl(splitCloudinaryUrl(res.data.url));
                setUploadSuccessful(true);
            }
        })
        .catch(err => {
            console.error(err.message);
            addToast("Error occured while uploading COA or you did not choose a file to upload. ", {appearance: 'error', autoDismiss: true})
        })

    }

    const splitCloudinaryUrl = (url) => {
    const filePath = url.split('/');
    const newFilePath = `${filePath[6]}/admin.coa/coa/${filePath[9]}`;
    return newFilePath;
    }

    useEffect(() => {
        setFileUrl(cloudinaryUrl);
    }, [cloudinaryUrl])

    useEffect(() => {
         refetch();
    }, [])


    const { loading, data, refetch }  = useQuery(GET_PRODUCT_BY_ID , {
    variables: {coaProductID: productIDInt}
    });

    const [addDocument] = useMutation(ADD_DOCUMENT);

    const products = data?.products || [];

    const handleSaveCoa = async event => {
        event.preventDefault();
        if (!batchNumber)  {
            handleValidation();
        }
        try {
            if (batchNumber) {
            await addDocument({
                variables: { coaProductID: productIDInt, batchNumber, isExternal, uploadedOn, fileUrl, sortOrder }
              });
              addToast('COA added successfully!', {appearance: 'success', autoDismiss: true})
              setBatchNumber('');
              
              redirect();
            }
        } catch (e) {
            console.error(e);
            addToast('Error occured while uploading COA!', {appearance: 'error', autoDismiss: true})
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

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setFileInput(e.target.value);
    }


    if (loading) {
        return <div>Loading...</div>;
      }

    return (  

        <PageWrapper>
            <Row className="text-left">
                <Col xs={6} md={10}> <h1 className="text-secondary">COA Details</h1></Col>
                <Col xl={2} xs={6}><Link onClick={redirect}>Back to list</Link></Col>
            </Row>
            <Row className="text-left">
                <Col xl={2}><p className="text-secondary">Product</p></Col>
                <Col xl={2}><p className="text-secondary">{ReactHtmlParser(products[0] && products[0].productName)}</p></Col>
                <Col xl={1}></Col>
                <Col xl={1}></Col>
                <Col xl={1}><p className="text-secondary">Region</p></Col>
                <Col  xl={1}><p className="text-secondary">{products[0] &&  products[0].region}</p></Col>
                <Col xl={2}></Col>
                <Col xl={2}></Col>
            </Row>
            <SolidLine/>
            <Row className="text-left mt-3">
                <Col xl={2}><p className="text-secondary">Batch Number</p></Col>
                <Col xl={2}><input value={batchNumber}  onChange={handleBatchNumber}></input></Col>
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
            <Row className="text-left">
                <Col xl={2}><p className="text-secondary">File</p></Col>
                <Col xl={2}><input type="file" name="document" onChange={handleFileInputChange} value ={fileInput}/></Col>
                <Col xl={2}></Col>
                <Col xl={3}></Col>
                <Col xl={6}></Col>
            </Row>
            <Row className="text-left">
                <Col xl={2}></Col>
                <Col xl={2}><CustomButton onClick = {cloudinaryUpload}>Upload</CustomButton></Col>
                <Col xl={2}></Col>
                <Col xl={3}></Col>
                <Col xl={6}></Col>
            </Row>
         
            <Row className="text-left">
                <Col xl={2}> 
                    {!uploadSuccessful && (
                        <DisabledSaveButton disabled ={!uploadSuccessful}>Save</DisabledSaveButton> )}
                    {uploadSuccessful && (
                        <SaveButton onClick={handleSaveCoa }>Save</SaveButton>)}
                </Col>
                <Col xl={2}></Col>
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

  &disabled {
    background: #dddddd;
  }
`;

const DisabledSaveButton = styled.button`
background-color: #D3D3D3;
color: white;
font-size: 14px;
margin: 3px;
border: none;
padding: 2px 15px;
font-weight: 500;
width: 100px;
text-align: center;
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


