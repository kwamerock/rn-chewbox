import gql from 'graphql-tag';
import { campaignLocationFragment } from './fragments';

export const saveCampaignLocation = gql`
  mutation saveCampaignLocation($data: CampaignLocationUpdateInput!, $where: CampaignLocationWhereUniqueInput) {
    saveCampaignLocation(data: $data, where: $where) ${campaignLocationFragment}
  }
`;

export const deleteCampaignLocation = gql`
  mutation deleteCampaignLocation($where: CampaignLocationWhereUniqueInput) {
    deleteCampaignLocation(where: $where) ${campaignLocationFragment}
  }
`;
