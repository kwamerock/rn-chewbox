import gql from 'graphql-tag';
import { phoneFragment } from './fragments';

export const phones = gql`
  query phones($where: PhoneWhereInput, $orderBy: PhoneOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    phones(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${phoneFragment}
  }
`;
