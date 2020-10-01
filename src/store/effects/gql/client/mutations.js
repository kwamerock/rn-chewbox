import gql from 'graphql-tag';
import { clientFragment } from './fragments';

export const saveClient = gql`
  mutation saveClient($data: ClientUpdateInput!, $where: ClientWhereUniqueInput) {
    saveClient(data: $data, where: $where) ${clientFragment}
  }
`;

export const deleteClient = gql`
  mutation deleteClient($where: ClientWhereUniqueInput) {
    deleteClient(where: $where) ${clientFragment}
  }
`;
