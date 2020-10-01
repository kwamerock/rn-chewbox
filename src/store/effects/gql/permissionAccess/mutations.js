import gql from 'graphql-tag';
import { permissionAccessFragment } from './fragments';

export const savePermissionAccess = gql`
  mutation savePermissionAccess($data: PermissionAccessUpdateInput!, $where: PermissionAccessWhereUniqueInput) {
    savePermissionAccess(data: $data, where: $where) ${permissionAccessFragment}
  }
`;

export const deletePermissionAccess = gql`
  mutation deletePermissionAccess($where: PermissionAccessWhereUniqueInput) {
    deletePermissionAccess(where: $where) ${permissionAccessFragment}
  }
`;
