import gql from 'graphql-tag';
import { foodDensityFragment } from './fragments';

export const saveFoodDensity = gql`
  mutation saveFoodDensity($data: FoodDensityUpdateInput!, $where: FoodDensityWhereUniqueInput) {
    saveFoodDensity(data: $data, where: $where) ${foodDensityFragment}
  }
`;

export const deleteFoodDensity = gql`
  mutation deleteFoodDensity($where: FoodDensityWhereUniqueInput) {
    deleteFoodDensity(where: $where) ${foodDensityFragment}
  }
`;
