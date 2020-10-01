import gql from 'graphql-tag';
import { clientMapFragment } from './fragments';

export const saveClientMap = gql`
  mutation saveClientMap($data: ClientMapUpdateInput!, $where: ClientMapWhereUniqueInput) {
    saveClientMap(data: $data, where: $where) ${clientMapFragment}
  }
`;

export const deleteClientMap = gql`
  mutation deleteClientMap($where: ClientMapWhereUniqueInput) {
    deleteClientMap(where: $where) ${clientMapFragment}
  }
`;
