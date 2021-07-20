import {gql} from 'apollo-boost';


export const getAllProducts = gql`
   {
        products {
            id
            productName
            category
            region
            lastUpdated
        }
   } 

`

