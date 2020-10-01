import gql from 'graphql-tag';
import { permissionCollectionFragment } from './fragments';

export const savePermissionCollection = gql`
  mutation savePermissionCollection($data: PermissionCollectionUpdateInput!, $where: PermissionCollectionWhereUniqueInput) {
    savePermissionCollection(data: $data, where: $where) ${permissionCollectionFragment}
  }
`;

export const deletePermissionCollection = gql`
  mutation deletePermissionCollection($where: PermissionCollectionWhereUniqueInput) {
    deletePermissionCollection(where: $where) ${permissionCollectionFragment}
  }
`;
