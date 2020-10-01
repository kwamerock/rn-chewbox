import gql from 'graphql-tag';
import { nutritionalFactFragment } from './fragments';

export const nutritionalFacts = gql`
  query nutritionalFacts($where: NutritionalFactWhereInput, $orderBy: NutritionalFactOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    nutritionalFacts(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${nutritionalFactFragment}
  }
`;
