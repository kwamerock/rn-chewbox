import { _ } from 'lodash'

  export const getTotalProcessData = async ({ state, effects }) => {
    const { processData } = await effects.gql.queries.processData()

    state.processData.totalRecords = processData ? processData.length : 0
  }

  export const getProcessData = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.processData.processDataPerPage,
        skip: (state.processData.activePage - 1) * state.processData.processDataPerPage
      }
    }
    //
    const { processData } = await effects.gql.queries.processData(options)
    if (data && data.getValues) return processData
    else state.processData.processData = _.keyBy(processData, 'id')
  }

  export const saveProcessData = async ({ effects }, data) => {
    return await effects.gql.mutations.saveProcessData(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.processData.activePage = page
  }

  export const onProcessDataAdded = ({ state }, data) => {
    state.processData.push(data)
  }
  