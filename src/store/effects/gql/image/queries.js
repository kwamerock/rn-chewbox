import gql from 'graphql-tag';
import { imageFragment } from './fragments';

export const images = gql`
  query images($where: ImageWhereInput, $orderBy: ImageOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    images(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${imageFragment}
  }
`;
