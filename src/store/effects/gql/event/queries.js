import gql from 'graphql-tag';
import { eventFragment } from './fragments';

export const events = gql`
  query events($where: EventWhereInput, $orderBy: EventOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    events(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${eventFragment}
  }
`;
