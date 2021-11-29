import gql from 'graphql-tag';

export const UPDATE_STAR_PRODUCT = gql`
  mutation updateStarProduct($_inventoryId: Int!, $_points: Decimal!, $isActive: Int!, $size: String, $country: String!, $description: String!) {
    changeStarShipInventory(input: { inventoryId: $_inventoryId, points: $_points, isActive: $isActive, size: $size, country: $country, description: $description }) {
      starShipInventory {
        inventoryId
      }
    }
  }
`;
