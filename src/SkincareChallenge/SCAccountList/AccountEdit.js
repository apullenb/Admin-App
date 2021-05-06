import React, {useState} from 'react';
import PageWrapper from "../../GlobalComponents/PageWrapper";
import styled from 'styled-components';
import {Link} from 'react-router-dom'


function AccountEdit(props) {
const user = props.location.state


    return (
        <div>
             <PageWrapper>
        <h1>Skincare Challenge Edit Account</h1>
        <div style={{alignSelf:'flex-end', margin:'3px 30%'}}><Link to='/Skincare-Challenge-Accounts' ><button id='edit'>Back to list</button></Link></div>
        <Main>
        <h5 style={div}>Account ID: {user.accountId}</h5>
        <div style={div}>Ambassador ID:  <input type='text' defaultValue={user.ambassadorID} /></div>
        <div style={div}>Name: <input type='text' defaultValue={user.name} /></div>
        <div style={div}>Email: <input type='text' defaultValue={user.email} /></div>
        <div style={div}><button>Save</button> <button>Send Password Reset</button></div>
        
        </Main>
        </PageWrapper>
        </div>
    )
}

export default AccountEdit;

const Main = styled.section`
margin: 1% 5%;
color: rgb(94, 93, 93);
font-weight: 400;
font-size: 17px;
display:flex;
flex-direction: column;
align-items: baseline;
justify-content: space-around;

`
const div = {
    margin: '1% 0px',
    padding: '5px',
 
    width: '250px',


}

