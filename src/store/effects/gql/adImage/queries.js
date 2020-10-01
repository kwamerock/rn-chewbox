import gql from 'graphql-tag';
import { adImageFragment } from './fragments';

export const adImages = gql`
  query adImages($where: AdImageWhereInput, $orderBy: AdImageOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    adImages(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${adImageFragment}
  }
`;
