import gql from 'graphql-tag';
import { surveyAnswerFragment } from './fragments';

export const surveyAnswers = gql`
  query surveyAnswers($where: SurveyAnswerWhereInput, $orderBy: SurveyAnswerOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    surveyAnswers(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${surveyAnswerFragment}
  }
`;
