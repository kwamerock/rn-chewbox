import gql from 'graphql-tag';
import { userSettingFragment } from './fragments';

export const userSettings = gql`
  query userSettings($where: UserSettingWhereInput, $orderBy: UserSettingOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    userSettings(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${userSettingFragment}
  }
`;
