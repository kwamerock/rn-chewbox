import gql from 'graphql-tag';
import { clientFragment } from './fragments';

export const clients = gql`
  query clients($where: ClientWhereInput, $orderBy: ClientOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    clients(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${clientFragment}
  }
`;
