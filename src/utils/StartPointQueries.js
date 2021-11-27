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
