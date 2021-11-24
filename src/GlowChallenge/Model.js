import React from 'react';
import styled from "styled-components";
function Model(props) {
    return (
       
            <ShowModel>
            <h2>Are you sure you want to delete this {props.type}?</h2>
            <p style={{marginTop:'4%'}}>{props.text}</p>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around', margin:'0 5%'}}>
                <Delete onClick={props.delete} >Delete </Delete>
                <Cancel onClick={props.close}>Cancel</Cancel>
            </div>
            </ShowModel>

    )
}

const Delete = styled.button`
background: #D10000;
color: white;
border: none;
padding: 8px 30px;
font-size:14px;
font-weight: 500;
align-self: right;
margin: 15px 3px; 
`;

const Cancel = styled.button `
background: #0F4B8F;
color: white;
border: none;
padding: 8px 30px;
font-size:14px;
font-weight: 500;
align-self: right;
margin: 15px 3px; 

`

const ShowModel = styled.div`
    position: absolute;
    background-color: white;
    z-index:3;
    border: 1px solid black;
    padding: 2%;
    width: 36%;
    margin-left: 30%;
    margin-top: 15%;
    text-align: center;
    color: #707070;
    font-weight: 500;
`;

export default Model
