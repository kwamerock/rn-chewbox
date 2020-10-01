import gql from 'graphql-tag';
import { mediaCollectionMemberFragment } from './fragments';

export const mediaCollectionMembers = gql`
  query mediaCollectionMembers($where: MediaCollectionMemberWhereInput, $orderBy: MediaCollectionMemberOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    mediaCollectionMembers(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${mediaCollectionMemberFragment}
  }
`;
