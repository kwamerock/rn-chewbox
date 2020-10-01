import gql from 'graphql-tag';
import { permissionAccessRuleFragment } from './fragments';

export const savePermissionAccessRule = gql`
  mutation savePermissionAccessRule($data: PermissionAccessRuleUpdateInput!, $where: PermissionAccessRuleWhereUniqueInput) {
    savePermissionAccessRule(data: $data, where: $where) ${permissionAccessRuleFragment}
  }
`;

export const deletePermissionAccessRule = gql`
  mutation deletePermissionAccessRule($where: PermissionAccessRuleWhereUniqueInput) {
    deletePermissionAccessRule(where: $where) ${permissionAccessRuleFragment}
  }
`;
