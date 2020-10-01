export const state = {
    schedules: {},
    currentScheduleId: null,
    schedulePerPage: 10,
    totalRecords: 10,
    activePage: 1,
    schedulesList: state =>
      Object.values(state.schedules)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.schedulePerPage)
  }