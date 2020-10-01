import gql from 'graphql-tag';
import { ingredientFragment } from './fragments';

export const saveIngredient = gql`
  mutation saveIngredient($data: IngredientUpdateInput!, $where: IngredientWhereUniqueInput) {
    saveIngredient(data: $data, where: $where) ${ingredientFragment}
  }
`;

export const deleteIngredient = gql`
  mutation deleteIngredient($where: IngredientWhereUniqueInput) {
    deleteIngredient(where: $where) ${ingredientFragment}
  }
`;
