import gql from 'graphql-tag';
import { searchHistoryFragment } from './fragments';

export const saveSearchHistory = gql`
  mutation saveSearchHistory($data: SearchHistoryUpdateInput!, $where: SearchHistoryWhereUniqueInput) {
    saveSearchHistory(data: $data, where: $where) ${searchHistoryFragment}
  }
`;

export const deleteSearchHistory = gql`
  mutation deleteSearchHistory($where: SearchHistoryWhereUniqueInput) {
    deleteSearchHistory(where: $where) ${searchHistoryFragment}
  }
`;
