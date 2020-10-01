import { _ } from 'lodash'

export const getTotalWallets = async ({ state, effects }) => {
  const { wallets } = await effects.gql.queries.wallets()

  state.wallets.totalRecords = wallets ? wallets.length : 0
}

export const getWallets = async ({ state, effects }, data) => {
  let options = {}
  if (data && data.options) options = data.options
  else if (data && data.all) options = {}
  else {
    options = {
      first: state.wallets.walletPerPage,
      skip: (state.wallets.activePage - 1) * state.wallets.walletPerPage
    }
  }
  //
  const { wallets } = await effects.gql.queries.wallets(options)
  if (data && data.getValues) return wallets
  else state.wallets.wallets = _.keyBy(wallets, 'id')
}

export const saveWallet = async ({ effects }, data) => {
  return await effects.gql.mutations.saveWallet(data)
}

export const onChangePage = async ({ state }, page) => {
  state.wallets.activePage = page
}

export const onWalletAdded = ({ state }, data) => {
  state.wallets.push(data)
}

export const getWalletBalance = async ({ state, effects }, data) => {
  const balance = await effects.gql.queries.getWalletBalance(data);
  state.currentUser.balance = balance;
}
