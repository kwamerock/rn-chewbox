export const state = {
    holdTimes: {},
    currentHoldTimeId: null,
    holdTimePerPage: 10,
    totalRecords: 10,
    activePage: 1,
    holdTimesList: state =>
      Object.values(state.holdTimes)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.holdTimePerPage)
  }