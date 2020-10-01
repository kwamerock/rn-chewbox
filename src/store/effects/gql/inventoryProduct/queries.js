import gql from 'graphql-tag';
import { inventoryProductFragment } from './fragments';

export const inventoryProducts = gql`
  query inventoryProducts($where: InventoryProductWhereInput, $orderBy: InventoryProductOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    inventoryProducts(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${inventoryProductFragment}
  }
`;
