/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import config from '../config/env-urls'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import Moment from 'react-moment';
import Select from 'react-select';
import { useToasts } from "react-toast-notifications";
import { LoginSkincareAdmin } from "../redux/actions/Skincare/skincareActions";

function GlowEntry(props) {
    const entry = props.location.state
    const [goals, setGoals] = useState([])
    const [change, setChange] = useState(false);
    const { skincareAuthToken } = useSelector(state => state.app);
    const dispatch = useDispatch();
    const { addToast } = useToasts();
  
 console.log(entry)


    return (
      <div style={{margin:'0 8%'}}>
        <h1>
          Glow Challenge Entry 
          </h1>
         
      
        <EntryDetails>
            <div className="page-header-link"><Link to="/Challenge/Glow-Entries">Back to list</Link></div>
          <Row>
            <Col>
              <div>
                <label>Entry ID</label>
                <span className="read-only-value">{entry.glowEntryId}</span>
              </div>
              <div>
                <label>Date Created</label>
                <span className="read-only-value"><Moment format="MM/DD/YYYY">{entry.createdDate}</Moment></span>
              </div>
              <div>
                <label>Challenge</label>
                <span className="read-only-value">{entry.contestTitle}</span>
              </div>
              <div>
                <label>Goals</label>
                <div className="read-only-value" style={{marginTop:'5px'}}>
                      <div >
                        <input type="checkbox" checked={entry.goalWeight} />
                              &nbsp; <span>Weight Management Support</span>
                      </div>
                      <div>
                        <input type="checkbox" checked={entry.goalImmune} />
                              &nbsp; <span>Promote a Healthy Immune System</span>
                      </div>
                      <div>
                        <input type="checkbox" checked={entry.goalStress} />
                              &nbsp; <span>Help with Situational Stress</span>
                      </div>
                      <div>
                        <input type="checkbox" checked={entry.goalSleep} />
                              &nbsp; <span>Aid Sleep During Restless Night</span>
                      </div>
                      <div>
                        <input type="checkbox" checked={entry.goalOverall} />
                              &nbsp; <span>Overall Well-Being</span>
                      </div>
                  
                 
                </div>
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
                      <Link to = {{ pathname: `/Challenge/Glow-Entries` }}>{entry.name}</Link></span>
              </div>
              <div>
                <label>Email</label>
                <span className="read-only-value">{entry.email}</span>
              </div>
              <div style={{border: '1px solid #707070', padding:'1px', marginTop:'5px'}}>
               <GrayBox>
                   <div>Scientific data is private, you can only see if information was submitted, not what was submitted.</div>
                   <div >
                        <input type="checkbox" checked={entry.height !== ''} />
                              &nbsp; <span>Height</span>
                      </div>
                      <div >
                        <input type="checkbox" checked={entry.gender !== ''} />
                              &nbsp; <span>Gender</span>
                      </div>
               </GrayBox>

               
              </div>
              
            </Col>
          </Row>
          <hr />
          <table>
            <thead>
            <tr>
              <th className='head'>Submission ID</th>
            </tr>
            </thead>
        </table>
          <Row>
           <Col></Col>
           <Col></Col>
           <Col></Col>
           <Col></Col>
           <Col><button>Delete</button>
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
  
  
  const ContestImage = styled.div`
    display: inline-block;
    max-width: 350px;
    margin: 2px;
    border: 1px solid #d8d8d8;
    border-radius: 2px;
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
    
  `;

export default GlowEntry
