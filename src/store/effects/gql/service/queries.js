import gql from 'graphql-tag';
import { serviceFragment } from './fragments';

export const services = gql`
  query services($where: ServiceWhereInput, $orderBy: ServiceOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    services(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${serviceFragment}
  }
`;
