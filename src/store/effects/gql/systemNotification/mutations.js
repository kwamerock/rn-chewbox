import gql from 'graphql-tag';
import { systemNotificationFragment } from './fragments';

export const saveSystemNotification = gql`
  mutation saveSystemNotification($data: SystemNotificationUpdateInput!, $where: SystemNotificationWhereUniqueInput) {
    saveSystemNotification(data: $data, where: $where) ${systemNotificationFragment}
  }
`;

export const deleteSystemNotification = gql`
  mutation deleteSystemNotification($where: SystemNotificationWhereUniqueInput) {
    deleteSystemNotification(where: $where) ${systemNotificationFragment}
  }
`;
