import gql from 'graphql-tag';
import { adImageFragment } from './fragments';

export const saveAdImage = gql`
  mutation saveAdImage($data: AdImageUpdateInput!, $where: AdImageWhereUniqueInput) {
    saveAdImage(data: $data, where: $where) ${adImageFragment}
  }
`;

export const deleteAdImage = gql`
  mutation deleteAdImage($where: AdImageWhereUniqueInput) {
    deleteAdImage(where: $where) ${adImageFragment}
  }
`;
