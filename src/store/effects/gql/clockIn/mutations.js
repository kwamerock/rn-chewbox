import gql from 'graphql-tag';
import { clockInFragment } from './fragments';

export const saveClockIn = gql`
  mutation saveClockIn($data: ClockInUpdateInput!, $where: ClockInWhereUniqueInput) {
    saveClockIn(data: $data, where: $where) ${clockInFragment}
  }
`;

export const deleteClockIn = gql`
  mutation deleteClockIn($where: ClockInWhereUniqueInput) {
    deleteClockIn(where: $where) ${clockInFragment}
  }
`;
