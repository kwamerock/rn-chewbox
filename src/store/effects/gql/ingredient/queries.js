import gql from 'graphql-tag';
import { ingredientFragment } from './fragments';

export const ingredients = gql`
  query ingredients($where: IngredientWhereInput, $orderBy: IngredientOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    ingredients(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${ingredientFragment}
  }
`;
