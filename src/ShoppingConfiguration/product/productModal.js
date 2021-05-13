import React from 'react';
import ModalTypes from './modalTypes';
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";




const ProductModal = props => {

    switch (props.modalType) {

        case ModalTypes.DELETE: 
            return (
                <Modal
                show={props.showModal}
                onHide={props.handleCloseModal}
                backdrop="static"
                keyboard={false}
              >
                  <Modal.Header closeButton>
                    <Modal.Title>Delete Product</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h5>
                    You are about to delete this product...
                    </h5>
                    <Form.Group as={Row} controlId="formweight">
                    <Form.Label column sm="4">
                     Delete Password
                     </Form.Label>
                      <Col sm="8">
                       <Form.Control
                    type="password"
                    placeholder="Enter Password..."
                    name="password"
                    onChange={(e)=>{props.setdeletePassword(e.target.value)}}
                     />
              </Col>
            </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleCloseModal}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={()=>{return (props.handleAyncDeleteProduct(), props.handleCloseModal()) }}>Understood</Button>
                  </Modal.Footer>
              </Modal>
            );



         default :
            return( <p>There was and error...</p>) ;       
    }


}




export default ProductModal;