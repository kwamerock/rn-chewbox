import gql from 'graphql-tag';
import { adImpressionFragment } from './fragments';

export const saveAdImpression = gql`
  mutation saveAdImpression($data: AdImpressionUpdateInput!, $where: AdImpressionWhereUniqueInput) {
    saveAdImpression(data: $data, where: $where) ${adImpressionFragment}
  }
`;

export const deleteAdImpression = gql`
  mutation deleteAdImpression($where: AdImpressionWhereUniqueInput) {
    deleteAdImpression(where: $where) ${adImpressionFragment}
  }
`;
