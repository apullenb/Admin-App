import gql from "graphql-tag";

export const ADD_DOCUMENT = gql`
mutation addCoaDocument($coaProductID: Int!, $batchNumber:String!, $isExternal: Byte!, $uploadedOn: DateTime!, $fileUrl: String!){
    addCoaDocument(input: { 
      coaProductID: $coaProductID,
      batchNumber: $batchNumber,
      isExternal: $isExternal,
      sortOrder: 1,
      uploadedOn: $uploadedOn,
      fileUrl: $fileUrl,
      }) {
          coaDocument {
          coaDocumentID
          batchNumber
          uploadedOn
      }
    }
  }
`;


export const EDIT_DOCUMENT = gql`
mutation changeCoaDocument($coaDocumentID: Int!, $batchNumber:String!, $isExternal: Byte!, $uploadedOn: DateTime){
    changeCoaDocument(input: { 
      coaDocumentID: $coaDocumentID,
      batchNumber: $batchNumber,
      isExternal: $isExternal,
      uploadedOn: $uploadedOn,
      }) {
        coaDocument {
            coaDocumentID
            coaProductID
            batchNumber
            isExternal
            uploadedOn
            fileUrl
            sortOrder
        }
    }
  }
  
  `;

export const UPDATE_DOCUMENT_SORT_ORDER = gql`
  mutation changeDocuments(
    $coaProductID: Int!
    $documents: [ChangeCoaDocumentInput!]!
  ) {
    changeCoaDocuments(coaProductID: $coaProductID, documents: $documents) {
      success
    }
  }
`;

export const REMOVE_COA_DOCUMENT = gql`
  mutation document($coaDocumentID: Int!) {
    removeCoaDocument(input: { coaDocumentID: $coaDocumentID }) {
      success
    }
  }
`;


export const ADD_PRODUCT = gql`
  mutation product($product: String!, $region: String!, $categoryID: Int!, $lastUpdatedOn: DateTime! ) {
    addCoaProduct(
      input: {
        productName: $product
        region: $region
        categoryID: $categoryID
        lastUpdatedOn: $lastUpdatedOn
      }
    ) {
      coaProduct {
        coaProductID
        productName
        region
        lastUpdatedOn
        categoryID
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation product($product: String, $region: String, $categoryID: Int, $lastUpdatedOn: DateTime, $coaProductID: Int! ) {
    changeCoaProduct(
      input: {
        productName: $product
        region: $region
        categoryID: $categoryID
        lastUpdatedOn: $lastUpdatedOn
        coaProductID: $coaProductID
      }
    ) {
      coaProduct {
        coaProductID
        productName
        region
        lastUpdatedOn
        categoryID
      }
    }
  }
`;


export const REMOVE_PRODUCT = gql`
  mutation document($coaProductID: Int!) {
    removeCoaProduct(input: { coaProductID: $coaProductID }) {
      success
    }
  }
`;