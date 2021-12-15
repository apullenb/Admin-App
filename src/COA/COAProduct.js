import React, {useState} from "react";
import { Row, Col} from "react-bootstrap/";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import moment from "moment";
import ConfirmDel from "./ConfirmDel";

function COAProduct(props) {
  const productName = ReactHtmlParser(props.product.productName);
  const date = props.product.lastUpdatedOn.substr(0, props.product.lastUpdatedOn.indexOf("Z"));
  const updated = moment(date).format("MM/DD/YYYY");
  const handleDelete = () => {
  };

   const [showDel, setShowDel] = useState('hide')

 

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
       {props.edit && <Col> <Link to={{ pathname: `/Coa/documents/${props.product.coaProductID}`, state: props.product}}>
                        <button id="edit">Edit</button>
                      </Link> |  <button id="edit" onClick={showDelete}>Delete</button> </Col>}
        </Row>
        <Delete><div className={showDel}><ConfirmDel product={props.product} type={'Product'} fetch={props.fetch} show={showDelete} name={productName}/></div></Delete>
        <Overlay showDel={showDel}/>
        </div>
    )
}

export default COAProduct

const Overlay = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: 10;
background-color: rgba(0,0,0,0.5);
visibility: ${(props) => props.showDel === 'show' ? 'visible': 'hidden'};
`

const Delete = styled.div `
.hide {
  display:none;
}

.show {
  z-index: 11;
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
