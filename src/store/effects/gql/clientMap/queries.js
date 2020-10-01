import gql from 'graphql-tag';
import { clientMapFragment } from './fragments';

export const clientMaps = gql`
  query clientMaps($where: ClientMapWhereInput, $orderBy: ClientMapOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    clientMaps(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${clientMapFragment}
  }
`;
