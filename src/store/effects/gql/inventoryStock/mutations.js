import gql from 'graphql-tag';
import { inventoryStockFragment } from './fragments';

export const saveInventoryStock = gql`
  mutation saveInventoryStock($data: InventoryStockUpdateInput!, $where: InventoryStockWhereUniqueInput) {
    saveInventoryStock(data: $data, where: $where) ${inventoryStockFragment}
  }
`;

export const deleteInventoryStock = gql`
  mutation deleteInventoryStock($where: InventoryStockWhereUniqueInput) {
    deleteInventoryStock(where: $where) ${inventoryStockFragment}
  }
`;
