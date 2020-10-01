import { _ } from 'lodash'

  export const getTotalPermissionAccess = async ({ state, effects }) => {
    const { permissionAccess } = await effects.gql.queries.permissionAccess()

    state.permissionAccess.totalRecords = permissionAccess ? permissionAccess.length : 0
  }

  export const getPermissionAccess = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.permissionAccess.permissionAccessPerPage,
        skip: (state.permissionAccess.activePage - 1) * state.permissionAccess.permissionAccessPerPage
      }
    }
    //
    const { permissionAccess } = await effects.gql.queries.permissionAccess(options)
    if (data && data.getValues) return permissionAccess
    else state.permissionAccess.permissionAccess = _.keyBy(permissionAccess, 'id')
  }

  export const savePermissionAccess = async ({ effects }, data) => {
    return await effects.gql.mutations.savePermissionAccess(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.permissionAccess.activePage = page
  }

  export const onPermissionAccessAdded = ({ state }, data) => {
    state.permissionAccess.push(data)
  }
  