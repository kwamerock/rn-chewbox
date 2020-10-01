import gql from 'graphql-tag';
import { prepTimeFragment } from './fragments';

export const savePrepTime = gql`
  mutation savePrepTime($data: PrepTimeUpdateInput!, $where: PrepTimeWhereUniqueInput) {
    savePrepTime(data: $data, where: $where) ${prepTimeFragment}
  }
`;

export const deletePrepTime = gql`
  mutation deletePrepTime($where: PrepTimeWhereUniqueInput) {
    deletePrepTime(where: $where) ${prepTimeFragment}
  }
`;
