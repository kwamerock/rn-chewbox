import { _ } from 'lodash'

  export const getTotalPermissions = async ({ state, effects }) => {
    const { permissions } = await effects.gql.queries.permissions()

    state.permissions.totalRecords = permissions ? permissions.length : 0
  }

  export const getPermissions = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.permissions.permissionPerPage,
        skip: (state.permissions.activePage - 1) * state.permissions.permissionPerPage
      }
    }
    //
    const { permissions } = await effects.gql.queries.permissions(options)
    if (data && data.getValues) return permissions
    else state.permissions.permissions = _.keyBy(permissions, 'id')
  }

  export const savePermission = async ({ effects }, data) => {
    return await effects.gql.mutations.savePermission(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.permissions.activePage = page
  }

  export const onPermissionAdded = ({ state }, data) => {
    state.permissions.push(data)
  }
  