import gql from 'graphql-tag';
import { emailFragment } from './fragments';

export const emails = gql`
  query emails($where: EmailWhereInput, $orderBy: EmailOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    emails(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${emailFragment}
  }
`;
