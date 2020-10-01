import gql from 'graphql-tag';
import { equipmentFragment } from './fragments';

export const saveEquipment = gql`
  mutation saveEquipment($data: EquipmentUpdateInput!, $where: EquipmentWhereUniqueInput) {
    saveEquipment(data: $data, where: $where) ${equipmentFragment}
  }
`;

export const deleteEquipment = gql`
  mutation deleteEquipment($where: EquipmentWhereUniqueInput) {
    deleteEquipment(where: $where) ${equipmentFragment}
  }
`;
