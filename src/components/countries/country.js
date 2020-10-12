import React, {useState, useEffect} from 'react';
import Styled from 'styled-components';
import Axios from 'axios';
import { useToasts } from "react-toast-notifications";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import {
    Link,
    Route,
    Switch,
    useRouteMatch,
    useParams,
    useHistory
  } from "react-router-dom";



const Country = props => {
    const { id } = useParams();
    const history = useHistory()
    var country = props.countries.find((country) => `${country.id}` === id);
    const [data, setData] = useState(country);
    const [showModal, setShowModal] = useState(false);
    const [deletePassword, setdeletePassword] = useState('null');
    const { addToast } = useToasts();

    useEffect(() => {
        updateId();
        console.log(country)
      }, [id, props.countries]);

      
    const updateId = () => {
        country = props.countries.find((country) => `${country.id}` === id);
        setData(country);
      };

      const handleSave = () => {}
      
      const handleUpdateCountriesData = (event) => { 
        setData({ ...data, [event.target.name]: event.target.value });
      }
      const handleDelete = () =>{}
    
      const handleToggleActive = (event) => {
           setData({ ...data, [event.target.name]: !data.active });
      }
  
        if (country !== undefined) {
            return (
              <div style={{ margin: "0 auto", width: "80%" }}>
               <h2 style={{ marginBottom:'4%', borderBottom:'2px solid black'}}>EDIT / DELETE: {data.name}</h2>
                <Form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                  onSubmit={(e) => handleSave(e)}
                >
                  <Form.Group as={Row} controlId="formID">
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
      
                  <Form.Group as={Row} controlId="formName">
                    <Form.Label className='form-labels' column sm="2">
                      Name
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={data.name? data.name : ''}
                        onChange={(e) => handleUpdateCountriesData(e)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formCode">
                    <Form.Label className='form-labels' column sm="2">
                      Country Abbreviation
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        type="text"
                        placeholder="Country Abbreviation"
                        name="country_code"
                        value={data.country_code? data.country_code : '' }
                        onChange={(e) => handleUpdateCountriesData(e)}
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
                        value={data.description? data.description: ''}
                        onChange={(e) => handleUpdateCountriesData(e)}
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
                          <Button style={{ width: "80%" }} variant="danger" size="lg" onClick={(e)=> {handleDelete(e)}}>
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Form.Group>
                </Form>
                </div>
                )
            }
    

}


export default Country;