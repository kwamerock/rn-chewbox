import gql from 'graphql-tag';
import { mediaCollectionFragment } from './fragments';

export const saveMediaCollection = gql`
  mutation saveMediaCollection($data: MediaCollectionUpdateInput!, $where: MediaCollectionWhereUniqueInput) {
    saveMediaCollection(data: $data, where: $where) ${mediaCollectionFragment}
  }
`;

export const deleteMediaCollection = gql`
  mutation deleteMediaCollection($where: MediaCollectionWhereUniqueInput) {
    deleteMediaCollection(where: $where) ${mediaCollectionFragment}
  }
`;
