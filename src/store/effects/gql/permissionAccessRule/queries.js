import gql from 'graphql-tag';
import { permissionAccessRuleFragment } from './fragments';

export const permissionAccessRules = gql`
  query permissionAccessRules($where: PermissionAccessRuleWhereInput, $orderBy: PermissionAccessRuleOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    permissionAccessRules(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${permissionAccessRuleFragment}
  }
`;
