import gql from 'graphql-tag';
import { menuItemFragment } from './fragments';

export const saveMenuItem = gql`
  mutation saveMenuItem($data: MenuItemUpdateInput!, $where: MenuItemWhereUniqueInput) {
    saveMenuItem(data: $data, where: $where) ${menuItemFragment}
  }
`;

export const deleteMenuItem = gql`
  mutation deleteMenuItem($where: MenuItemWhereUniqueInput) {
    deleteMenuItem(where: $where) ${menuItemFragment}
  }
`;
