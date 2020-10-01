import gql from 'graphql-tag';
import { adImpressionFragment } from './fragments';

export const adImpressions = gql`
  query adImpressions($where: AdImpressionWhereInput, $orderBy: AdImpressionOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    adImpressions(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${adImpressionFragment}
  }
`;
