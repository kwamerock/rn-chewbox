import { keyBy, isEmpty } from 'lodash';

export const getTotalNotifications = async ({ state, effects }) => {
  const { notifications } = await effects.gql.queries.notifications()

  state.notification.totalRecords = notifications ? notifications.length : 0
}

export const getNotifications = async ({ state, effects }, data) => {
  console.log(data, 'data getNotifications');
  let options = {};

  if(isEmpty(data)) {
    options = {
      first: state.notification.notificationPerPage,
      skip: (state.notification.activePage - 1) * state.notification.notificationPerPage
    }
  } else {
    options = data;
    if(!data.first) options.first = state.notification.notificationPerPage;
    if(!data.skip) options.skip = (state.notification.activePage - 1) * state.notification.notificationPerPage;
  }

  //
  console.log(options, 'options getNotifications');
  const { notifications } = await effects.gql.queries.notifications(options)
  state.notification.notifications = keyBy(notifications, 'id');
}

export const saveNotification = async ({ effects }, data) => {
  return await effects.gql.mutations.saveNotification(data)
}

export const onChangePage = async ({ state }, page) => {
  state.notification.activePage = page
}

export const onNotificationAdded = ({ state }, data) => {
  state.notification.push(data)
}