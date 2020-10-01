import gql from 'graphql-tag';
import { processDataFragment } from './fragments';

export const processData = gql`
  query processData($where: ProcessDataWhereInput, $orderBy: ProcessDataOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    processData(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${processDataFragment}
  }
`;
