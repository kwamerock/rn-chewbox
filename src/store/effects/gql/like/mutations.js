import gql from 'graphql-tag';
import { likeFragment } from './fragments';

export const saveLike = gql`
  mutation saveLike($data: LikeUpdateInput!, $where: LikeWhereUniqueInput) {
    saveLike(data: $data, where: $where) ${likeFragment}
  }
`;

export const deleteLike = gql`
  mutation deleteLike($where: LikeWhereUniqueInput) {
    deleteLike(where: $where) ${likeFragment}
  }
`;
