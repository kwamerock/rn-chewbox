import gql from 'graphql-tag';
import { permissionFragment } from './fragments';

export const permissions = gql`
  query permissions($where: PermissionWhereInput, $orderBy: PermissionOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    permissions(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${permissionFragment}
  }
`;
