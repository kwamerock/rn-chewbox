import gql from 'graphql-tag';
import { inventoryStockFragment } from './fragments';

export const inventoryStocks = gql`
  query inventoryStocks($where: InventoryStockWhereInput, $orderBy: InventoryStockOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    inventoryStocks(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${inventoryStockFragment}
  }
`;
