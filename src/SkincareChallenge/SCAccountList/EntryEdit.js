import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import config from '../../config/env-urls'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from 'axios';
import Moment from 'react-moment';


export default class EntryEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entry: {products:[]},
      entryId: props.match.params.entryId,
      allProducts: []
    };

    console.log(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.base_url = 'http://localhost:4000';
  }

  componentDidMount() {
    this.handleGetEntryData();
  }

  handleGetEntryData = () => {
    
    axios.get(`${config.SKINCAREBASEURL}/api/challenge/all-products`).then(productResponse => {
      this.setState({ allProducts: productResponse.data.products });
      axios.get(`${config.SKINCAREBASEURL}/api/challenge/entry-by-id/${this.state.entryId}`).then(res => {
        this.setState({ entry: res.data[0] });
      })
      .catch(err => {
          console.log(err);
      })
    })
    .catch(err => {
        console.log(err);
    
    });
  }

  handleChange = (e) => this.setEntry({ ...this.state.entry, [e.target.name]: e.target.value });
  
  handleSubmit = async () => {
      try {
        const body = {}
        const requestOptions = {
          method: 'PUT',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        };
        const response = await fetch(`${config.SKINCAREBASEURL}/api/challenge/update-user/${this.state.entry.id}`, requestOptions)
        console.log('response', response);
      
      } catch (err) {
        console.error(err.message)
      }
    };

  

  render() {
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
                <span className="read-only-value">{this.state.entry.id}</span>
              </div>
              <div>
                <label>Entry Date</label>
                <span className="read-only-value"><Moment format="MM/DD/YYYY">{this.state.entry.day1UploadDate}</Moment></span>
              </div>
              <div>
                <label>Challenge</label>
                <span className="read-only-value">{this.state.entry.contestTitle}</span>
              </div>
            </Col>
            <Col>
              <div>
                <label>Ambassador ID</label>
                <span className="read-only-value">{this.state.entry.ambassadorId}</span>
              </div>
              <div>
                <label>Name</label>
                <span className="read-only-value">{this.state.entry.name}</span>
              </div>
              <div>
                <label>Email</label>
                <span className="read-only-value">{this.state.entry.email}</span>
              </div>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <div>
                <label>Products</label>
                <div className="read-only-value">
                  {this.state.allProducts.map((product, key) => {
                    return (
                        <div key={key}>
                            <input type="checkbox" name={product.id} onChange={this.handleProductsChange} checked={this.state.entry.products.includes(product.id)} />
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
          <button className="add-account-btn" onClick={this.handleSubmit}>
            Save
          </button>{" "}
          <button className="add-account-btn" onClick={this.handlePasswordReset}>
            Send Password Reset
          </button>
        </div>
      </div>
    );
  }
}

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
  justifyContent:'space-between',
  alignItems:'center',
  margin: "3% 0%",
  padding: '5px 10px',
  width: "355px",

};
