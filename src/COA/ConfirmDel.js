import React from "react";
import styled from "styled-components";
import { REMOVE_PRODUCT  } from '../utils/mutations'
import { useMutation, useQuery } from '@apollo/react-hooks';
import {  ToastProvider, useToasts } from "react-toast-notifications";


function ConfirmDel(props) {
    const [removeProduct, { error }] = useMutation(REMOVE_PRODUCT)
    const { addToast } = useToasts();


    const handleDelete = async () => {
        const id = props.product.coaProductID
        try{
          const response = await removeProduct({variables: {coaProductID: id}  })
           if (response) props.show()
           addToast('Product has been deleted.', {appearance: 'success', autoDismiss: true})
           
        }
        catch (error) {
            console.log(error)
            addToast('There was an error deleting this product.', {appearance: 'error', autoDismiss: true})
        }
    }


    return (
        <Delete>
            <h1>Are You Sure You Want to Delete This Product?</h1>
            <p>{props.name}</p>
            <ButtonRow><button id='del' onClick={handleDelete}>Delete</button>
             <button id='cancel' onClick={props.show}>Cancel</button></ButtonRow>
        </Delete>
    )
}

export default ConfirmDel

const Delete = styled.div`

h1 {
  text-align: center;
  font-size: 32px;
}
p {
 font-size: 23px;
 margin: 2%;
}
`;

const ButtonRow = styled.div`
  margin: 10% 5% 1% 5%;

  #del {
    margin: 0 5%;
    background: #d10000;
    color: white;
    font: normal Segoe UI;
    font-size: 16px;
    font-weight: 600;
    border: none;
    padding: 4px 20px;
  }
  #cancel {
    margin: 0 5%;
    background: #0f4b8f;
    color: white;
    font: normal Segoe UI;
    font-size: 16px;
    font-weight: 600;
    border: none;
    padding: 4px 20px;
  }
`;
