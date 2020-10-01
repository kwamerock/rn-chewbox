import gql from 'graphql-tag';
import { clockInFragment } from './fragments';

export const clockIns = gql`
  query clockIns($where: ClockInWhereInput, $orderBy: ClockInOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    clockIns(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${clockInFragment}
  }
`;
