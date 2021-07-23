import React, {useState, useEffect} from "react";
import { Row, Col, FormControl, Button } from "react-bootstrap/";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import moment from "moment";
import ConfirmDel from "./ConfirmDel";



function COAProduct(props) {

   const [showDel, setShowDel] = useState('hide')
   const productName = ReactHtmlParser(props.product.productName);
   const date = props.product.lastUpdatedOn;
   const updated = moment(date).format("L");
   
 

   const showDelete = () => {
   showDel === 'hide' ? setShowDel('show') : setShowDel('hide')
   };

    return (
    <div>
        <Row className='products'>
        <Col>{productName}</Col>
        <Col>{props.product.category}</Col>
        <Col>{props.product.region}</Col>
        <Col>{updated}</Col>
        <Col> <Link to={{ pathname: `/COA/${props.product.coaProductID}`, state: props.product}}>
                        <button id="edit">Edit</button>
                      </Link> |  <button id="edit" onClick={showDelete}>Delete</button> </Col>
        </Row>
        <Delete><div className={showDel}><ConfirmDel product={props.product} show={showDelete} /></div></Delete>
        </div>
    )
}

export default COAProduct

const Delete = styled.div `
.hide {
  display:none;
}

.show {
  z-index: 2;
  position: absolute;
  left: 35%;
  top: 35%;
  background: white;
  border: 1px solid gray;
  padding: 3%;
  box-shadow: 2px 3px 5px gray;
  max-width: 500px;
}
`