import gql from 'graphql-tag';
import { scheduleFragment } from './fragments';

export const saveSchedule = gql`
  mutation saveSchedule($data: ScheduleUpdateInput!, $where: ScheduleWhereUniqueInput) {
    saveSchedule(data: $data, where: $where) ${scheduleFragment}
  }
`;

export const deleteSchedule = gql`
  mutation deleteSchedule($where: ScheduleWhereUniqueInput) {
    deleteSchedule(where: $where) ${scheduleFragment}
  }
`;
