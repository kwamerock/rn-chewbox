import gql from 'graphql-tag';
import { walletFragment } from './fragments';

export const wallets = gql`
  query wallets($where: WalletWhereInput, $orderBy: WalletOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    wallets(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${walletFragment}
  }
`;
