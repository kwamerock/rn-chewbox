import gql from 'graphql-tag';
import { prepTimeFragment } from './fragments';

export const prepTimes = gql`
  query prepTimes($where: PrepTimeWhereInput, $orderBy: PrepTimeOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    prepTimes(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${prepTimeFragment}
  }
`;
