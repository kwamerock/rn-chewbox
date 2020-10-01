import { _ } from 'lodash'

  export const getTotalClientMaps = async ({ state, effects }) => {
    const { clientMaps } = await effects.gql.queries.clientMaps()

    state.clientMaps.totalRecords = clientMaps ? clientMaps.length : 0
  }

  export const getClientMaps = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.clientMaps.clientMapPerPage,
        skip: (state.clientMaps.activePage - 1) * state.clientMaps.clientMapPerPage
      }
    }
    //
    const { clientMaps } = await effects.gql.queries.clientMaps(options)
    if (data && data.getValues) return clientMaps
    else state.clientMaps.clientMaps = _.keyBy(clientMaps, 'id')
  }

  export const saveClientMap = async ({ effects }, data) => {
    return await effects.gql.mutations.saveClientMap(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.clientMaps.activePage = page
  }

  export const onClientMapAdded = ({ state }, data) => {
    state.clientMaps.push(data)
  }
  