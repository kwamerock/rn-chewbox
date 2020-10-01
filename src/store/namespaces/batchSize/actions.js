import { _ } from 'lodash'

  export const getTotalBatchSizes = async ({ state, effects }) => {
    const { batchSizes } = await effects.gql.queries.batchSizes()

    state.batchSizes.totalRecords = batchSizes ? batchSizes.length : 0
  }

  export const getBatchSizes = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.batchSizes.batchSizePerPage,
        skip: (state.batchSizes.activePage - 1) * state.batchSizes.batchSizePerPage
      }
    }
    //
    const { batchSizes } = await effects.gql.queries.batchSizes(options)
    if (data && data.getValues) return batchSizes
    else state.batchSizes.batchSizes = _.keyBy(batchSizes, 'id')
  }

  export const saveBatchSize = async ({ effects }, data) => {
    return await effects.gql.mutations.saveBatchSize(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.batchSizes.activePage = page
  }

  export const onBatchSizeAdded = ({ state }, data) => {
    state.batchSizes.push(data)
  }
  