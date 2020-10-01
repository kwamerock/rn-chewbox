import gql from 'graphql-tag';
import { foodDensityFragment } from './fragments';

export const foodDensities = gql`
  query foodDensities($where: FoodDensityWhereInput, $orderBy: FoodDensityOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    foodDensities(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${foodDensityFragment}
  }
`;
