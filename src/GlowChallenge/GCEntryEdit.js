import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import Moment from 'react-moment';
import Select from 'react-select';
import { useToasts } from "react-toast-notifications";
import { LoginSkincareAdmin } from "../redux/actions/Skincare/skincareActions";
import { relativeTimeRounding } from "moment";

function GCEntryEdit(props) {
    const entry = props.location.state
    const [goals, setGoals] = useState([])
    const [change, setChange] = useState(false);
    const [show, setShow] = useState('hide')
    const [blank, setBlank] = useState(false)
    
    console.log(props.history)
 console.log(entry)

 const productMap = (product) => {
    const productMap = [];
    product.map(p => productMap.push(p.name))
    return show === 'hide' ? productMap.reverse().join(', ').slice(0, 25) : productMap.join(', ')
 }

 const handleShow = () => show === 'hide' ? setShow('show') : setShow('hide')

useEffect(() => {
    setBlank(!blank)
}, [show])

const goBack = () => props.history.goBack()

    return (
      <div style={{margin:'0 8%'}}>
        <h1>Glow Challenge Submission</h1> 
          

        <EntryDetails>
            <div className="page-header-link"><button id="edit" onClick={goBack}>Back to Entry</button></div>
          <Row>
            <Col style={{marginRight:'5%'}}>
              <div>
                <label>Glow Submission ID</label>
                <span className="read-only-value">{entry.glowSubmissionId}</span>
              </div>
              <div>
                <label>Glow Entry ID</label>
                <span className="read-only-value">{entry.glowEntryId}</span>
              </div>
              <div>
                <label>Date Created</label>
                <span className="read-only-value"><Moment format="MM/DD/YYYY">{entry.createdDate}</Moment></span>
              </div>
              <div>
                <label>Challenge</label>
                <span className="read-only-value">{entry.challenge}</span>
              </div>
         
            </Col>
            
            <Col>
            <div>
                <label>Day</label>
                <span className="read-only-value">{entry.day}</span>
              </div>
              <div>
                <label>Ambassador ID</label>
                <span className="read-only-value">{entry.ambId}</span>
              </div>
              <div>
                <label>Name</label>
                <span className="read-only-value">
                      <Link to = {{ pathname: `/Challenge/Glow-Entries` }}>{entry.name}</Link></span>
              </div>
              <div>
                <label>Email</label>
                <span className="read-only-value">{entry.email}</span>
              </div>
             
              
            </Col>
          </Row>
          <hr />
          <Row>
              <Col style={{marginRight:'5%'}}>
         
          <Row>
                <label style={{marginLeft: '16px'}}>Products</label>
                <Col>
                <div className="read-only-value" style={{marginTop:'5px', marginLeft:'-10px', paddingRight:'-25px'}}>
                      {entry.allProducts.slice(0,7).map((p, i) => 
                         <div key={i} >
                         <input type="checkbox" checked={entry.goalWeight} />
                               &nbsp; <span>{p.name}</span>
                       </div>                
                        )}
                </div>
                </Col>
                <Col> <div className="read-only-value" style={{marginTop:'5px', marginLeft:'-5px'}}>
                      {entry.allProducts.slice(7).map((p, i) => 
                         <div key={i} >
                         <input type="checkbox" checked={entry.goalWeight} />
                               &nbsp; <span>{p.name}</span>
                       </div>                
                        )}
                </div></Col>
               </Row>
             
               <div style={{marginTop:'15px'}}>
                <label>Questionaire</label>
                <span className="read-only-value">{entry.answers.length}/23</span>
              </div>
              <label style={{marginTop:'15px'}}>Journey</label>
              <div style={{border: '1px solid #707070', padding:'10px', marginTop:'5px'}}>
                  
                        <div>{entry.story}</div>
                  
              </div>
              <div style={{border: '1px solid #707070', padding:'1px', marginTop:'20px'}}>
               <GrayBox>
                   <div>Scientific data is private, you can only see if information was submitted, not what was submitted.</div>
                   <div >
                        <input type="checkbox" id='check' checked={entry.weight !== ''} />
                              &nbsp; <span>Weight</span>
                      </div>
                      <div >
                        <input type="checkbox" checked={entry.chest !== ''} />
                              &nbsp; <span>Chest</span>
                      </div>
                      <div >
                        <input type="checkbox" checked={entry.waist !== ''} />
                              &nbsp; <span>Waist</span>
                      </div>
                      <div >
                        <input type="checkbox" checked={entry.hips !== ''} />
                              &nbsp; <span>Hips</span>
                      </div>
                      <div >
                        <input type="checkbox" checked={entry.thigh !== ''} />
                              &nbsp; <span>Thigh</span>
                      </div>
               </GrayBox>
              </div>
              </Col>
              
              <Col >
              <div style={{marginBottom:'3%'}}>Day {entry.day} Photo </div>
              <ContestImage>
                  <img src={entry.photoUrl} />
                  <Replace>Replace</Replace>
              </ContestImage>
              </Col>
              
              </Row>
          <Row>
           <Col></Col>
           <Col></Col>
           <Col></Col>
           <Col></Col>
           <Col></Col>
           <Col><button>Delete Entry</button>
              <Success></Success>
           </Col>
           
          </Row>
        </EntryDetails>
      </div>
    );
  }
  
 
  const GrayBox = styled.div`
    border: 1px solid #707070;
    padding: 15px;
    font: normal normal normal 16px/27px Segoe UI;
    color: #707070;
  `
  const Replace = styled.button`
  width: 100%;
  border: none;
  padding: 4px 0;
  background:  #0F4B8F;
  color: white;
  font-size:14px;
  font-weight: 500;

  `
  
  const ContestImage = styled.div`
    display: inline-block;
    max-width: 65%;
    margin: 0%;
    padding: 1%;
    vertical-align: top;
    img {
      width: 100%;
    }
  `;
  
  const Success = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 6px 2%;
  `
  
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
    input:checked {
        appearance: none;

        &:after {
          content: ' ✔ ';
          font-size: 11px;
          color: #707070;
          border: 1px solid #707070;
          padding: 0px 3px;
          opacity: 0.6;
          }
      }
  `;

export default GCEntryEdit
