import gql from 'graphql-tag';

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

  