import { _ } from 'lodash'

  export const getTotalUserSettings = async ({ state, effects }) => {
    const { userSettings } = await effects.gql.queries.userSettings()

    state.userSettings.totalRecords = userSettings ? userSettings.length : 0
  }

  export const getUserSettings = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.userSettings.userSettingPerPage,
        skip: (state.userSettings.activePage - 1) * state.userSettings.userSettingPerPage
      }
    }
    //
    const { userSettings } = await effects.gql.queries.userSettings(options)
    if (data && data.getValues) return userSettings
    else state.userSettings.userSettings = _.keyBy(userSettings, 'id')
  }

  export const saveUserSetting = async ({ effects }, data) => {
    return await effects.gql.mutations.saveUserSetting(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.userSettings.activePage = page
  }

  export const onUserSettingAdded = ({ state }, data) => {
    state.userSettings.push(data)
  }
  