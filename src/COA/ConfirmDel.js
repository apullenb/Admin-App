import React from 'react'
import styled from "styled-components";



function ConfirmDel() {
    return (
        <div>
            <h1>Are You Sure You Want to Delete This Product?</h1>
            <ButtonRow><button id='del'>Delete</button> <button id='cancel'>Cancel</button></ButtonRow>
        </div>
    )
}

export default ConfirmDel



const ButtonRow = styled.div`
margin: 10% 5% 1% 5%;

#del {
    margin: 0 5%;
    background: #D10000;
    color: white;
    font: normal Segoe UI;
    font-size: 16px;
    font-weight: 600;
    border: none;
    padding: 4px 20px;
}
#cancel {
    margin: 0 5%;
    background: #0F4B8F;
    color: white;
    font: normal Segoe UI;
    font-size: 16px;
    font-weight: 600;
    border: none;
    padding: 4px 20px;
}

`
