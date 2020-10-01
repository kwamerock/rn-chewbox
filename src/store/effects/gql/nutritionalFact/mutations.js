import gql from 'graphql-tag';
import { nutritionalFactFragment } from './fragments';

export const saveNutritionalFact = gql`
  mutation saveNutritionalFact($data: NutritionalFactUpdateInput!, $where: NutritionalFactWhereUniqueInput) {
    saveNutritionalFact(data: $data, where: $where) ${nutritionalFactFragment}
  }
`;

export const deleteNutritionalFact = gql`
  mutation deleteNutritionalFact($where: NutritionalFactWhereUniqueInput) {
    deleteNutritionalFact(where: $where) ${nutritionalFactFragment}
  }
`;
