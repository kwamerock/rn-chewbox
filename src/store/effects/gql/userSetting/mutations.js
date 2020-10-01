import gql from 'graphql-tag';
import { userSettingFragment } from './fragments';

export const saveUserSetting = gql`
  mutation saveUserSetting($data: UserSettingUpdateInput!, $where: UserSettingWhereUniqueInput) {
    saveUserSetting(data: $data, where: $where) ${userSettingFragment}
  }
`;

export const deleteUserSetting = gql`
  mutation deleteUserSetting($where: UserSettingWhereUniqueInput) {
    deleteUserSetting(where: $where) ${userSettingFragment}
  }
`;
