import { _ } from 'lodash'

  export const getTotalPermissionAccessRules = async ({ state, effects }) => {
    const { permissionAccessRules } = await effects.gql.queries.permissionAccessRules()

    state.permissionAccessRules.totalRecords = permissionAccessRules ? permissionAccessRules.length : 0
  }

  export const getPermissionAccessRules = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.permissionAccessRules.permissionAccessRulePerPage,
        skip: (state.permissionAccessRules.activePage - 1) * state.permissionAccessRules.permissionAccessRulePerPage
      }
    }
    //
    const { permissionAccessRules } = await effects.gql.queries.permissionAccessRules(options)
    if (data && data.getValues) return permissionAccessRules
    else state.permissionAccessRules.permissionAccessRules = _.keyBy(permissionAccessRules, 'id')
  }

  export const savePermissionAccessRule = async ({ effects }, data) => {
    return await effects.gql.mutations.savePermissionAccessRule(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.permissionAccessRules.activePage = page
  }

  export const onPermissionAccessRuleAdded = ({ state }, data) => {
    state.permissionAccessRules.push(data)
  }
  