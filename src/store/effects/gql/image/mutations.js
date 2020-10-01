import gql from 'graphql-tag';
import { imageFragment } from './fragments';

export const saveImage = gql`
  mutation saveImage($data: ImageUpdateInput!, $where: ImageWhereUniqueInput) {
    saveImage(data: $data, where: $where) ${imageFragment}
  }
`;

export const deleteImage = gql`
  mutation deleteImage($where: ImageWhereUniqueInput) {
    deleteImage(where: $where) ${imageFragment}
  }
`;
