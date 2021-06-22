/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { useToasts } from "react-toast-notifications";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import config from '../../config/env-urls'
import { useParams, useHistory } from "react-router-dom";

const Country = props => {
  const { id } = useParams();
  const {countries} = useSelector(state => state.countries);
  var country = countries.find((country) => `${country.id}` === id);
  const history = useHistory();
  const [data, setData] = useState({});
  const { addToast } = useToasts();

  useEffect(() => {
  }, []);

  useEffect(() => {
    updateId();
  }, []);

  const updateId = () => {
    country = countries.find((country) => `${country.id}` === id);
    setData(country);
  };

  const CountryId = data.id;

  const handleSave = (e) => {
    e.preventDefault();

    if (data.hasOwnProperty('id')) {
      delete data.id
    }

    if (data.hasOwnProperty('created_at')) {
      delete data.created_at
    }

    if (data.hasOwnProperty('updated_at')) {
      delete data.updated_at
    }

    Axios.put(`${config.PRODUCTSBASEURL}/api/countries/${CountryId}`, data)
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
      }).finally(() => {
        props.getAsyncCountries();
      });
  }

  const handleUpdateCountriesData = (event) => { 
    setData({ ...data, [event.target.name]: event.target.value });
  }
  const handleDelete = () => {
      Axios.delete(`${config.PRODUCTSBASEURL}/api/countries/${data.id}`)
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
      }).finally(() => {
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
        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
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
              defaultValue={data.id? data.id : ''}
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
              defaultValue={data.name? data.name : ''}
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
              defaultValue={data.country_code? data.country_code : '' }
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
              defaultValue={data.description? data.description: ''}
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
              defaultValue={data.tax_rate? data.tax_rate: ''}
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
              defaultChecked= {data.active} 
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