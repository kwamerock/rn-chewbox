import gql from 'graphql-tag';
import { scheduleFragment } from './fragments';

export const schedules = gql`
  query schedules($where: ScheduleWhereInput, $orderBy: ScheduleOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    schedules(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${scheduleFragment}
  }
`;
