import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Styled from 'styled-components';
import Axios from 'axios';
import { useToasts } from "react-toast-notifications";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import config from '../../config/config'
import {
    Link,
    Route,
    Switch,
    useRouteMatch,
    useParams,
    useHistory
  } from "react-router-dom";

const Country = props => {
    const dispatch = useDispatch();
    const {countries} = useSelector(state => state.countries)
    var country = countries.find((country) => `${country.id}` === id);
    const { id } = useParams();
    const history = useHistory()
    const [data, setData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [deletePassword, setdeletePassword] = useState('null');
    const { addToast } = useToasts();

    useEffect(() => {
      console.log(country)
      console.log(countries)
      //updateId();
    }, []);

    useEffect(() => {
        updateId();
      }, [id]);

    const updateId = () => {
        country = countries.find((country) => `${country.id}` === id);
        console.log(country)
        setData(country);
      };

      const CountryId = data.id;
      const handleSave = (e) => {
        e.preventDefault();
        if(data.hasOwnProperty('id')){
          delete data.id
        }
        if(data.hasOwnProperty('created_at')){
          delete data.created_at
        }
        if(data.hasOwnProperty('updated_at')){
          delete data.updated_at
        }

        Axios.put(`${config.CHALLANGE_API_URL}/api/countries/${CountryId}`, data)
        .then((res) => {
          addToast(`Country: ${data.name} has been updated successfully`, {
            appearance: "success",
            autoDismiss: true,
          });
        })
        .catch((error) => {
          addToast(`Uh Oh! Country could not be updated: ${error.message}`, {
            appearance: "error",
            autoDismiss: true,
          });
        }).finally(()=>{
          props.getAsyncCountries()
      })
      }

      const handleUpdateCountriesData = (event) => { 
        setData({ ...data, [event.target.name]: event.target.value });
      }
      const handleDelete = () => {
          Axios.delete(`${config.CHALLANGE_API_URL}/api/countries/${data.id}`)
          .then((res) => {
            addToast(`Product: ${data.name} has been Deleted successfully`, {
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
            props.getAsyncCountries()
            history.push('/countries')
        })
      }
    
      const handleToggleActive = (event) => {
           setData({ ...data, [event.target.name]: !data.active });
      }
    
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
                  <Form.Group as={Row} controlId="formTaxRate">
                    <Form.Label className='form-labels' column sm="2">
                      Tax / VAT 
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        type="text"
                        placeholder="Tax Rate"
                        name="tax_rate"
                        value={data.tax_rate? data.tax_rate: ''}
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


export default Country;