import { _ } from 'lodash'

  export const getTotalClients = async ({ state, effects }) => {
    const { clients } = await effects.gql.queries.clients()

    state.clients.totalRecords = clients ? clients.length : 0
  }

  export const getClients = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.clients.clientPerPage,
        skip: (state.clients.activePage - 1) * state.clients.clientPerPage
      }
    }
    //
    const { clients } = await effects.gql.queries.clients(options)
    if (data && data.getValues) return clients
    else state.clients.clients = _.keyBy(clients, 'id')
  }

  export const saveClient = async ({ effects }, data) => {
    return await effects.gql.mutations.saveClient(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.clients.activePage = page
  }

  export const onClientAdded = ({ state }, data) => {
    state.clients.push(data)
  }
  