import gql from 'graphql-tag';
import { servicePasswordFragment } from './fragments';

export const servicePasswords = gql`
  query servicePasswords($where: ServicePasswordWhereInput, $orderBy: ServicePasswordOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    servicePasswords(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${servicePasswordFragment}
  }
`;
