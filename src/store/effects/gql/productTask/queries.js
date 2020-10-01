import gql from 'graphql-tag';
import { productTaskFragment } from './fragments';

export const productTasks = gql`
  query productTasks($where: ProductTaskWhereInput, $orderBy: ProductTaskOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    productTasks(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${productTaskFragment}
  }
`;
