import React, {useEffect}from "react";
import styled from "styled-components";
import { REMOVE_PRODUCT, REMOVE_COA_DOCUMENT  } from '../utils/mutations'
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_PRODUCTS } from '../utils/GQLqueries';
import { useToasts } from 'react-toast-notifications';

function ConfirmDel(props) {
    const [removeProduct, ] = useMutation(REMOVE_PRODUCT)
    const [removeDocument ,error] = useMutation(REMOVE_COA_DOCUMENT)
    const { addToast } = useToasts();
    const { loading, data } = useQuery(GET_PRODUCTS);

    const handleDeleteProduct = async () => {
        const id = props.product.coaProductID
        try{
          const response = await removeProduct({variables: {coaProductID: id}  })
          if (response) {
            props.show()
           window.location.reload(true);
          }
        }
        catch (error) {
            addToast('Delete was unsuccessful. Please refresh the page and try again. Contact IT if the problem continues.', {appearance: 'error'})
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
      catch (err) {
        console.error(err.message);
          addToast('There was an error deleting this COA.', {appearance: 'error'})
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
