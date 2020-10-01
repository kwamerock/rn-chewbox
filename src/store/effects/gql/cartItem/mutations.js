import gql from 'graphql-tag';
import { cartItemFragment } from './fragments';

export const saveCartItem = gql`
  mutation saveCartItem($data: CartItemUpdateInput!, $where: CartItemWhereUniqueInput) {
    saveCartItem(data: $data, where: $where) ${cartItemFragment}
  }
`;

export const deleteCartItem = gql`
  mutation deleteCartItem($where: CartItemWhereUniqueInput) {
    deleteCartItem(where: $where) ${cartItemFragment}
  }
`;
