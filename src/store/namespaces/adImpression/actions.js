import { _ } from 'lodash'

  export const getTotalAdImpressions = async ({ state, effects }) => {
    const { adImpressions } = await effects.gql.queries.adImpressions()

    state.adImpressions.totalRecords = adImpressions ? adImpressions.length : 0
  }

  export const getAdImpressions = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.adImpressions.adImpressionPerPage,
        skip: (state.adImpressions.activePage - 1) * state.adImpressions.adImpressionPerPage
      }
    }
    //
    const { adImpressions } = await effects.gql.queries.adImpressions(options)
    if (data && data.getValues) return adImpressions
    else state.adImpressions.adImpressions = _.keyBy(adImpressions, 'id')
  }

  export const saveAdImpression = async ({ effects }, data) => {
    return await effects.gql.mutations.saveAdImpression(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.adImpressions.activePage = page
  }

  export const onAdImpressionAdded = ({ state }, data) => {
    state.adImpressions.push(data)
  }
  