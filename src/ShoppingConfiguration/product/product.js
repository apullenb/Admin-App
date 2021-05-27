import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductModal from './productModal';
import ModalType from './modalTypes';
import config from '../../config/config'

import {
    Link,
    Route,
    Switch,
    useRouteMatch,
    useParams,
    useHistory
  } from "react-router-dom";



const Product = (props) => {
    const dispatch = useDispatch();
    const {products} = useSelector(state => state.products)
    const { id } = useParams();
    const history = useHistory();
    var product = products.find((prod) => `${prod.id}` === id);
    const [data, setData] = useState(product);
    const [showModal, setShowModal] = useState(false);
    const [deletePassword, setdeletePassword] = useState('null');
    const { addToast } = useToasts();
 
    useEffect(() => {
      updateId();
    }, [id]);
  
    const updateId = () => {
      product = products.find((prod) => `${prod.id}` === id);
      setData(product);
    };
  
    const handleUpdateProductData = (event) => {
      setData({ ...data, [event.target.name]: event.target.value });
    };
  
    const handleSave = (e) => {
      e.preventDefault();
      if (data.hasOwnProperty("category_name")) {
        delete data.category_name;
      }
      parseInt(data.fk_category);
      parseInt(data.sort_rank);
      JSON.stringify(data.json-data);


      axios
        .put(
          `${config.CHALLANGE_API_URL}/api/products/update-product/by-id/${data.id}`,
          data
        )
        .then((res) => {
          props.handlegetAllProducts();
          addToast(`Product: ${data.sku} has been updated successfully`, {
            appearance: "success",
            autoDismiss: true,
          });
        })
        .catch((error) => {
          addToast(`Uh Oh! Product was not updated: ${error.message}`, {
            appearance: "error",
            autoDismiss: true,
          });
        });
    };

  const handleAyncDeleteProduct = () => {
        axios.delete(`${config.CHALLANGE_API_URL}/api/products/delete-product/by-sku/${data.sku}/${deletePassword}`)
        .then((res)=>{
            addToast(`Product: ${data.sku} has been deleted successfully`, {
                appearance: "success",
                autoDismiss: true,
              });
        })
        .catch((error) => {
            addToast(`Uh Oh! Product was not deleted: ${error}`, {
                appearance: "error",
                autoDismiss: true,
              });
        }).finally(()=>{
            props.handlegetAllProducts();
            history.push('/products')
        })
    }

    const handleDelete = (e) => {
        e.preventDefault();
        handleShowModal();
    }

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
  
  
    if (product !== undefined) {
      return (
        <div style={{ margin: "0 auto", width: "80%" }}>
         <h2 style={{ marginBottom:'4%', borderBottom:'2px solid black'}}>EDIT / DELETE: {data.sku}</h2>
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            onSubmit={(e) => handleSave(e)}
          >
            <Form.Group as={Row} controlId="formSKU">
              <Form.Label className='form-labels' column sm="2">
                ID
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="ID"
                  name="id"
                  value={data.id? data.id : ''}
                />
            </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formSKU">
              <Form.Label className='form-labels' column sm="2">
                SKU
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="SKU"
                  name="sku"
                  value={data.sku? data.sku : ''}
                  onChange={(e) => handleUpdateProductData(e)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formDescription">
              <Form.Label className='form-labels' column sm="2">
                Description
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={data.description? data.description : '' }
                  onChange={(e) => handleUpdateProductData(e)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formCategory">
              <Form.Label className='form-labels' column sm="2">
                Category
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Category"
                  name="category_name"
                  value={data.category_name? data.category_name: ''}
                  onChange={(e) => handleUpdateProductData(e)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formFK_CategoryID">
              <Form.Label className='form-labels' column sm="2">
                Forign Key Category
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="FK Category ID"
                  name="fk_category"
                  value={data.fk_category? String(data.fk_category): ''}
                  onChange={(e) => handleUpdateProductData(e)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="form_Rank">
              <Form.Label className='form-labels' column sm="2">
                Sort Order 
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Sort Order"
                  name="sort_rank"
                  value={data.sort_rank? String(data.sort_rank): ''}
                  onChange={(e) => handleUpdateProductData(e)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formimage_one_link">
              <Form.Label className='form-labels' column sm="2">
                Image One
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Image One"
                  name="image_one_link"
                  value={data.image_one_link? data.image_one_link: '' }
                  onChange={(e) => handleUpdateProductData(e)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formimage_two_link">
              <Form.Label className='form-labels' column sm="2">
                Image Two
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Image Two"
                  name="image_two_link"
                  value={data.image_two_link? data.image_two_link: '' }
                  onChange={(e) => handleUpdateProductData(e)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formvideo_one_link">
              <Form.Label className='form-labels' column sm="2">
                Video One
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Video One"
                  name="video_one_link"
                  value={data.video_one_link? data.video_one_link: ''}
                  onChange={(e) => handleUpdateProductData(e)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formvideo_two_link">
              <Form.Label className='form-labels' column sm="2">
                Video Two
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Video Two"
                  name="video_two_link"
                  value={data.video_two_link? data.video_two_link: ''}
                  onChange={(e) => handleUpdateProductData(e)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formlink_one">
              <Form.Label className='form-labels' column sm="2">
                Link One
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Link One"
                  name="link_one"
                  value={data.link_one ? data.link_one : ""}
                  onChange={(e) => handleUpdateProductData(e)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formlink_two">
              <Form.Label className='form-labels' column sm="2">
                Link Two
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Link Two"
                  name="link_two"
                  value={data.link_two ? data.link_two : ""}
                  onChange={(e) => handleUpdateProductData(e)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formjson-data">
              <Form.Label className='form-labels' column sm="2">
                Json Data
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder='JSON Data: Example {name: "Joe", Age: 38}'
                  name="json-data"
                  value= {data['json-data'] ? data['json-data'] : ''  }
                  onChange={(e) => handleUpdateProductData(e)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formweight">
              <Form.Label className='form-labels' column sm="2">
                Weight
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Weight"
                  name="weight"
                  value={data.weight? data.weight: ''}
                  onChange={(e) => handleUpdateProductData(e)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formweight">
              <Form.Label className='form-labels' column sm="2">
                Create At
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Create At"
                  name="create_at"
                  value={data.created_at? data.created_at: ''}
                />
              </Col>
            </Form.Group>
  
            <Form.Group as={Row} controlId="Buttons">
              <Form.Label className='form-labels' column sm="2"></Form.Label>
              <Col sm="10">
                <Row>
                  <Col sm="6">
                    <Button
                      style={{ width: "80%" }}
                      variant="primary"
                      size="lg"
                      type="submit"
                    >
                      Save
                    </Button>
                  </Col>
                  <Col sm="6">
                    <Button style={{ width: "80%" }} variant="danger" size="lg" onClick={(e)=> {handleDelete(e)}}>
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
          </Form>

          <ProductModal
                  showModal={showModal}
                  handleCloseModal={handleCloseModal}
                  modalType= {ModalType.DELETE}
                  handleAyncDeleteProduct={handleAyncDeleteProduct}
                  setdeletePassword={setdeletePassword}
                />
        </div>
      );
    } else {
      return <div>Not Data to Display...</div>;
    }
  };

  export default Product;