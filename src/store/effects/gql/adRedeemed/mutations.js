import gql from 'graphql-tag';
import { adRedeemedFragment } from './fragments';

export const saveAdRedeemed = gql`
  mutation saveAdRedeemed($data: AdRedeemedUpdateInput!, $where: AdRedeemedWhereUniqueInput) {
    saveAdRedeemed(data: $data, where: $where) ${adRedeemedFragment}
  }
`;

export const deleteAdRedeemed = gql`
  mutation deleteAdRedeemed($where: AdRedeemedWhereUniqueInput) {
    deleteAdRedeemed(where: $where) ${adRedeemedFragment}
  }
`;
