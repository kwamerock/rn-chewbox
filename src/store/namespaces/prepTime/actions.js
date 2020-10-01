import { _ } from 'lodash'

  export const getTotalPrepTimes = async ({ state, effects }) => {
    const { prepTimes } = await effects.gql.queries.prepTimes()

    state.prepTimes.totalRecords = prepTimes ? prepTimes.length : 0
  }

  export const getPrepTimes = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.prepTimes.prepTimePerPage,
        skip: (state.prepTimes.activePage - 1) * state.prepTimes.prepTimePerPage
      }
    }
    //
    const { prepTimes } = await effects.gql.queries.prepTimes(options)
    if (data && data.getValues) return prepTimes
    else state.prepTimes.prepTimes = _.keyBy(prepTimes, 'id')
  }

  export const savePrepTime = async ({ effects }, data) => {
    return await effects.gql.mutations.savePrepTime(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.prepTimes.activePage = page
  }

  export const onPrepTimeAdded = ({ state }, data) => {
    state.prepTimes.push(data)
  }
  