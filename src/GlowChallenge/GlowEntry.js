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
import { relativeTimeRounding } from "moment";

function GlowEntry(props) {
    const entry = props.location.state
    const [goals, setGoals] = useState([])
    const [change, setChange] = useState(false);
    const [show, setShow] = useState('hide')
    const [blank, setBlank] = useState(false)
    
    
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

    return (
      <div style={{margin:'0 8%'}}>
        <h1>
          Glow Challenge Entry 
          </h1>
         
      
        <EntryDetails>
            <div className="page-header-link"><Link to="/Challenge/Glow-Entries">Back to List</Link></div>
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
                <span className="read-only-value">{entry.title}</span>
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
                        <input type="checkbox" id='check' checked={entry.height !== ''} />
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
         
          <SubmissionTable>
          <table>
            <thead>
            <tr>
              <th className='head'>Submission ID</th>
              <th className='head'>Date Submitted</th>
              <th className='head'>Day</th>
              <th className='head'>Picture</th>
              <th className='head'>Scientific Data</th>
              <th className='head'>Products</th>
              <th className='head'>Story</th>
              <th className='head'>Questionaire</th>
              <th className='head'>Actions</th>
            </tr>
            
                {entry.submissions.map((e, i) => {
                    e.challenge = entry.title
                    e.ambId = entry.ambassadorId
                    e.name = entry.name
                    e.email = entry.email
                    e.allProducts = entry.products
                    return <tr key= {i}>
                        <td>{e.glowSubmissionId}</td>
                        <td><Moment format="MM/DD/YYYY">{e.submissionDate}</Moment></td>
                        <td>{e.day}</td>
                        <td><img src={e.photoUrl} style={{height: '40px'}} /></td>
                        <td><input type="checkbox" checked={entry.height !== ''} /></td>
                        <td style={{position:'relative'}} >{blank}<div style={show === 'show' ? showMore : {margin:'0px'}}>{productMap(e.products) }<span onMouseOver={handleShow} onMouseLeave={handleShow} style={show === 'show' ? {display:'none'} : {margin:'0px'}}> ... {' '}</span></div> </td>
                        <td ><div className='story'>{e.story.slice(0, 18)} ... <span className='story-text'>{e.story}</span></div></td>
                        <td>{e.answers.length}/23</td>
                        <td> <div className="page-header-link"><Link to={{pathname: `/Challenge/Glow-Submission/${e.glowSubmissionId}`, state: e}}>View</Link></div></td>
                        </tr>
                })}
            
            </thead>
        </table>
        </SubmissionTable>
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
  
  const showMore = {
      position: 'absolute',
      backgroundColor: 'white',
      zIndex:'3',
      border: '1px solid black',
      padding: '5%',
      width: '400px',
      marginLeft:'-25px',
      textAlign: 'left'
  }
  const SubmissionTable = styled.div`
  padding: 1px;
  margin: 3% 0;

  table {
    width: 100%;

    td {
        padding:10px;
        text-align: left;
      }
    
    .story {
        position: relative;
      
       
    }
    .story-text {
        position: absolute;
    }
    .story .story-text {
    visibility: hidden;
    background-color: white;
    z-index:3;
    border: 1px solid black;
    padding: 5%;
    width: 500px;
    margin-left: -145px;
    margin-top: -15px;
    text-align: left;
    }

    .story:hover .story-text {
     visibility: visible;
     }
    

  .head {
    font-size: 18px;
    font-weight: 400;
    color: #707070;
    margin: 1px 1vw;
    padding: 5px 1vw;
    border-bottom: 1px solid #707070;
  }
}
input:checked {
    appearance: none;

    &:after {
      content: ' ✔ ';
      font-size: 14px;
      color: #707070;
      border: 1px solid #707070;
      padding: 0px 3px;
      opacity: 0.6;
      margin: 0 0 0 40px
      }
  }

`;
 
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


export default GlowEntry
