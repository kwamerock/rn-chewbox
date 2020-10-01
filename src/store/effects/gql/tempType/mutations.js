import gql from 'graphql-tag';
import { tempTypeFragment } from './fragments';

export const saveTempType = gql`
  mutation saveTempType($data: TempTypeUpdateInput!, $where: TempTypeWhereUniqueInput) {
    saveTempType(data: $data, where: $where) ${tempTypeFragment}
  }
`;

export const deleteTempType = gql`
  mutation deleteTempType($where: TempTypeWhereUniqueInput) {
    deleteTempType(where: $where) ${tempTypeFragment}
  }
`;
