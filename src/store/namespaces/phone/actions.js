import { _ } from 'lodash'

  export const getTotalPhones = async ({ state, effects }) => {
    const { phones } = await effects.gql.queries.phones()

    state.phones.totalRecords = phones ? phones.length : 0
  }

  export const getPhones = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.phones.phonePerPage,
        skip: (state.phones.activePage - 1) * state.phones.phonePerPage
      }
    }
    //
    const { phones } = await effects.gql.queries.phones(options)
    if (data && data.getValues) return phones
    else state.phones.phones = _.keyBy(phones, 'id')
  }

  export const savePhone = async ({ effects }, data) => {
    return await effects.gql.mutations.savePhone(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.phones.activePage = page
  }

  export const onPhoneAdded = ({ state }, data) => {
    state.phones.push(data)
  }
  