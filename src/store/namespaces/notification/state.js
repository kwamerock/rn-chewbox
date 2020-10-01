export const state = {
    notifications: {},
    isLoading: false,
    currentNotificationId: null,
    notificationPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    notificationList: notificationNamespace =>
      Object.values(notificationNamespace.notifications)
        .sort((a, b) => {

          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, notificationNamespace.notificationPerPage)
  }