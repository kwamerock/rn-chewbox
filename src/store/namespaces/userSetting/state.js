export const state = {
    userSettings: {},
    currentUserSettingId: null,
    userSettingPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    userSettingsList: state =>
      Object.values(state.userSettings)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.userSettingPerPage)
  }