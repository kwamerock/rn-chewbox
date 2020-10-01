import { _ } from 'lodash'

  export const getTotalPricings = async ({ state, effects }) => {
    const { pricings } = await effects.gql.queries.pricings()

    state.pricings.totalRecords = pricings ? pricings.length : 0
  }

  export const getPricings = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.pricings.pricingPerPage,
        skip: (state.pricings.activePage - 1) * state.pricings.pricingPerPage
      }
    }
    //
    const { pricings } = await effects.gql.queries.pricings(options)
    if (data && data.getValues) return pricings
    else state.pricings.pricings = _.keyBy(pricings, 'id')
  }

  export const savePricing = async ({ effects }, data) => {
    return await effects.gql.mutations.savePricing(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.pricings.activePage = page
  }

  export const onPricingAdded = ({ state }, data) => {
    state.pricings.push(data)
  }
  