import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import config from '../../config/env-urls'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from 'axios';
import Moment from 'react-moment';


function EntryEdit(props) {

  const [entry, setEntry] = useState({ products: [] });
  const [entryId, setEntryId] = useState(props.match.params.entryId);
  const [allProducts, setAllProducts] = useState([]);

  console.log(props);
  // this.handleChange = this.handleChange.bind(this);
  // this.handleSubmit = this.handleSubmit.bind(this);
  const base_url = 'http://localhost:4000';

  useEffect(() => {
    handleGetEntryData();
  }, [])



  const handleGetEntryData = () => {
    axios.get(`${config.SKINCAREBASEURL}/api/challenge/all-products`).then(productResponse => {
      setAllProducts( productResponse.data.products);
      axios.get(`${config.SKINCAREBASEURL}/api/challenge/entry-by-id/${entryId}`).then(res => {
        setEntry(res.data[0]);
      })
        .catch(err => {
          console.log(err);
        })
    })
      .catch(err => {
        console.log(err);

      });
  }

  const handleChange = (e) => this.setEntry({ ...entry, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const body = {}
      const requestOptions = {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      };
      const response = await fetch(`${config.SKINCAREBASEURL}/api/challenge/update-user/${entry.id}`, requestOptions)
      console.log('response', response);

    } catch (err) {
      console.error(err.message)
    }
  };

  const handleProductsChange = () => {};
  const handlePasswordReset = () => {}


  return (
    <div>
      <div className="page-header">
        Skincare Challenge Edit Entry
          <div className="page-header-link"><Link to="/Challenge/Entries">Back to list</Link></div>
      </div>
      <EntryDetails>
        <Row>
          <Col>
            <div>
              <label>Entry ID</label>
              <span className="read-only-value">{entry.id}</span>
            </div>
            <div>
              <label>Entry Date</label>
              <span className="read-only-value"><Moment format="MM/DD/YYYY">{entry.day1UploadDate}</Moment></span>
            </div>
            <div>
              <label>Challenge</label>
              <span className="read-only-value">{entry.contestTitle}</span>
            </div>
          </Col>
          <Col>
            <div>
              <label>Ambassador ID</label>
              <span className="read-only-value">{entry.ambassadorId}</span>
            </div>
            <div>
              <label>Name</label>
              <span className="read-only-value">{entry.name}</span>
            </div>
            <div>
              <label>Email</label>
              <span className="read-only-value">{entry.email}</span>
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <div>
              <label>Products</label>
              <div className="read-only-value">
                {allProducts.map((product, key) => {
                  return (
                    <div key={key}>
                      <input type="checkbox" name={product.id} onChange={handleProductsChange} checked={entry.products.includes(product.id)} />
                            &nbsp; <span>{product.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </EntryDetails>
      <div style={div}>
        <button className="add-account-btn" onClick={handleSubmit}>
          Save
          </button>{" "}
        <button className="add-account-btn" onClick={handlePasswordReset}>
          Send Password Reset
          </button>
      </div>
    </div>
  );

}

export default EntryEdit;

const EntryDetails = styled.section`
  color: rgb(94, 93, 93);
  font-weight: 400;
  font-size: 17px;
  padding: 1px 1%;

  label {
    display: inline-block;
    min-width: 150px;
    vertical-align: top;
  }

  .read-only-value {
    display: inline-block;
    margin: 0 10px;
  }
  
`;
const div = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: "3% 0%",
  padding: '5px 10px',
  width: "355px",

};
