import gql from 'graphql-tag';
import { scheduleBreakFragment } from './fragments';

export const scheduleBreaks = gql`
  query scheduleBreaks($where: ScheduleBreakWhereInput, $orderBy: ScheduleBreakOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    scheduleBreaks(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${scheduleBreakFragment}
  }
`;
