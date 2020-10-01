import gql from 'graphql-tag';
import { servicePasswordFragment } from './fragments';

export const saveServicePassword = gql`
  mutation saveServicePassword($data: ServicePasswordUpdateInput!, $where: ServicePasswordWhereUniqueInput) {
    saveServicePassword(data: $data, where: $where) ${servicePasswordFragment}
  }
`;

export const deleteServicePassword = gql`
  mutation deleteServicePassword($where: ServicePasswordWhereUniqueInput) {
    deleteServicePassword(where: $where) ${servicePasswordFragment}
  }
`;
