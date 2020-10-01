import gql from 'graphql-tag';
import { commentFragment } from './fragments';

export const comments = gql`
  query comments($where: CommentWhereInput, $orderBy: CommentOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    comments(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${commentFragment}
  }
`;
