import gql from 'graphql-tag';
import { audienceFragment } from './fragments';

export const audiences = gql`
  query audiences($where: AudienceWhereInput, $orderBy: AudienceOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    audiences(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${audienceFragment}
  }
`;
