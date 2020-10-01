import gql from 'graphql-tag';
import { cartItemFragment } from './fragments';

export const cartItems = gql`
  query cartItems($where: CartItemWhereInput, $orderBy: CartItemOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    cartItems(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${cartItemFragment}
  }
`;
