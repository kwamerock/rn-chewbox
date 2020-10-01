import gql from 'graphql-tag';
import { serviceFragment } from './fragments';

export const saveService = gql`
  mutation saveService($data: ServiceUpdateInput!, $where: ServiceWhereUniqueInput) {
    saveService(data: $data, where: $where) ${serviceFragment}
  }
`;

export const deleteService = gql`
  mutation deleteService($where: ServiceWhereUniqueInput) {
    deleteService(where: $where) ${serviceFragment}
  }
`;
