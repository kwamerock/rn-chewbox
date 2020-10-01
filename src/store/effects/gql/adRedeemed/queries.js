import gql from 'graphql-tag';
import { adRedeemedFragment } from './fragments';

export const adRedeemeds = gql`
  query adRedeemeds($where: AdRedeemedWhereInput, $orderBy: AdRedeemedOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    adRedeemeds(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${adRedeemedFragment}
  }
`;
