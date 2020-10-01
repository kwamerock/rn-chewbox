import gql from 'graphql-tag';
import { paymentFragment } from './fragments';

export const savePayment = gql`
  mutation savePayment($data: PaymentUpdateInput!, $where: PaymentWhereUniqueInput) {
    savePayment(data: $data, where: $where) ${paymentFragment}
  }
`;

export const deletePayment = gql`
  mutation deletePayment($where: PaymentWhereUniqueInput) {
    deletePayment(where: $where) ${paymentFragment}
  }
`;
