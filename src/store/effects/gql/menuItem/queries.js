import gql from 'graphql-tag';
import { menuItemFragment } from './fragments';

export const menuItems = gql`
  query menuItems($where: MenuItemWhereInput, $orderBy: MenuItemOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    menuItems(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${menuItemFragment}
  }
`;
