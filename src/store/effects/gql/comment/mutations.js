import gql from 'graphql-tag';
import { commentFragment } from './fragments';

export const saveComment = gql`
  mutation saveComment($data: CommentUpdateInput!, $where: CommentWhereUniqueInput) {
    saveComment(data: $data, where: $where) ${commentFragment}
  }
`;

export const deleteComment = gql`
  mutation deleteComment($where: CommentWhereUniqueInput) {
    deleteComment(where: $where) ${commentFragment}
  }
`;
