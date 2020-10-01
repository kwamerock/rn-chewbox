import gql from 'graphql-tag';
import { eventDayFragment } from './fragments';

export const saveEventDay = gql`
  mutation saveEventDay($data: EventDayUpdateInput!, $where: EventDayWhereUniqueInput) {
    saveEventDay(data: $data, where: $where) ${eventDayFragment}
  }
`;

export const deleteEventDay = gql`
  mutation deleteEventDay($where: EventDayWhereUniqueInput) {
    deleteEventDay(where: $where) ${eventDayFragment}
  }
`;
