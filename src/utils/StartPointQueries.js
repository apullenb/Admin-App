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

export const GET_STAR_PRODUCTS_WITH_PAGE = gql`
  query fetchAllWithPaging($skip: Int!, $take: Int!, $productSku: String, $category: String, $name: String) {
    starShipInventoryWithPaging(skip: $skip, take: $take, where: { and: [{ productSku: { startsWith: $productSku } }, { category: { startsWith: $category } }, { category: { startsWith: $name } }] }, order: { inventoryId: ASC }) {
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
