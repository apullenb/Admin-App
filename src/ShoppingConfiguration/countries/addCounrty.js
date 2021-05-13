import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import config from '../../config/config'
import {
    useHistory
  } from "react-router-dom";

const AddCountry = props => {
    var country = {
        active: false,
        country_code: "",
        description: "",
        name: "",
        tax_rate:"",
    }


    const [data, setData] = useState(country);
    const { addToast } = useToasts();
    const history = useHistory()
  
    const handleUpdateCountryData = (event) => {
      setData({ ...data, [event.target.name]: event.target.value });
    };
    
    parseFloat(data.tax_rate);

    const handleSave = (e) => {
      e.preventDefault();
      axios
        .post(
          `${config.CHALLANGE_API_URL}/api/countries`,
          data
        )
        .then((res) => {
          props.getAsyncCountries();
          addToast(`Product: ${data.name} has been added successfully`, {
            appearance: "success",
            autoDismiss: true,
          });
        })
        .catch((error) => {
          addToast(`Uh Oh! Country could not be added: ${error.message}`, {
            appearance: "error",
            autoDismiss: true,
          });
        }).finally(()=>{
            history.push('/countries')
        })
    };

    const handleToggleActive = (event) => {
        setData({ ...data, [event.target.name]: !data.active });
   }

              return (
                <div style={{ margin: "0 auto", width: "80%" }}>
                 <h2 style={{ marginBottom:'4%', borderBottom:'2px solid black'}}>Add Country</h2>
                  <Form
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                    onSubmit={(e) => handleSave(e)}
                  >
                    <Form.Group as={Row} controlId="formName">
                      <Form.Label className='form-labels' column sm="2">
                        Name
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          placeholder="Add Name..."
                          name="name"
                          value={data.name}
                          onChange={(e) => handleUpdateCountryData(e)}
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
                        placeholder="Description..."
                        name="description"
                        value={data.description}
                        onChange={(e) => handleUpdateCountryData(e)}
                      />
                    </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formCountryCode">
                      <Form.Label className='form-labels' column sm="2">
                        Country Code
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          placeholder="Add Country Code..."
                          name="country_code"
                          value={data.country_code}
                          onChange={(e) => handleUpdateCountryData(e)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formTaxRate">
                      <Form.Label className='form-labels' column sm="2">
                        Tax Rate
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          placeholder="Add Tax Rate..."
                          name="tax_rate"
                          value={data.tax_rate}
                          onChange={(e) => handleUpdateCountryData(e)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formActive">
                    <Form.Label className='form-labels' column sm="2">
                      Active 
                    </Form.Label>
                    <Col sm="10">
                      <Form.Check
                        type="switch"
                        name="active"
                        id="active"
                        label={data.active === true ? "Active" : 'Not Active' }
                        checked= {data.active} 
                        onChange={(e) => handleToggleActive(e)}
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


export default AddCountry;