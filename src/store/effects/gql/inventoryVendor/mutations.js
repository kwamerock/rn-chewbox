import gql from 'graphql-tag';
import { inventoryVendorFragment } from './fragments';

export const saveInventoryVendor = gql`
  mutation saveInventoryVendor($data: InventoryVendorUpdateInput!, $where: InventoryVendorWhereUniqueInput) {
    saveInventoryVendor(data: $data, where: $where) ${inventoryVendorFragment}
  }
`;

export const deleteInventoryVendor = gql`
  mutation deleteInventoryVendor($where: InventoryVendorWhereUniqueInput) {
    deleteInventoryVendor(where: $where) ${inventoryVendorFragment}
  }
`;
