import gql from 'graphql-tag';
import { userFragment } from './fragments';

export const users = gql`
  query users($where: UserWhereInput, $orderBy: UserOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    users(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${userFragment}
  }
`;
