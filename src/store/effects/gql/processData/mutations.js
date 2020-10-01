import gql from 'graphql-tag';
import { processDataFragment } from './fragments';

export const saveProcessData = gql`
  mutation saveProcessData($data: ProcessDataUpdateInput!, $where: ProcessDataWhereUniqueInput) {
    saveProcessData(data: $data, where: $where) ${processDataFragment}
  }
`;

export const deleteProcessData = gql`
  mutation deleteProcessData($where: ProcessDataWhereUniqueInput) {
    deleteProcessData(where: $where) ${processDataFragment}
  }
`;
