import gql from 'graphql-tag';
import { productionScheduleFragment } from './fragments';

export const productionSchedules = gql`
  query productionSchedules($where: ProductionScheduleWhereInput, $orderBy: ProductionScheduleOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    productionSchedules(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${productionScheduleFragment}
  }
`;
