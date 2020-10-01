import gql from 'graphql-tag';
import { tempTypeFragment } from './fragments';

export const tempTypes = gql`
  query tempTypes($where: TempTypeWhereInput, $orderBy: TempTypeOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    tempTypes(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${tempTypeFragment}
  }
`;
