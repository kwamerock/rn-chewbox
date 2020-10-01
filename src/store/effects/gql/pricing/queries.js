import gql from 'graphql-tag';
import { pricingFragment } from './fragments';

export const pricings = gql`
  query pricings($where: PricingWhereInput, $orderBy: PricingOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    pricings(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${pricingFragment}
  }
`;
