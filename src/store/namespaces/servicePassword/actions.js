import { _ } from 'lodash'

  export const getTotalServicePasswords = async ({ state, effects }) => {
    const { servicePasswords } = await effects.gql.queries.servicePasswords()

    state.servicePasswords.totalRecords = servicePasswords ? servicePasswords.length : 0
  }

  export const getServicePasswords = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.servicePasswords.servicePasswordPerPage,
        skip: (state.servicePasswords.activePage - 1) * state.servicePasswords.servicePasswordPerPage
      }
    }
    //
    const { servicePasswords } = await effects.gql.queries.servicePasswords(options)
    if (data && data.getValues) return servicePasswords
    else state.servicePasswords.servicePasswords = _.keyBy(servicePasswords, 'id')
  }

  export const saveServicePassword = async ({ effects }, data) => {
    return await effects.gql.mutations.saveServicePassword(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.servicePasswords.activePage = page
  }

  export const onServicePasswordAdded = ({ state }, data) => {
    state.servicePasswords.push(data)
  }
  