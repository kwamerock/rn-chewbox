import gql from 'graphql-tag';
import { companyFragment } from './fragments';

export const companies = gql`
  query companies($where: CompanyWhereInput, $orderBy: CompanyOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    companies(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${companyFragment}
  }
`;
