import gql from 'graphql-tag';
import { searchHistoryFragment } from './fragments';

export const searchHistories = gql`
  query searchHistories($where: SearchHistoryWhereInput, $orderBy: SearchHistoryOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    searchHistories(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${searchHistoryFragment}
  }
`;
