import gql from 'graphql-tag';
import { resumeTypeFragment } from './fragments';

export const saveresumeType = gql`
  mutation saveresumeType($data: resumeTypeUpdateInput!, $where: resumeTypeWhereUniqueInput) {
    saveresumeType(data: $data, where: $where) ${resumeTypeFragment}
  }
`;

export const deleteresumeType = gql`
  mutation deleteresumeType($where: resumeTypeWhereUniqueInput) {
    deleteresumeType(where: $where) ${resumeTypeFragment}
  }
`;
