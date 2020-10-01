import { _ } from 'lodash'

  export const getTotalPermissionCollections = async ({ state, effects }) => {
    const { permissionCollections } = await effects.gql.queries.permissionCollections()

    state.permissionCollections.totalRecords = permissionCollections ? permissionCollections.length : 0
  }

  export const getPermissionCollections = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.permissionCollections.permissionCollectionPerPage,
        skip: (state.permissionCollections.activePage - 1) * state.permissionCollections.permissionCollectionPerPage
      }
    }
    //
    const { permissionCollections } = await effects.gql.queries.permissionCollections(options)
    if (data && data.getValues) return permissionCollections
    else state.permissionCollections.permissionCollections = _.keyBy(permissionCollections, 'id')
  }

  export const savePermissionCollection = async ({ effects }, data) => {
    return await effects.gql.mutations.savePermissionCollection(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.permissionCollections.activePage = page
  }

  export const onPermissionCollectionAdded = ({ state }, data) => {
    state.permissionCollections.push(data)
  }
  