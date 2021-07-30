import React, {useEffect}from "react";
import styled from "styled-components";
import { REMOVE_PRODUCT, REMOVE_COA_DOCUMENT  } from '../utils/mutations'
import { useMutation, useQuery } from '@apollo/react-hooks';
import {  ToastProvider, useToasts } from "react-toast-notifications";
import { GET_PRODUCTS } from '../utils/GQLqueries';

function ConfirmDel(props) {
    const [removeProduct, { error }] = useMutation(REMOVE_PRODUCT)
    const [removeDocument] = useMutation(REMOVE_COA_DOCUMENT)
    const { addToast } = useToasts();
    const { loading, data } = useQuery(GET_PRODUCTS);


    const handleDeleteProduct = async () => {
        const id = props.product.coaProductID
        try{
          const response = await removeProduct({variables: {coaProductID: id}  })
          if (response) {
            addToast('Product has been deleted.', {appearance: 'success', autoDismiss: true})
            props.show()
           window.location.reload(true);
          }
        }
        catch (error) {
            console.log(error)
            addToast('There was an error deleting this product.', {appearance: 'error', autoDismiss: true})
        }
    }

    const handleDeleteCOA = async () => {
      const id = props.document.coaDocumentID
      try{
        const response = await removeDocument({variables: {coaDocumentID: id}  })
        if (response) {
          addToast('COA has been deleted.', {appearance: 'success', autoDismiss: true})
          props.show()
         window.location.reload(true);
        }
      }
      catch (error) {
          console.log(error)
          addToast('There was an error deleting this COA.', {appearance: 'error', autoDismiss: true})
      }
  }


    return (
        <Delete>
            <h1>Are You Sure You Want to Delete This {props.type}?</h1>
            <p>{props.name}</p>
            <ButtonRow><button id='del' onClick={props.type === 'COA' ? handleDeleteCOA : handleDeleteProduct}>Delete</button>
             <button id='cancel' onClick={props.show}>Cancel</button></ButtonRow>
        </Delete>
    )
}

export default ConfirmDel

const Delete = styled.div`

h1 {
  text-align: center;
  font-size: 28px;
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
