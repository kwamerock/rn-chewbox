import { _ } from 'lodash'

  export const getTotalSystemNotifications = async ({ state, effects }) => {
    const { systemNotifications } = await effects.gql.queries.systemNotifications()

    state.systemNotifications.totalRecords = systemNotifications ? systemNotifications.length : 0
  }

  export const getSystemNotifications = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.systemNotifications.systemNotificationPerPage,
        skip: (state.systemNotifications.activePage - 1) * state.systemNotifications.systemNotificationPerPage
      }
    }
    //
    const { systemNotifications } = await effects.gql.queries.systemNotifications(options)
    if (data && data.getValues) return systemNotifications
    else state.systemNotifications.systemNotifications = _.keyBy(systemNotifications, 'id')
  }

  export const saveSystemNotification = async ({ effects }, data) => {
    return await effects.gql.mutations.saveSystemNotification(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.systemNotifications.activePage = page
  }

  export const onSystemNotificationAdded = ({ state }, data) => {
    state.systemNotifications.push(data)
  }
  