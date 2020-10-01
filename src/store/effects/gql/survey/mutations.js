import gql from 'graphql-tag';
import { surveyFragment } from './fragments';

export const saveSurvey = gql`
  mutation saveSurvey($data: SurveyUpdateInput!, $where: SurveyWhereUniqueInput) {
    saveSurvey(data: $data, where: $where) ${surveyFragment}
  }
`;

export const deleteSurvey = gql`
  mutation deleteSurvey($where: SurveyWhereUniqueInput) {
    deleteSurvey(where: $where) ${surveyFragment}
  }
`;
