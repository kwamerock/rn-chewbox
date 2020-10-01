import gql from 'graphql-tag';
import { cartFragment } from './fragments';

export const saveCart = gql`
  mutation saveCart($data: CartUpdateInput!, $where: CartWhereUniqueInput) {
    saveCart(data: $data, where: $where) ${cartFragment}
  }
`;

export const deleteCart = gql`
  mutation deleteCart($where: CartWhereUniqueInput) {
    deleteCart(where: $where) ${cartFragment}
  }
`;
