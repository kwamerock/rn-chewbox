import gql from 'graphql-tag';
import { inventoryProductFragment } from './fragments';

export const saveInventoryProduct = gql`
  mutation saveInventoryProduct($data: InventoryProductUpdateInput!, $where: InventoryProductWhereUniqueInput) {
    saveInventoryProduct(data: $data, where: $where) ${inventoryProductFragment}
  }
`;

export const deleteInventoryProduct = gql`
  mutation deleteInventoryProduct($where: InventoryProductWhereUniqueInput) {
    deleteInventoryProduct(where: $where) ${inventoryProductFragment}
  }
`;
