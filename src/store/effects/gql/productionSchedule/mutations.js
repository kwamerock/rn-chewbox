import gql from 'graphql-tag';
import { productionScheduleFragment } from './fragments';

export const saveProductionSchedule = gql`
  mutation saveProductionSchedule($data: ProductionScheduleUpdateInput!, $where: ProductionScheduleWhereUniqueInput) {
    saveProductionSchedule(data: $data, where: $where) ${productionScheduleFragment}
  }
`;

export const deleteProductionSchedule = gql`
  mutation deleteProductionSchedule($where: ProductionScheduleWhereUniqueInput) {
    deleteProductionSchedule(where: $where) ${productionScheduleFragment}
  }
`;
