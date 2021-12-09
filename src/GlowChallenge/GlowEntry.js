/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import config from '../config/env-urls';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Moment from 'react-moment';
import Select from 'react-select';
import { useToasts } from 'react-toast-notifications';
import { LoginSkincareAdmin } from '../redux/actions/Skincare/skincareActions';
import { relativeTimeRounding } from 'moment';
import Model from './Model';
import getComponentData from './selector';
import { getGlowEntries } from './../redux/actions/Skincare/skincareActions';

function GlowEntry(props) {
const user = props.location.state
  const {entries, products } = useSelector(state => state.entries.entries);
  
  const dispatch = useDispatch();
  const [entry, setEntry] = useState({})  
  const [goals, setGoals] = useState([]);
  const [change, setChange] = useState(false);
  const [show, setShow] = useState('hide');
  const [blank, setBlank] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { view, edit } = props;
 
  const filter = [{column: 'glowEntryId', value: user.glowEntryId}]
  const handlePopUp = () => {
    setShowDelete(!showDelete);
  };

 useEffect(() => {
  dispatch(getGlowEntries(10, 1, 'glowEntryId', 'asc', filter));
 }, [])

useEffect(() => {
  setEntry(entries && entries.find(entry => entry.glowEntryId === user.glowEntryId))
}, [entries])

  const productMap = (product) => {
    const productMap = [];
    product.map((p) => productMap.push(p.name));
    return show === 'hide' ? productMap.reverse().join(', ').slice(0, 25) : productMap.join(', ');
  };

  const handleDelete = () => {
    axios.delete(`${config.SKINCAREBASEURL}/api/challenge/delete-glow-entry-admin/${entry.glowEntryId}`).then((res) => {
      setShowDelete(!showDelete);
      props.history.push('/Challenge/Glow-Entries');
    });
  };
  const handleShow = () => (show === 'hide' ? setShow('show') : setShow('hide'));

  useEffect(() => {
    setBlank(!blank);
  }, [show]);

    return (
      <div style={{margin:'0 8%'}}>
        <h1>
          Glow Challenge Entry 
          </h1>
         
    <PopUp style={showDelete ? {display: 'block'} : {display:'none'}}><Model type='entry' close={handlePopUp} delete={handleDelete} text="Deleting this entry will delete all submissions associated with the entry as well. This action can not be undone." /></PopUp>
        <EntryDetails>
        
            <div className="page-header-link"><Link style={{color:'#0F4B8F'}} to="/Challenge/Glow-Entries">Back to List</Link></div>
          <Row>
            <Col>
              <div>
                <label>Entry ID</label>
                <span className="read-only-value">{entry && entry.glowEntryId}</span>
              </div>
              <div>
                <label>Date Created</label>
                <span className="read-only-value"><Moment format="MM/DD/YYYY">{entry && entry.createdDate}</Moment></span>
              </div>
              <div>
                <label>Challenge</label>
                <span className="read-only-value">{entry && entry.title}</span>
              </div>
              <div>
                <label>Goals</label>
                <div className="read-only-value" style={{marginTop:'5px'}}>
                      <div  className='check'>
                        <input type="checkbox" checked={entry && entry.goalWeight} />
                             <span>Weight Management Support</span>
                      </div>
                      <div className='check'>
                        <input type="checkbox" checked={entry && entry.goalImmune} />
                              <span>Promote a Healthy Immune System</span>
                      </div>
                      <div className='check'>
                        <input type="checkbox" checked={entry && entry.goalStress} />
                            <span>Help with Situational Stress</span>
                      </div>
                      <div className='check'>
                        <input type="checkbox" checked={entry && entry.goalSleep} />
                              <span>Aid Sleep During Restless Night</span>
                      </div>
                      <div className='check'>
                        <input type="checkbox" checked={entry && entry.goalOverall} />
                             <span>Overall Well-Being</span>
                      </div>
                  
                 
                </div>
              </div>
            </Col>
            <Col>
              <div>
                <label>Ambassador ID</label>
                <span className="read-only-value">{entry && entry.ambassadorId}</span>
              </div>
              <div>
                <label>Name</label>
                <span className="read-only-value">
                <Link className='label-btn' to={{ pathname: `/Challenge/Accounts/${entry && entry.id}`,  state: entry }}>{entry && entry.name}</Link></span>
              </div>
              <div>
                <label>Email</label>
                <span className="read-only-value">{entry && entry.email}</span>
              </div>
              <div style={{border: '1px solid #707070', padding:'1px', marginTop:'5px'}}>
               <GrayBox>
                   <div>Scientific data is private, you can only see if information was submitted, not what was submitted.</div>
                   <div className='check' >
                        <input type="checkbox" id='check' checked={entry && entry.height !== ''} />
                               <span>Height</span>
                      </div>
                      <div  className='check'>
                        <input type="checkbox" checked={entry && entry.gender !== ''} />
                               <span>Gender</span>
                      </div>
               </GrayBox>
</div>
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
            </thead>
               <tbody> {entry && entry.submissions && entry.submissions.map((e, i) => {
                    e.challenge = entry.title
                    e.ambId = entry.ambassadorId
                    e.name = entry.name
                    e.email = entry.email
                    e.allProducts = products
                    return <tr key= {i}>
                        <td><div style={{marginLeft:'0px'}}>{e.glowSubmissionId}</div></td>
                        <td><div style={{marginLeft:'7px'}}><Moment format="MM/DD/YYYY">{e.submissionDate}</Moment></div></td>
                        <td><div style={{marginLeft:'11px'}}>{e.day}</div></td>
                        <td ><img src={e.photoUrl} style={{height: '40px', marginLeft:'17px'}} /></td>
                        <td ><div style={{marginLeft:'45px'}} className='check'><input type="checkbox" checked={entry.height !== ''} /></div></td>
                        <td style={{position:'relative'}} >{blank}<div style={show === 'show' ? showMore : {margin:'0px'}}>{productMap(e.products) } &nbsp; <span onMouseOver={handleShow} onMouseLeave={handleShow} style={show === 'show' ? {display:'none'} : {margin:'0px'}}>  ... </span></div> </td>
                        <td ><div className='story'>{e.story.slice(0, 18)} ... <span className='story-text'>{e.story}</span></div></td>
                        <td><div style={{marginLeft:'10px'}}>{e.answers.length}/23</div></td>
                        {view && <td> <div style={{marginLeft:'10px', textDecoration:'underline' }} ><Link className='label-btn' to={{pathname: `/Challenge/Glow-Submission/${e.glowSubmissionId}`, state: e}}>View</Link></div></td>}
                        </tr>
                })}
              
           </tbody>
        </table>
        </SubmissionTable>
        {edit && (
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
            <Delete onClick={handlePopUp}>Delete Entry</Delete>
          </div>
        )}
        </Col>
        </Row>
      </EntryDetails>
    </div>
  );
}

const showMore = {
  position: 'absolute',
  backgroundColor: 'white',
  zIndex: '3',
  border: '1px solid black',
  padding: '5%',
  width: '400px',
  marginLeft: '-25px',
  textAlign: 'left',
};
const SubmissionTable = styled.div`
  padding: 1px;
  margin: 3% 0;

  table {
    width: 100%;
    td {
      padding: 10px;
      text-align: left;
    }

    .story {
      position: relative;
      margin-left: 5px;
    }
    .story-text {
      position: absolute;
    }
    .story .story-text {
      visibility: hidden;
      background-color: white;
      z-index: 3;
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
`;

const GrayBox = styled.div`
  border: 1px solid #707070;
  padding: 15px;
  font: normal normal normal 16px/27px Segoe UI;
  color: #707070;
`;

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
  const Delete = styled.button`
      background: #D10000;
      color: white;
      border: none;
      padding: 5px 10px;
      font-size:14px;
      font-weight: 500;
      align-self: right;
      margin: 25px 3px; 
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
    .check {
        display: grid;
        grid-template-columns: 1em auto;
        gap: 0.9em;
        line-height: 1.1;
        margin: 10px 0;
    }
    input[type="checkbox"] {
        appearance: none;
        margin: 0;
        font: inherit;
        color: currentColor;
        width: 1.15em;
        height: 1.15em;
        border: 0.05em solid #707070;
        display: grid;
        place-content: center;
        opacity: 0.8;
    }
    input[type="checkbox"]::before {
        content: "";
        width: 0.85em;
        height: 0.0em;
       
      }
    
    input:checked {
        &:after {
          content: '✔';
          font-size: 16px;
          color: #707070;
          opacity: 0.8;
          width: 0em;
          height: 1.2em;
          opacity: 0.9;
          }
      }
   .hide {
       display:none;
   }
   .label-btn {
    background: none;
    border: none;
    text-decoration: underline;
    font-size: 17px;
    color: #0F4B8F;
    padding: 0;
  }
  `;

const PopUp = styled.div`
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.7);
`;
export default connect(getComponentData)(GlowEntry);
