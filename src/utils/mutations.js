import gql from 'graphql-tag';

export const ADD_DOCUMENT = gql`
mutation addCoaDocument($coaProductID: Int!, $batchNumber:String!, $isExternal: Byte, $uploadedOn: DateTime, $fileUrl: String, $sortOrder: Int!){
    addCoaDocument(input: { 
      coaProductID: $coaProductID,
      batchNumber: $batchNumber,
      isExternal: $isExternal,
      uploadedOn: $uploadedOn,
      fileUrl: $fileUrl,
      sortOrder: $sortOrder
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

  