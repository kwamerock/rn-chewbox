import gql from 'graphql-tag';
import { surveyQuestionFragment } from './fragments';

export const surveyQuestions = gql`
  query surveyQuestions($where: SurveyQuestionWhereInput, $orderBy: SurveyQuestionOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    surveyQuestions(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${surveyQuestionFragment}
  }
`;
