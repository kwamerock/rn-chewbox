import { _ } from 'lodash'

  export const getTotalServices = async ({ state, effects }) => {
    const { services } = await effects.gql.queries.services()

    state.services.totalRecords = services ? services.length : 0
  }

  export const getServices = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.services.servicePerPage,
        skip: (state.services.activePage - 1) * state.services.servicePerPage
      }
    }
    //
    const { services } = await effects.gql.queries.services(options)
    if (data && data.getValues) return services
    else state.services.services = _.keyBy(services, 'id')
  }

  export const saveService = async ({ effects }, data) => {
    return await effects.gql.mutations.saveService(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.services.activePage = page
  }

  export const onServiceAdded = ({ state }, data) => {
    state.services.push(data)
  }
  