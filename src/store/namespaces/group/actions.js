import { _ } from 'lodash'

  export const getTotalGroups = async ({ state, effects }) => {
    const { groups } = await effects.gql.queries.groups()

    state.groups.totalRecords = groups ? groups.length : 0
  }

  export const getGroups = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.groups.groupPerPage,
        skip: (state.groups.activePage - 1) * state.groups.groupPerPage
      }
    }
    //
    const { groups } = await effects.gql.queries.groups(options)
    if (data && data.getValues) return groups
    else state.groups.groups = _.keyBy(groups, 'id')
  }

  export const saveGroup = async ({ effects }, data) => {
    return await effects.gql.mutations.saveGroup(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.groups.activePage = page
  }

  export const onGroupAdded = ({ state }, data) => {
    state.groups.push(data)
  }
  