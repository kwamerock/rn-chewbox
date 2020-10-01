import { _ } from 'lodash'

  export const getTotalHoldTimes = async ({ state, effects }) => {
    const { holdTimes } = await effects.gql.queries.holdTimes()

    state.holdTimes.totalRecords = holdTimes ? holdTimes.length : 0
  }

  export const getHoldTimes = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.holdTimes.holdTimePerPage,
        skip: (state.holdTimes.activePage - 1) * state.holdTimes.holdTimePerPage
      }
    }
    //
    const { holdTimes } = await effects.gql.queries.holdTimes(options)
    if (data && data.getValues) return holdTimes
    else state.holdTimes.holdTimes = _.keyBy(holdTimes, 'id')
  }

  export const saveHoldTime = async ({ effects }, data) => {
    return await effects.gql.mutations.saveHoldTime(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.holdTimes.activePage = page
  }

  export const onHoldTimeAdded = ({ state }, data) => {
    state.holdTimes.push(data)
  }
  