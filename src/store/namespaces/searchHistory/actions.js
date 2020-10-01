import { _ } from 'lodash'

  export const getTotalSearchHistories = async ({ state, effects }) => {
    const { searchHistories } = await effects.gql.queries.searchHistories()

    state.searchHistories.totalRecords = searchHistories ? searchHistories.length : 0
  }

  export const getSearchHistories = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.searchHistories.searchHistoryPerPage,
        skip: (state.searchHistories.activePage - 1) * state.searchHistories.searchHistoryPerPage
      }
    }
    //
    const { searchHistories } = await effects.gql.queries.searchHistories(options)
    if (data && data.getValues) return searchHistories
    else state.searchHistories.searchHistories = _.keyBy(searchHistories, 'id')
  }

  export const saveSearchHistory = async ({ effects }, data) => {
    return await effects.gql.mutations.saveSearchHistory(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.searchHistories.activePage = page
  }

  export const onSearchHistoryAdded = ({ state }, data) => {
    state.searchHistories.push(data)
  }
  