import gql from 'graphql-tag';
import { productTaskFragment } from './fragments';

export const saveProductTask = gql`
  mutation saveProductTask($data: ProductTaskUpdateInput!, $where: ProductTaskWhereUniqueInput) {
    saveProductTask(data: $data, where: $where) ${productTaskFragment}
  }
`;

export const deleteProductTask = gql`
  mutation deleteProductTask($where: ProductTaskWhereUniqueInput) {
    deleteProductTask(where: $where) ${productTaskFragment}
  }
`;
