import React, { useState } from "react";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import config from '../../config/env-urls'

const AddProduct = props => {
    var product = {
        sku:'',
        fk_category:null,
        description:'',
        image_one_link:'',
        image_two_link:'',
        video_one_link:'',
        video_two_link:'',
        link_one:'',
        link_two:'',
        'json-data' :'',
        weight:''

    }
    const [data, setData] = useState(product);
    const { addToast } = useToasts();
  
  
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
      JSON.stringify(data.json)

      axios
        .post(
          `${config.PRODUCTSBASEURL}/api/products`,
          data
        )
        .then((res) => {
          props.handlegetAllProducts();
          addToast(`Product: ${data.sku} has been added successfully`, {
            appearance: "success",
            autoDismiss: true,
          });
        })
        .catch((error) => {
          addToast(`Uh Oh! Product could not be added: ${error.message}`, {
            appearance: "error",
            autoDismiss: true,
          });
        });
    };

              return (
                <div style={{ margin: "0 auto", width: "80%" }}>
                 <h2 style={{ marginBottom:'4%', borderBottom:'2px solid black'}}>Add Product</h2>
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
                        SKU
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          placeholder="Add SKU..."
                          name="sku"
                          value={data.sku}
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
                        value={data.description}
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
                          placeholder="Add Category..."
                          name="category_name"
                          value={data.category_name}
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
                          placeholder="Add FK Category ID..."
                          name="fk_category"
                          value={String(data.fk_category)}
                          onChange={(e) => handleUpdateProductData(e)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formSort_Rank">
                      <Form.Label className='form-labels' column sm="2">
                        Sort Order
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          placeholder="Sort Order"
                          name="sort_rank"
                          value={String(data.sort_rank)}
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
                          placeholder="Add Image One..."
                          name="image_one_link"
                          value={data.image_one_link}
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
                          placeholder="Add Image Two..."
                          name="image_two_link"
                          value={data.image_two_link}
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
                          placeholder="Add Video One ..."
                          name="video_one_link"
                          value={data.video_one_link}
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
                          placeholder="Add Video Two ..."
                          name="video_two_link"
                          value={data.video_two_link}
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
                          placeholder="Add Link One..."
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
                          placeholder="Add Link Two..."
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
                          value={data['json-data']}
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
                          placeholder="Add Weight..."
                          name="weight"
                          value={data.weight}
                          onChange={(e) => handleUpdateProductData(e)}
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
                            <Button style={{ width: "80%" }} variant="danger" size="lg">
                              Cancel
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Form.Group>
                  </Form>
                </div>
              );


}


export default AddProduct;