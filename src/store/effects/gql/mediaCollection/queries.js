import gql from 'graphql-tag';
import { mediaCollectionFragment } from './fragments';

export const mediaCollections = gql`
  query mediaCollections($where: MediaCollectionWhereInput, $orderBy: MediaCollectionOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    mediaCollections(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${mediaCollectionFragment}
  }
`;
