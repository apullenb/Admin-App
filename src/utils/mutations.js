import gql from "graphql-tag";

export const ADD_DOCUMENT = gql`
  mutation document($coaProductID: Int!) {
    addCoaDocument(
      input: {
        coaProductID: $coaProductID
        batchNumber: "FZ-78ST"
        isExternal: 1
        uploadedOn: "2021-07-19"
        fileUrl: "FZ-78ST.pdf"
        sortOrder: 1000
      }
    ) {
      coaDocument {
        coaDocumentID
        batchNumber
        uploadedOn
      }
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

export const EDIT_DOCUMENT = gql`
  mutation document($coaDocumentID: Int!) {
    changeCoaDocument(
      input: {
        coaDocumentID: $coaDocumentID
        batchNumber: "ABCD"
        isExternal: 1
        uploadedOn: "2021-07-18"
        fileUrl: "ABCD.pdf"
        sortOrder: 2000
      }
    ) {
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

export const REMOVE_PRODUCT = gql`
  mutation document($coaProductID: Int!) {
    removeCoaProduct(input: { coaProductID: $coaProductID }) {
      success
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
