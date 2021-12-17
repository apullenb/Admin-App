import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Moment from 'react-moment';
import Model from './Model';
import config from '../config/env-urls';
import getComponentData from './selector';
import CloudUpload from "./CloudUpload";
import SpinnerLoader from '../GlobalComponents/ZilisSpinnerLoader';
import { useToasts } from 'react-toast-notifications';

function GCEntryEdit(props) {
  const {view, edit, permissionFeched, } = props;
  const entry = props.location.state;
  const [showDelete, setShowDelete] = useState(false);
  const [showUpload, setShowUpload] = useState(true);
  const [photoUrl, setPhotoUrl] = useState('');
  const [message, setMessage] = useState('');
  const { addToast } = useToasts();
  
  const handlePopUp = () => {
    setShowDelete(!showDelete);
  };

  const authToken = localStorage.getItem('Token')
 
  const handlePhotoUpload = (newUrl) => {
    const data = { photoUrl: newUrl}
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": authToken,
      }
    }
    
    axios.put( `${config.SKINCAREBASEURL}/api/challenge/replace-glow-entry-photo/${entry.glowSubmissionId}`, data, requestOptions)
    .then(res => {
      if (res.status === 200) {
      setPhotoUrl(newUrl)
      } else {
        setMessage('There was an Error Uploading Your Photo. Please try Again.')
        addToast ('Upload was unsuccessful. Please refresh the page and try again. Contact IT if the problem continues.', { appearance: 'error', autoDismiss: true });

      }
    })
  }

  const handleDelete = () => {
    axios.delete(`${config.SKINCAREBASEURL}/api/challenge/delete-glow-submission-admin/${entry.glowSubmissionId}`).then((res) => {
      setShowDelete(!showDelete);
      props.history.push('/Challenge/Glow-Entries');
    }).catch(err=>{
      addToast ('Delete was unsuccessful. Please refresh the page and try again. Contact IT if the problem continues.', { appearance: 'error'});

    })
  };

  const checkProduct = (p) => {
    if (entry.products.some((product) => product.name === p)) {
      return true;
    }
    return false;
  };

  const goBack = () => props.history.goBack();

  return (<>
    {permissionFeched?(view?<div style={{ margin: '0 8%' }}>
      <h1>Glow Challenge Submission</h1>
      <PopUp style={showDelete ? { display: "block" } : { display: "none" }}>
        <Model type="submission" close={handlePopUp} delete={handleDelete} text="Deleting this submission will delete all photos, questionnaire answers and other information associated with the submission as well. This action can not be undone." />
      </PopUp>
      <EntryDetails>
        <div className='page-header-link'>
          <button id='edit' onClick={goBack}>
            Back to Entry
          </button>
        </div>
        <Row>
          <Col style={{ marginRight: '9%' }}>
            <div>
              <label>Glow Submission ID</label>
              <span className='read-only-value'>{entry.glowSubmissionId}</span>
            </div>
            <div>
              <label>Glow Entry ID</label>
              <span className="read-only-value"><button className='label-btn' onClick={goBack}>{entry.glowEntryId}</button></span>
            </div>
            <div>
              <label>Date Created</label>
              <span className='read-only-value'>
                <Moment format='MM/DD/YYYY'>{entry.createdDate}</Moment>
              </span>
            </div>
            <div>
              <label>Challenge</label>
              <span className='read-only-value'>{entry.challenge}</span>
            </div>
          </Col>

          <Col>
            <div>
              <label>Day</label>
              <span className='read-only-value'>{entry.day}</span>
            </div>
            <div>
              <label>Ambassador ID</label>
              <span className='read-only-value'>{entry.ambId}</span>
            </div>
            <div>
              <label>Name</label>
              <span className="read-only-value">
              <Link className='label-btn' to={{ pathname: `/Challenge/Accounts/${entry.id}`,  state: entry }}>{entry.name}</Link>
              </span>
            </div>
            <div>
              <label>Email</label>
              <span className='read-only-value'>{entry.email}</span>
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col style={{ marginRight: '9%' }}>
            <Row>
              <label style={{ marginLeft: '16px' }}>Products</label>
              <Col>
                <div
                  className='read-only-value'
                  style={{
                    marginTop: '5px',
                    marginLeft: '-10px',
                    paddingRight: '-25px',
                  }}
                >
                  {entry.allProducts.slice(0, 7).map((p, i) => (
                    <div key={i} className='check'>
                      <input type='checkbox' checked={checkProduct(p.name)} />
                      <span>{p.name}</span>
                    </div>
                  ))}
                </div>
              </Col>
              <Col>
                {' '}
                <div className='read-only-value' style={{ marginTop: '5px', marginLeft: '-5px' }}>
                  {entry.allProducts.slice(7).map((p, i) => (
                    <div key={i} className='check'>
                      <input type='checkbox' checked={checkProduct(p.name)} />
                      <span>{p.name}</span>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>

            <div style={{ marginTop: '15px' }}>
              <label>Questionaire</label>
              <span className='read-only-value'>{entry.answers.length}/23</span>
            </div>
            <label style={{ marginTop: '15px' }}>Journey</label>
            <div
              style={{
                border: '1px solid #707070',
                padding: '10px',
                marginTop: '5px',
              }}
            >
              <div>{entry.story}</div>
            </div>
            <div
              style={{
                border: '1px solid #707070',
                padding: '1px',
                marginTop: '20px',
              }}
            >
              <GrayBox>
                <div>Scientific data is private, you can only see if information was submitted, not what was submitted.</div>
                <div className='check'>
                  <input type='checkbox' checked={entry.weight !== ''} />
                  <span>Weight</span>
                </div>
                <div className='check'>
                  <input type='checkbox' checked={entry.chest !== ''} />
                  <span>Chest</span>
                </div>
                <div className='check'>
                  <input type='checkbox' checked={entry.waist !== ''} />
                  <span>Waist</span>
                </div>
                <div className='check'>
                  <input type='checkbox' checked={entry.hips !== ''} />
                  <span>Hips</span>
                </div>
                <div className='check'>
                  <input type='checkbox' checked={entry.thigh !== ''} />
                  <span>Thigh</span>
                </div>
              </GrayBox>
            </div>
          </Col>

          <Col>
            <div style={{ marginBottom: '3%' }}>Day {entry.day} Photo </div>
            <ContestImage>
              <img src={photoUrl === '' ? entry.photoUrl : photoUrl} />
            {edit && <CloudUpload day={1} user={entry.id} save={handlePhotoUpload} /> }
            <h4>{message}</h4>
            </ContestImage>
         
          </Col>
        </Row>

        <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
         {edit && <Col>
            <Delete onClick={handlePopUp}>Delete Submission</Delete>
          </Col>}
        </Row>
      </EntryDetails>
    </div>:<Redirect to='/NoPermission'/> ):<SpinnerLoader/> }
    </>
  );
}

const GrayBox = styled.div`
  border: 1px solid #707070;
  padding: 15px;
  font: normal normal normal 16px/27px Segoe UI;
  color: #707070;
`;

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
    margin-top: 1em;
  }
  input[type='checkbox'] {
    appearance: none;
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 1.1em;
    height: 1.13em;
    border: 0.05em solid #707070;
    display: grid;
    place-content: center;
  }
  input[type='checkbox']::before {
    content: '';
    width: 0.85em;
    height: 0em;
  }

  input:checked {
    &:after {
      content: '✔';
      font-size: 17px;
      color: #707070;
      opacity: 0.9;
      width: 0em;
      height: 1.1em;
    }
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

const Delete = styled.button`
  background: #d10000;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 500;
  align-self: right;
  margin: 25px 3px;
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
export default connect(getComponentData)(GCEntryEdit);
