import gql from 'graphql-tag';
import { phoneFragment } from './fragments';

export const savePhone = gql`
  mutation savePhone($data: PhoneUpdateInput!, $where: PhoneWhereUniqueInput) {
    savePhone(data: $data, where: $where) ${phoneFragment}
  }
`;

export const deletePhone = gql`
  mutation deletePhone($where: PhoneWhereUniqueInput) {
    deletePhone(where: $where) ${phoneFragment}
  }
`;
