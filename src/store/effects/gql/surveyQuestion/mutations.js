import gql from 'graphql-tag';
import { surveyQuestionFragment } from './fragments';

export const saveSurveyQuestion = gql`
  mutation saveSurveyQuestion($data: SurveyQuestionUpdateInput!, $where: SurveyQuestionWhereUniqueInput) {
    saveSurveyQuestion(data: $data, where: $where) ${surveyQuestionFragment}
  }
`;

export const deleteSurveyQuestion = gql`
  mutation deleteSurveyQuestion($where: SurveyQuestionWhereUniqueInput) {
    deleteSurveyQuestion(where: $where) ${surveyQuestionFragment}
  }
`;
