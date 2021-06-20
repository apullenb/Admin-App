/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import config from '../config/env-urls'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from 'axios';
import Moment from 'react-moment';
import Select from 'react-select';


function EntryEdit(props) {

  const [entry, setEntry] = useState({ products: [] });
  const [entryId] = useState(props.match.params.entryId);
  const [allProducts, setAllProducts] = useState([]);
  const optionList = [{value: '1', label: 'Yes'},{value: '0', label: 'No'}];
  const [blank, setBlank] = useState(true);

  // this.handleChange = this.handleChange.bind(this);
  // this.handleSubmit = this.handleSubmit.bind(this);
  // const base_url = 'http://localhost:4000';

  useEffect(() => {
    handleGetEntryData();
  }, []);



  const handleGetEntryData = () => {
    axios.get(`${config.SKINCAREBASEURL}/api/challenge/all-products`).then(productResponse => {
      setAllProducts( productResponse.data.products);
      axios.get(`${config.SKINCAREBASEURL}/api/challenge/entry-by-id/${entryId}`).then(res => {
        setEntry(res.data[0]);
      })
      .catch(err => {
        console.error(err);
      })
    })
    .catch(err => {
      console.error(err);

    });
  }

  const handleChange = (e) => setEntry({ ...entry, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const body = {
        products: entry.products,
        testimonial: entry.testimonial,
        day1ImageUrl: entry.day1ImageUrl,
        day1UploadDate: entry.day1UploadDate,
        day30ImageUrl: entry.day30ImageUrl,
        day30UploadDate: entry.day30UploadDate,
      };

      const requestOptions = {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      };
      
      const response = await fetch(`${config.SKINCAREBASEURL}/api/challenge/update-entry/${entry.id}`, requestOptions);
      console.log('response', response);

    } catch (err) {
      console.error(err.message)
    }
  };

  const handleProductsChange = () => {};
  const handleSelectChange = (event, property) => {
    const tempEntry = entry;
    tempEntry[property] = event.value === '1';
    setEntry(tempEntry);
    setBlank(!blank);
  };
  const handlePasswordReset = () => {}


  return (
    <PageWrapper>
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
              <span className="read-only-value">
                    <td><Link to = {{ pathname: `/Challenge/Accounts/${entry.userId}`, state: entry }}>{entry.name}</Link></td></span>
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
            <div style={{marginTop: '20px'}}>
              <label>Featured</label>
              <div className="read-only-value" style={{width:'100px'}}>
                <Select 
                  value={optionList.filter(o => (o.value === '1') === entry.isFeatured)}
                  options={optionList}
                  onChange={(e) => handleSelectChange(e, 'isFeatured')}
                  name="isFeatured"
                />
              </div>
            </div>
            <div style={{marginTop: '20px'}}>
              <label>Approved</label>
              <div className="read-only-value" style={{width:'100px'}}>
                <Select 
                  value={optionList.filter(o => (o.value === '1') === entry.isApproved)}
                  options={optionList}
                  onChange={(e) => handleSelectChange(e, 'isApproved')}
                  name="isApproved"
                />
              </div>
            </div>
            <div style={{marginTop: '20px'}}>
              <label style={{display: 'block'}}>Journey</label>
              <div>
                <textarea defaultValue={entry.testimonial} onChange={handleChange} name="testimonial" rows="4" style={{width: "100%"}} />
              </div>
            </div>
          </Col>
          <Col>
                <ContestImage>
                  <label>Day 1 Photo</label>
                  <img src={entry.day1ImageUrl} alt="Day 1 Image" />
                </ContestImage>
                <ContestImage>
                  <label>Day 30 Photo</label>
                  <img src={entry.day30ImageUrl} alt="Day 30 Image" />
                </ContestImage>
          </Col>
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
    </PageWrapper>
  );

}

export default EntryEdit;

const PageWrapper = styled.div`
  width: 1400px;
`;

const ContestImage = styled.div`
  display: inline-block;
  width: 50%;
  vertical-align: top;

  img {
    width: 100%;
  }
`;

const EntryDetails = styled.section`
  color: rgb(94, 93, 93);
  font-weight: 400;
  font-size: 17px;
  padding: 1px 1%;
  text-align: left;

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
