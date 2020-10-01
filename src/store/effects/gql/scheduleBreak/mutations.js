import gql from 'graphql-tag';
import { scheduleBreakFragment } from './fragments';

export const saveScheduleBreak = gql`
  mutation saveScheduleBreak($data: ScheduleBreakUpdateInput!, $where: ScheduleBreakWhereUniqueInput) {
    saveScheduleBreak(data: $data, where: $where) ${scheduleBreakFragment}
  }
`;

export const deleteScheduleBreak = gql`
  mutation deleteScheduleBreak($where: ScheduleBreakWhereUniqueInput) {
    deleteScheduleBreak(where: $where) ${scheduleBreakFragment}
  }
`;
