import gql from 'graphql-tag';
import { holdTimeFragment } from './fragments';

export const saveHoldTime = gql`
  mutation saveHoldTime($data: HoldTimeUpdateInput!, $where: HoldTimeWhereUniqueInput) {
    saveHoldTime(data: $data, where: $where) ${holdTimeFragment}
  }
`;

export const deleteHoldTime = gql`
  mutation deleteHoldTime($where: HoldTimeWhereUniqueInput) {
    deleteHoldTime(where: $where) ${holdTimeFragment}
  }
`;
