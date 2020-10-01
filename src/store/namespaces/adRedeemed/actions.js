import { _ } from 'lodash'

  export const getTotalAdRedeemeds = async ({ state, effects }) => {
    const { adRedeemeds } = await effects.gql.queries.adRedeemeds()

    state.adRedeemeds.totalRecords = adRedeemeds ? adRedeemeds.length : 0
  }

  export const getAdRedeemeds = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.adRedeemeds.adRedeemedPerPage,
        skip: (state.adRedeemeds.activePage - 1) * state.adRedeemeds.adRedeemedPerPage
      }
    }
    //
    const { adRedeemeds } = await effects.gql.queries.adRedeemeds(options)
    if (data && data.getValues) return adRedeemeds
    else state.adRedeemeds.adRedeemeds = _.keyBy(adRedeemeds, 'id')
  }

  export const saveAdRedeemed = async ({ effects }, data) => {
    return await effects.gql.mutations.saveAdRedeemed(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.adRedeemeds.activePage = page
  }

  export const onAdRedeemedAdded = ({ state }, data) => {
    state.adRedeemeds.push(data)
  }
  