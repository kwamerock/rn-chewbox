export const state = {
    systemNotifications: {},
    currentSystemNotificationId: null,
    systemNotificationPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    systemNotificationsList: state =>
      Object.values(state.systemNotifications)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.systemNotificationPerPage)
  }