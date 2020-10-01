import gql from 'graphql-tag';
import { holdTimeFragment } from './fragments';

export const holdTimes = gql`
  query holdTimes($where: HoldTimeWhereInput, $orderBy: HoldTimeOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    holdTimes(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${holdTimeFragment}
  }
`;
