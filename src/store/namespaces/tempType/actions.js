import { _ } from 'lodash'

  export const getTotalTempTypes = async ({ state, effects }) => {
    const { tempTypes } = await effects.gql.queries.tempTypes()

    state.tempTypes.totalRecords = tempTypes ? tempTypes.length : 0
  }

  export const getTempTypes = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.tempTypes.tempTypePerPage,
        skip: (state.tempTypes.activePage - 1) * state.tempTypes.tempTypePerPage
      }
    }
    //
    const { tempTypes } = await effects.gql.queries.tempTypes(options)
    if (data && data.getValues) return tempTypes
    else state.tempTypes.tempTypes = _.keyBy(tempTypes, 'id')
  }

  export const saveTempType = async ({ effects }, data) => {
    return await effects.gql.mutations.saveTempType(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.tempTypes.activePage = page
  }

  export const onTempTypeAdded = ({ state }, data) => {
    state.tempTypes.push(data)
  }
  