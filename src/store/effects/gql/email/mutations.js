import gql from 'graphql-tag';
import { emailFragment } from './fragments';

export const saveEmail = gql`
  mutation saveEmail($data: EmailUpdateInput!, $where: EmailWhereUniqueInput) {
    saveEmail(data: $data, where: $where) ${emailFragment}
  }
`;

export const deleteEmail = gql`
  mutation deleteEmail($where: EmailWhereUniqueInput) {
    deleteEmail(where: $where) ${emailFragment}
  }
`;
