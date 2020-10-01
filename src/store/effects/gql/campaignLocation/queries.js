import gql from 'graphql-tag';
import { campaignLocationFragment } from './fragments';

export const campaignLocations = gql`
  query campaignLocations($where: CampaignLocationWhereInput, $orderBy: CampaignLocationOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    campaignLocations(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${campaignLocationFragment}
  }
`;
