import gql from 'graphql-tag';
import { mediaCollectionMemberFragment } from './fragments';

export const saveMediaCollectionMember = gql`
  mutation saveMediaCollectionMember($data: MediaCollectionMemberUpdateInput!, $where: MediaCollectionMemberWhereUniqueInput) {
    saveMediaCollectionMember(data: $data, where: $where) ${mediaCollectionMemberFragment}
  }
`;

export const deleteMediaCollectionMember = gql`
  mutation deleteMediaCollectionMember($where: MediaCollectionMemberWhereUniqueInput) {
    deleteMediaCollectionMember(where: $where) ${mediaCollectionMemberFragment}
  }
`;
