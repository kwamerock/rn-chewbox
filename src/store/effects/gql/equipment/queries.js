import gql from 'graphql-tag';
import { equipmentFragment } from './fragments';

export const equipment = gql`
  query equipment($where: EquipmentWhereInput, $orderBy: EquipmentOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    equipment(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${equipmentFragment}
  }
`;
