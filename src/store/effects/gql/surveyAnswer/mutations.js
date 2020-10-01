import gql from 'graphql-tag';
import { surveyAnswerFragment } from './fragments';

export const saveSurveyAnswer = gql`
  mutation saveSurveyAnswer($data: SurveyAnswerUpdateInput!, $where: SurveyAnswerWhereUniqueInput) {
    saveSurveyAnswer(data: $data, where: $where) ${surveyAnswerFragment}
  }
`;

export const deleteSurveyAnswer = gql`
  mutation deleteSurveyAnswer($where: SurveyAnswerWhereUniqueInput) {
    deleteSurveyAnswer(where: $where) ${surveyAnswerFragment}
  }
`;
