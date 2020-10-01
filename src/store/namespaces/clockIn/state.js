export const state = {
    clockIns: {},
    currentClockInId: null,
    clockInPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    clockInsList: state =>
      Object.values(state.clockIns)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.clockInPerPage)
  }