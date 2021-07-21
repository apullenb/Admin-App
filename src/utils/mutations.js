import gql from 'graphql-tag';

export const ADD_DOCUMENT = gql`
mutation document($coaProductID: Int!){
    addCoaDocument(input: { 
      coaProductID: $coaProductID,
      batchNumber: "FZ-78ST",
      isExternal: 1,
      uploadedOn: "2021-07-19"
      fileUrl: "FZ-78ST.pdf",
      sortOrder: 1000
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
mutation document($coaDocumentID: Int!){
    changeCoaDocument(input: { 
      coaDocumentID: $coaDocumentID,
      batchNumber: "ABCD",
      isExternal: 1, 
      uploadedOn: "2021-07-18",
      fileUrl: "ABCD.pdf",
      sortOrder: 2000
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

  