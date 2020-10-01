import { _ } from 'lodash'

  export const getTotalClockIns = async ({ state, effects }) => {
    const { clockIns } = await effects.gql.queries.clockIns()

    state.clockIns.totalRecords = clockIns ? clockIns.length : 0
  }

  export const getClockIns = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.clockIns.clockInPerPage,
        skip: (state.clockIns.activePage - 1) * state.clockIns.clockInPerPage
      }
    }
    //
    const { clockIns } = await effects.gql.queries.clockIns(options)
    if (data && data.getValues) return clockIns
    else state.clockIns.clockIns = _.keyBy(clockIns, 'id')
  }

  export const saveClockIn = async ({ effects }, data) => {
    return await effects.gql.mutations.saveClockIn(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.clockIns.activePage = page
  }

  export const onClockInAdded = ({ state }, data) => {
    state.clockIns.push(data)
  }
  