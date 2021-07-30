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
mutation changeCoaDocument($coaDocumentID: Int!, $batchNumber:String!, $isExternal: Byte!, $uploadedOn: DateTime!){
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
