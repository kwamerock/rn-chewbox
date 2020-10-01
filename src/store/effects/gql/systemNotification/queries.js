import gql from 'graphql-tag';
import { systemNotificationFragment } from './fragments';

export const systemNotifications = gql`
  query systemNotifications($where: SystemNotificationWhereInput, $orderBy: SystemNotificationOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    systemNotifications(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${systemNotificationFragment}
  }
`;
