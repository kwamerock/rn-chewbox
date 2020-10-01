import gql from 'graphql-tag';
import { eventDayFragment } from './fragments';

export const eventDays = gql`
  query eventDays($where: EventDayWhereInput, $orderBy: EventDayOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    eventDays(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${eventDayFragment}
  }
`;
