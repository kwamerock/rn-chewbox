export const state = {
    scheduleBreaks: {},
    currentScheduleBreakId: null,
    scheduleBreakPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    scheduleBreaksList: state =>
      Object.values(state.scheduleBreaks)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.scheduleBreakPerPage)
  }