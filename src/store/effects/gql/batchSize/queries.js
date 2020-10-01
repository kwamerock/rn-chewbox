import gql from 'graphql-tag';
import { batchSizeFragment } from './fragments';

export const batchSizes = gql`
  query batchSizes($where: BatchSizeWhereInput, $orderBy: BatchSizeOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    batchSizes(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${batchSizeFragment}
  }
`;
