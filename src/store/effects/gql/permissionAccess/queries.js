import gql from 'graphql-tag';
import { permissionAccessFragment } from './fragments';

export const permissionAccess = gql`
  query permissionAccess($where: PermissionAccessWhereInput, $orderBy: PermissionAccessOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    permissionAccess(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${permissionAccessFragment}
  }
`;
