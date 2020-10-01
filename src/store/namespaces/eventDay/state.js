export const state = {
    eventDays: {},
    currentEventDayId: null,
    eventDayPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    eventDaysList: state =>
      Object.values(state.eventDays)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.eventDayPerPage)
  }