import gql from 'graphql-tag';
import { permissionCollectionFragment } from './fragments';

export const permissionCollections = gql`
  query permissionCollections($where: PermissionCollectionWhereInput, $orderBy: PermissionCollectionOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    permissionCollections(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${permissionCollectionFragment}
  }
`;
