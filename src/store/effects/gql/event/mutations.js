import gql from 'graphql-tag';
import { eventFragment } from './fragments';

export const saveEvent = gql`
  mutation saveEvent($data: EventUpdateInput!, $where: EventWhereUniqueInput) {
    saveEvent(data: $data, where: $where) ${eventFragment}
  }
`;

export const deleteEvent = gql`
  mutation deleteEvent($where: EventWhereUniqueInput) {
    deleteEvent(where: $where) ${eventFragment}
  }
`;
