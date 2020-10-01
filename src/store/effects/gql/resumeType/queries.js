import gql from 'graphql-tag';
import { resumeTypeFragment } from './fragments';

export const resumeTypes = gql`
  query resumeTypes($where: resumeTypeWhereInput, $orderBy: resumeTypeOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    resumeTypes(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${resumeTypeFragment}
  }
`;
