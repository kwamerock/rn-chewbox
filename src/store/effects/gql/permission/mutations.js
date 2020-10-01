import gql from 'graphql-tag';
import { permissionFragment } from './fragments';

export const savePermission = gql`
  mutation savePermission($data: PermissionUpdateInput!, $where: PermissionWhereUniqueInput) {
    savePermission(data: $data, where: $where) ${permissionFragment}
  }
`;

export const deletePermission = gql`
  mutation deletePermission($where: PermissionWhereUniqueInput) {
    deletePermission(where: $where) ${permissionFragment}
  }
`;
