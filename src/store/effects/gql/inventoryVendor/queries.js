import gql from 'graphql-tag';
import { inventoryVendorFragment } from './fragments';

export const inventoryVendors = gql`
  query inventoryVendors($where: InventoryVendorWhereInput, $orderBy: InventoryVendorOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    inventoryVendors(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${inventoryVendorFragment}
  }
`;
