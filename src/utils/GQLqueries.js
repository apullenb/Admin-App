import gql from 'graphql-tag';


export const GET_PRODUCTS = gql`
   {
        products {
            coaProductID
            productName
            region
            lastUpdatedOn
            categoryID
   } 
   }
`;



export const GET_PRODUCT_BY_ID = gql`
 query products($coaProductID: Int!) {
   products(
   where: {
            coaProductID: {
                eq: $coaProductID
            }
  }) 
      { 
        coaProductID
        productName 
        categoryID
        region
        coaDocuments {
            coaProductID
            coaDocumentID
            batchNumber
            isExternal
            uploadedOn
            fileUrl
            sortOrder
        }
      }
  
}
`;

export const GET_DOCUMENT_BY_ID = gql`
query documents($coaDocumentID: Int!){ 
    documents(
        where: {
            coaDocumentID: {
                eq: $coaDocumentID
            }
        })
    { 
        coaDocumentID
        coaProductID
        batchNumber
        isExternal
        uploadedOn
        fileUrl
        sortOrder
        product {
            coaProductID
            productName
        }
    } 
}`;
