import gql from 'graphql-tag';

export const GET_STAR_PRODUCTS = gql`
  query {
    starShipInventory {
      inventoryId
      points
      isActive
      description
      category
      productSku
    }
  }
`;
// { $orderBy: ASC }
export const GET_STAR_PRODUCTS_WITH_PAGE = gql`
  query fetchAllWithPaging($skip: Int!, $take: Int!, $filterJson: StarShipInventoryFilterInput, $order: [StarShipInventorySortInput!]) {
    starShipInventoryWithPaging(skip: $skip, take: $take, where: $filterJson, order: $order) {
      items {
        inventoryId
        country
        productSku
        originalPoints
        points
        isActive
        description
        category
        sortOrder
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
      }
      totalCount
    }
  }
`;

export const GET_STAR_PODUCTS_BY_ID = gql`
  query fetchbyID($inventoryId: Int!) {
    starShipInventory(where: { inventoryId: { eq: $inventoryId } }) {
      inventoryId
      points
      isActive
      description
      category
      productSku
      largeImage
      smallImage
      country
      size
    }
  }
`;
