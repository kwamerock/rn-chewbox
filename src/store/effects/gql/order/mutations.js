import gql from 'graphql-tag';
import { orderFragment } from './fragments';

export const saveOrder = gql`
  mutation saveOrder($data: OrderUpdateInput!, $where: OrderWhereUniqueInput) {
    saveOrder(data: $data, where: $where) ${orderFragment}
  }
`;

export const deleteOrder = gql`
  mutation deleteOrder($where: OrderWhereUniqueInput) {
    deleteOrder(where: $where) ${orderFragment}
  }
`;
