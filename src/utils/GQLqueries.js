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

export const GET_DOCUMENTS_BY_PRODUCT_ID = gql`
  query fetchDocs($productID: Int!) {
    documents(
      where: { coaProductID: { eq: $productID } }
      order: { sortOrder: ASC }
    ) {
      coaDocumentID
      batchNumber
      isExternal
      uploadedOn
      fileUrl
      sortOrder
    }
  }
`;
