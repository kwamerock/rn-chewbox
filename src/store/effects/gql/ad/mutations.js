import gql from 'graphql-tag';
import { adFragment } from './fragments';

export const saveAd = gql`
  mutation saveAd($data: AdUpdateInput!, $where: AdWhereUniqueInput) {
    saveAd(data: $data, where: $where) ${adFragment}
  }
`;

export const deleteAd = gql`
  mutation deleteAd($where: AdWhereUniqueInput) {
    deleteAd(where: $where) ${adFragment}
  }
`;
