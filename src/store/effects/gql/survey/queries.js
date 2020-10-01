import gql from 'graphql-tag';
import { surveyFragment } from './fragments';

export const surveys = gql`
  query surveys($where: SurveyWhereInput, $orderBy: SurveyOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    surveys(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${surveyFragment}
  }
`;
